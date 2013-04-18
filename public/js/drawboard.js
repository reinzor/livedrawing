$(document).ready(function () {
	console.log('drawingboard.js initializing');
	var l = $('#log');


	var socket = io.connect(':1234/drawboard');
	socket.on('message', function(data) {
		console.log(data);
		if(data.msg) {
			l.append(data.msg + '\r\n');
		}
	});
});