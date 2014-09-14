exports.coordinateInformation = function(req, res, next, name){
	req.latlng = 'Lat and Lng manipulated by middleware first' + name;
	next();
};

exports.heatmap = function(req, res){
	// An example of some data we could possibly be getting back
	res.json({
		name: 'heatmap',
		objects: 414,
		distribution: 'someval',
		blazons: {},
		hello: 		'hello there',
		latlng:  	req.latlng, // Being manipulated by coordinateInformation() Middleware
		zoom: 		req.params.zoom,
		searchterm: req.params.searchterm
	});
	
};
