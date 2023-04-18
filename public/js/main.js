console.log("we are here");
const socket = io();
// server emit the message and client side can receive the message
socket.on("message", (messsage) => {
  console.log(messsage);
});
