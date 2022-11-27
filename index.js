/*--------------- SETUP ---------------*/
let express = require('express');
let app = express();

app.use("/", express.static("public"));

// Initialize the actual HTTP server //* http baked in node
let http = require("http");
let server = http.createServer(app);

/*--------------- PORT ---------------*/
let port = process.env.PORT || 3000; // annouce to make sure 
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});


/*--------------- Socket.io Code ---------------*/
// create an server instance
let io = require("socket.io");
io = new io.Server(server);

/*--------------- visting connection ---------------*/
let userNum = 0;
let userArray = [];
io.on("connection", (socket) => {
  console.log("a user connected!")

  userNum = userNum + 1;
  const user = { user_room_number: userNum };
  userArray.push(user);
  socket.emit('userArray', userArray);


  socket.on("disconnect", () => {
    // delete the -1 when store the array number
    userNum = userNum - 1;
    userArray.pop();
  
    console.log("a user disconnected");
  });
})