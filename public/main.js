$(()=>{
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var down = false;
  var socket = io();
  var dc = [];
  $('canvas').on('mousedown', function eventHandler(event) {
    down = true;
    dc=[event.clientX, event.clientY];
  });

  $('canvas').on('mouseup', function eventHandler(event) {
    down = false;
    dc = [];
  });

  $('canvas').on('mousemove', function eventHandler(event) {
    if (down === true){
      ctx.fillStyle;
      ctx.fillRect(event.clientX-13,event.clientY-10,5,5);
      sender(event.clientX-13,event.clientY-10,5,5);
    }
  });
  socket.on('draw',(arr)=>{
    receiver(arr[0],arr[1])
  })
  function sender(x,y){
    socket.emit('draw',[x,y])
  }

  function receiver(x,y){
    socket.on('draw',(arr)=>{
    ctx.fillRect(x,y,5,5);
    });
  }

});
