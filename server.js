const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");

const server = http.createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

const PORT = 4000;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 🔹 JOIN ROOM
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined ${room}`);
    console.log("Socket rooms:", Array.from(socket.rooms));
  });

  socket.on("room-message", ({ room, message }) => {
    // io.to(room).emit("room-message", message);
    io.to(room).emit("room-message", message);
    console.log("Room message:", room, message);
  });

  socket.on("disconnect", (reason) => {
    console.log("User disconnected:", socket.id, reason);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
