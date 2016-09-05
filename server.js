var express = require('express'),
    app     = new express(),
    server  = require('http').createServer(app),
    io      = require('socket.io').listen(server);

app.use(express.static(__dirname + '/src'));

app.listen(process.env.PORT || 1337);

server.listen(app.get('port'), function() {
  console.log('Server running at localhost', app.get('port'))
});
