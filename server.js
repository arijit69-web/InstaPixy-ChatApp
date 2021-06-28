const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = process.env.PORT || 8080;
app.use("/static", express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
if (process.env.NODE_ENV == "production") {
  app.use(express.static("/index.html"));
}

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//Socket
const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("Socket Connected");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
