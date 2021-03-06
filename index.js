var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('disconnect', function(){
		
		console.log('A User disconnected');
	});
  	
  	socket.on('chat message', function(msg){
    	io.emit('chat message', msg);
  	});

  	socket.on('typing',function(data){
  		socket.broadcast.emit('typing',data);
  	});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});