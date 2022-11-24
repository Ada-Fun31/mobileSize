/*----- user connection -----*/
let socket = io();

//listen for confirmation of connection
socket.on('connect', () => {
   console.log("connected")
})