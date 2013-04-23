/*
 * Routes
 */

var QRCode = require('qrcode');

exports.client = function(req, res){
	res.render('client', { title: 'Client' });
};

exports.drawboard = function(req, res){
	res.render('drawboard', { title: 'Drawboard' });
};

exports.qr = function(req, res) {
	res.type('image/png');


	QRCode.draw('i am a pony', function(error, canvas) {
		if (error) {
			console.log(err);
			throw err;
		}
		canvas.toBuffer(function(err, buf){
			if (err) {
				console.log(err);
				throw err;
			}
			res.send(buf);
		});
	});
};