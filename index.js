/*--------------- SETUP ---------------*/
let express = require('express');
let app = express();

app.use("/", express.static("public"));

/*---------- Parse JSON data ----------*/
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Initialize the actual HTTP server //* http baked in node
let http = require("http");
let server = http.createServer(app);

/*--------------- PORT ---------------*/
let port = process.env.PORT || 3000; // annouce to make sure 
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});

/*---------- initiate NeDB ----------*/
let Userstore = require('nedb'); // grab the library
let dbUser = new Userstore('User.db'); //create a database
dbUser.loadDatabase();

let Datastore = require('nedb'); // grab the library
let dbTime = new Datastore('timeStamp.db'); //create a database
dbTime.loadDatabase();

let Datastore2 = require('nedb'); // grab the library
let dbLoca = new Datastore2('Location.db'); //create a database
dbLoca.loadDatabase();

let Datastore3 = require('nedb'); // grab the library
let dbName = new Datastore3('Name.db'); //create a database
dbName.loadDatabase();



/*--------------- Socket.io Code ---------------*/
// create an server instance
let io = require("socket.io");
io = new io.Server(server);


/*--------------- public connection: io---------------*/
let userNum = 0;
let userArray = [];
io.on("connection", (socket) => {
  console.log("a user connected!");

  //* ----- user number
  dbUser.insert({ user: socket.id });
  dbUser.find({}, (error, docs) => {
    console.log(docs.length);
    let userNum = docs.length
    socket.emit('userNum', userNum);
  });

  // userNum = userNum + 1;
  // const user = { user_room_number: userNum };
  // userArray.push(user);
  // socket.emit('userArray', userArray);

  //* ------ button events

  // timestamp(Nedb) 
  socket.on('timeStamp', (time) => {
    console.log(time);
    let timeStampe = Date();
    console.log(timeStampe);
    let timeToSave = {
      "time": timeStampe
    }
    dbTime.insert(timeToSave);
  })

  // location(Nedb)
  socket.on('location', (location) => {
    console.log(location);
    dbLoca.insert(location);
  })

  // Name(Nedb)
  socket.on('Name', (name) => {
    console.log(name);
    dbName.insert(name);
  })


  //* ------ sockets disconnection
  socket.on("disconnect", () => {
    // delete the -1 when store the array number
    userNum = userNum - 1;
    userArray.pop();
    console.log("a user disconnected");
  });
})

/*--------------- nameSpace connection:page ---------------*/

//*----- threejs-page
let threejs = io.of("/threejs-page");
threejs.on("connection", (socket) => {

  console.log("a user connected threejs-page");
  const data = require('./rock.json');
  // console.log(data.combo);
  socket.emit('randomQ', { combo: data.combo });


  socket.on('update',()=>{
    console.log("update")
  })


  socket.on("disconnect", () => {
    // delete the -1 when store the array number
    console.log("a user disconnected threejs-page");
  });
})

function randomNumber(test) {
  let random = Math.floor(Math.random() * test);
  // console.log('test',random);
  return random;
}