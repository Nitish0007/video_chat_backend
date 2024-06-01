const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})

io.on("connection", (socket) => {
  socket.on("JOIN_REQUEST", (roomId) => {
    console.log("join request received for room id -> ", roomId)

    socket.join(roomId);
    // send join request to room
    console.log(`Emitting JOIN_REQUEST_RESPONSE to room ${roomId}`);
    io.to(roomId).emit("JOIN_REQUEST_RESPONSE", {roomId: roomId})
    // accept incoming request
    // socket.to(roomId).emit("REQUEST_ACCEPTED", roomId)
    
    // decline incoming request
    // socket.to(roomId).emit("REQUEST_DECLINED", "You are not allowed to join the Room")
  })

})

io.listen(5500, () => console.log("Server started successfully............."))