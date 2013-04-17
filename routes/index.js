
/*
 * Routes
 */

exports.client = function(req, res){
  res.render('client', { title: 'Client' });
};

exports.drawboard = function(req, res){
  res.render('drawboard', { title: 'Drawboard' });
};