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

// name space
io.on("connection",(socket)=>{
  console.log("connected!")
})