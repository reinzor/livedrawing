  console.log('client.js initializing');

  var socket = io.connect(':1234');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
