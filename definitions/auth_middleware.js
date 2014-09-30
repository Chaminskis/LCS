framework.on('request-start',function(){
	
	framework.middleware('ViewAuthStart', function(req, res, next, options, controller) {
		
		console.log("Logs from view start");
		
		next();
		
	});
	
	framework.middleware('ApiAuthStart', function(req, res, next, options, controller) {
		
		console.log("Logs from api");
		
		next();
	});
	
});

framework.on('request-end',function(){
	
	framework.middleware('ViewAuthEnd', function(req, res, next, options, controller) {
		
		console.log("Logs from view end");
		
		console.log(arguments)
		
		next();
	});
	
	framework.middleware('ApiAuthEnd', function(req, res, next, options, controller) {
		
		console.log("Logs from api");
		
		next();
	});
	
});