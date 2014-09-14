exports.log = function(req, res, next){
	console.log('Custom Logger: Running Page');
	next();
};