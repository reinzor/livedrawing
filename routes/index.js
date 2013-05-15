
/*
 * Routes
 */

exports.index = function(req, res){
  res.render('index', { title: 'Live drawing!' });
};

exports.client = function(req, res){
  res.render('client', { title: 'Client' });
};

exports.drawboard = function(req, res){
  res.render('drawboard', { title: 'Drawboard' });
};