
/*
 * Service Api
 *
 *
 **/

/** Imports **/
var controllerBaseUrl = '/app/service/';
var utils = require('../definitions/utils_service.js');
var HospitalService = require('../definitions/services/hospital_service.js');
var MedicalInsuranceService = require('../definitions/services/medical_insurance_service.js');
var HospitalTypeService = require('../definitions/services/hospital_type_service.js');

/** Routes **/
exports.install = function(framework){
	framework.route(controllerBaseUrl,dummy,['GET']);
	
	framework.route(controllerBaseUrl + 'hospitals/',index,['GET']);
	framework.route(controllerBaseUrl + 'hospitals/',getHospitals,['POST','JSON']);
	framework.route(controllerBaseUrl + 'hospital/{identifier}/',getHospital,['GET']);
	
	/** MEdical insurance **/
	framework.route(controllerBaseUrl + 'medical_insurance/',getMedicalInsurance,['POST','JSON']);
	//this is just a get all
	framework.route(controllerBaseUrl + 'medical_insurance/',medicalInsurance,['GET']);
	
	/** Hospital type **/
	framework.route(controllerBaseUrl + 'hospital_type/',hospitalType,['GET']);
	
	/** Search **/
	framework.route(controllerBaseUrl + 'hospitals/search/',hosptalSearch,['POST','JSON']);
	
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
function medicalInsurance(){
	var self = this;

	MedicalInsuranceService.find(function(result){
		self.json(utils.genericResponse(false,"",result));
	});
}

/*
 *
 **/
function getMedicalInsurance(){
	var self = this;
	
	var data = self.post;
	
	var quantity = data.quantity || 20;
	
	MedicalInsuranceService.find(quantity,function(result){
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


/*
 *
 *
 **/
function hospitalType(){
	var self = this;

	HospitalTypeService.find(function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}

/*
 *
 *
 **/
function hosptalSearch(){
	var self = this;
	
	var searchObject = self.post;
	
	HospitalService.search(searchObject,function(result){
		
		if(result === typeof('')){
			self.json(utils.genericResponse(true,result,null));	
			return;
		}
		
		self.json(utils.genericResponse(false,'',result));	
	});
}