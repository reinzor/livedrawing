$(document).ready(function () {
	console.log('client.js initializing');

	var socket = io.connect(':1234/client');
	$('#send').click(function() {
		socket.emit('message', {msg: 'click'});
	});
});