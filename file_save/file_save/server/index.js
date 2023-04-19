const fs = require('fs');
const filePath = './poi.txt';
let message = fs.readFileSync(filePath, 'utf8');
const express = require('express');
const http = require('http');
const cors = require('cors')

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    pingTimeout: 30000,
    cors: true
})
app.use(cors())

io.on('connection', (socket) => {
socket.emit("message", message)

  let fileSize = fs.statSync(filePath).size;

    fs.watchFile(filePath, (curr, prev) => {
        if (curr.mtime > prev.mtime) {
            const newFileSize = fs.statSync(filePath).size;

            const buffer = Buffer.alloc(newFileSize - fileSize);
            const fd = fs.openSync(filePath, 'r');
            fs.readSync(fd, buffer, 0, buffer.length, fileSize);
            fs.closeSync(fd);

            fileSize = newFileSize;
            // console.log(buffer.toString());s
            socket.emit("message", buffer.toString())
        }
    });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000.');
});
