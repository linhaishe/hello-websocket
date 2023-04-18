const path = require("path");
const express = require("express");
// Implementing our server code directly with Node's built-in http web server
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

// Run when client connects
io.on("connection", (socket) => {
  console.log("New WS Connection...");
  // we should sent or emit messages or events back and forth,it's an open bi-directional communication
  socket.emit("message", "welcome to chatCord!");
  // io.emit() // sent to everybody
  // Broadcast when a user connects,emit to everybody except the user that's connecting
  socket.broadcast.emit("message", "A user has joined the chat");

  // Runs when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left chat");
  });

  // listen for chatMessage
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
