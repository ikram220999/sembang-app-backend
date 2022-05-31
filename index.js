const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer(app);
const user = [];

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://sembang-kari-app.herokuapp.com/" + (process.env.PORT || 5000),
        methods: ["GET", "POST"],
    },
});

// const corsOptions ={
//     origin: "https://sembang-kari-app.herokuapp.com/" + (process.env.PORT || 5000), 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

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
