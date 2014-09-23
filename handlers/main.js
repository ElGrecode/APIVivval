exports.home = function(req, res){
	console.log('main home page getting hit');
  res.type()
  res.render('home');
  console.log('After attempting ./home.handlebars');
};