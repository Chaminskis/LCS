
/*
 * Service Api
 *
 *
 **/

/** Imports **/
var controllerBaseUrl = '/app/service/';
var utils = require('../definitions/utils_service.js');
var HospitalService = require('../definitions/services/hospital_service.js');
var medicalInsuranceService = require('../definitions/services/medical_insurance_service.js');

/** Routes **/
exports.install = function(framework){
	framework.route(controllerBaseUrl,dummy,['GET']);
	
	framework.route(controllerBaseUrl + 'hospitals/',index,['GET']);
	framework.route(controllerBaseUrl + 'hospitals/',getHospitals,['POST','JSON']);
	framework.route(controllerBaseUrl + 'hospital/{identifier}/',getHospital,['GET']);
	
	framework.route(controllerBaseUrl + 'medical_insurance/',getMedicalInsurance,['POST','JSON']);
};

/*
 *
 *
 **/
function dummy(){

	HospitalService.hi(function(model){
		console.log('result');
	});

	this.json({nice:4});
}

/*
 *
 **/
function getMedicalInsurance(){
	var self = this;
	
	var data = self.post;
	
	var quantity = data.quantity || 20;
	
	medicalInsuranceService.find(quantity,function(result){
		self.json(utils.genericResponse(false,"",result));	
	});
}

/*
 *
 *
 **/
function getHospitals(){
	var self = this;
	var data = self.global.db;
	
	var quantity = 10;
	
	if(self.post.quantity !== undefined && typeof(self.post.quantity) === typeof(0)){
		data = data.slice(0,self.post.quantity);
	}

	if(self.post.searchType !== undefined && typeof(self.post.quantity) === typeof("") && self.post.searchType.toLowerCase() == "location"){

		if( self.post.location === undefined ){
			self.json(utils.genericResponse(true,'Location required on location type search',{}));
			return;
		}
	}
	
	HospitalService.findAll(quantity,function(result){
		self.json(utils.genericResponse(false,"",result));	
	});
}

/*
 *
 *
 **/
function index(){
	var self = this;

	HospitalService.findAll(function(result){
		self.json(utils.genericResponse(false,'',result));
	});
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

	self.json( utils.genericResponse(false,"",item[0]));
}