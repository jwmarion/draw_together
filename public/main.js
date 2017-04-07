$(()=>{
  $("#flat").spectrum({
    color: '#000',
    flat: true
  });
  $("#flat").spectrum('reflow');

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var down = false;
  var socket = io();
  var lastDot = [];

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin='round';
  $(window).on('mousedown', function eventHandler(event) {
    down = true;
    lastDot.push([event.clientX-13, event.clientY-10]);
  });

  $(window).on('mouseup', function eventHandler(event) {
    down = false;
    lastDot = [];
  });

  $('canvas').on('mousemove', function eventHandler(event) {
    if (down === true){

      lastDot.push([event.clientX-13,event.clientY-10]);
      ctx.beginPath();
      ctx.moveTo(lastDot[lastDot.length - 2][0],lastDot[lastDot.length - 2][1]);
      ctx.lineTo(lastDot[lastDot.length - 1][0],lastDot[lastDot.length - 1][1]);
      ctx.stroke();
      sender(lastDot,[ctx.strokeStyle,ctx.lineWidth]);

    }
  });
  socket.on('draw',(arr, options)=>{
    receiver(arr, options)
  });

  function sender(arr, options){
    socket.emit('draw',arr, options)
  };


  function receiver(arr, options){
    var place = ctx.strokeStyle;
    var place2 = ctx.lineWidth;
      ctx.strokeStyle = options[0];
      ctx.lineWidth = options[1];
      ctx.beginPath();
      ctx.moveTo(arr[arr.length - 2][0],arr[arr.length - 2][1]);
      ctx.lineTo(arr[arr.length - 1][0],arr[arr.length - 1][1]);
      ctx.stroke();
      ctx.strokeStyle = place;
      ctx.lineWidth = place2;

  }
  // $('button').on('click',(event) =>{
  //   var color = event.target.id.replace('b','').toLowerCase();
  //   ctx.strokeStyle = color;
  // });


  $('button').on('click',(event) =>{
    if (event.target.id === 'brushUp' ){
      ctx.lineWidth +=3;
    }
    else if(event.target.id === 'brushDown'){
      ctx.lineWidth -=3;
    }
    else if (event.target.id === 'eraser'){
       ctx.strokeStyle = '#fff';
    }
  });

  $('#flat').on('change',(event)=>{
    ctx.strokeStyle = $('#flat').spectrum('get').toHexString();
  });



// });
//   $("#flatClearable").spectrum({
//     flat: true,
//     showInput: true,
//     allowEmpty:true
// });

});
