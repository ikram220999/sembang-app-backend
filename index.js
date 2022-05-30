const express = require("express");
const app = express();
const http = require("https");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
const user = [];

const io = new Server(server, {
    cors: {
        origin: process.env.PORT || 5000,
        methods: ["GET", "POST"],
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    },
});

io.on("connection", (socket) => {

    user.push(socket.id);
   
    // console.log(`User Connected ${socket.id}`);

    socket.on("join_room", (data) =>{
        socket.join(data);
    })

    socket.on("send_message", (data) => { 

        let new_data = {user_id: data.id, msg: data.text};
      socket.to(data.room).emit("receive_message", new_data);
    })
});

server.listen(process.env.PORT || 5000, () => {
    console.log("SERVER OK");
});
