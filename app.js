const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.static('public'));

app.get('/',(req,res,next) => {
  res.sendFile('index.html');
});

io.on('connection', (socket) =>{
  console.log(`${socket.id}: has connected`)
  socket.on('disconnect',() => {
    console.log(`${socket.id}: has disconnected`)
  });
  socket.on('draw',(arr)=>{
    console.log(`x: ${arr[0]} y:${arr[1]}`)
    socket.broadcast.emit('draw',arr)
  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
