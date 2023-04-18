const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();
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

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">Mary<span>9:15pm</span></p><p class="text">${message}</p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
