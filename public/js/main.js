const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const socket = io();

// cdn  引入的组件库，是全局的window.Qs
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Output message to DOM
function outputMessage(message) {
  console.log(message);
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p><p class="text">${message.text}</p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  console.log("users222", users);
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

// Join chatroom
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  console.log("users111", users);
  console.log("room222", room);
  outputRoomName(room);
  outputUsers(users);
});

// server emit the message and client side can receive the message
socket.on("message", (messsage) => {
  console.log(messsage);
  outputMessage(messsage);

  // scroll down 发送消息之后，自动下拉到可视范围内
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});
