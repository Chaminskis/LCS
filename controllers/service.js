/*
 * Service Api
 *
 *
 **/

/** Imports **/
var controllerBaseUrl = '/app/service/';
var utils = require('../definitions/utils_service.js');
var hospitalService = require('../definitions/services/hospital_service.js');
var medicalSecureService = require('../definitions/services/medical_secure_service.js');

/** Routes **/
exports.install = function(framework){
	framework.route(controllerBaseUrl,dummy,['get']);
	framework.route(controllerBaseUrl + 'hospitals/',getHospitals,['post','json']);
	framework.route(controllerBaseUrl + 'hospital/{identifier}/',getHospital,['get'])
}

/*
 *
 *
 **/
function dummy(){

	hospitalService.hi(function(model){
		console.log('result');
	})

	this.json({nice:4});
}

/*
 *
 *
 **/
function getHospitals(){
	var self = this;
	var data = self.global.db;

	if(self.post.quantity != undefined && typeof(self.post.quantity) === typeof(0)){
		data = data.slice(0,self.post.quantity);
	}

	if(self.post.searchType != undefined && typeof(self.post.quantity) === typeof("") && self.post.searchType.toLowerCase() == "location"){

		if( self.post.location == undefined ){
			self.json(utils.genericResponse(true,'Location required on location type search',{}));
			return;
		}

	}

	var result = utils.genericResponse(false,"",data);

	self.json(result);
}

/*
 *
 *
 **/
function getHospital(identifier){
	var self = this;

	var item = self.global.db.filter(function(item){
		if(item.id == identifier){
			return item;
		}
	});

	if(item.length === 0){
		self.json(utils.genericResponse(true,'Hospital not found',{}));
		return;
	}

	var result = utils.genericResponse(false,"",item[0]);

	self.json( result );
}