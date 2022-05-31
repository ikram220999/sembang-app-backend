const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer(app);
const user = [];

const io = new Server(server, {
  cors: {
    origin: `https://62963592bdfd1a0067f1f0a3--stately-torrone-f0cacf.netlify.app`,
    // `https://62961492f8604e48712a7bbb--netlify-thinks-ikram220999-is-great.netlify.app`
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.get("/", (req, res) => {
    res.send("server ok");
}); 

 console.log("kambing");
  io.on("connection", (socket) => {
    user.push(socket.id);

    // console.log(`User Connected ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
    });

    socket.on("send_message", (data) => {
      let new_data = { user_id: data.id, msg: data.text };
      socket.to(data.room).emit("receive_message", new_data);
    });
  });

// const corsOptions ={
//     origin: `https://sembang-kari-app.herokuapp.com:${
//         process.env.PORT || 5000
//       }/`,
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

// server.listen("http:///" + process.env.PORT || 5000, () => {
//     console.log("SERVER OK");
// });

const host = "0.0.0.0";
const port = process.env.PORT || 3000;

server.listen(port, host, function () {
  console.log("Server started.......");
});
