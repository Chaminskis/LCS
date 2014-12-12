/*
 *
 *
 **/

var utils = require('../definitions/utils_service.js');
var MedicalInsuranceService = require('../definitions/services/medical_insurance_service.js');

var controllerBaseUrl = '/app/manage/medical_insurance/';

exports.install = function(framework){
	
	framework.route(controllerBaseUrl + '{{quantity}}/',index,['GET','authorize']);
	framework.route(controllerBaseUrl + '',index,['GET','authorize']);
	framework.route(controllerBaseUrl + 'exclude/hospital/{{ id }}',excludeHospital,['GET','authorize']);
	framework.route(controllerBaseUrl + '',save,['JSON','POST','authorize']);	

	framework.route(controllerBaseUrl + 'view/{{ id }}',view,['GET','authorize']);
	framework.route(controllerBaseUrl + 'delete/{{ id }}',remove,['DELETE','authorize']);
}

function index(){
	var self = this;

	MedicalInsuranceService.find(function(result){
		self.json(utils.genericResponse(false,"",result));
	});
}

function excludeHospital(hospitalID){
	var self = this;
	
	MedicalInsuranceService.secureHasNotHospital(hospitalID,function(result){
	
		self.json(utils.genericResponse(false,"",result));
	});
}


function view(id){
	var self = this;

	MedicalInsuranceService.get(id,function(item){
		self.json(utils.genericResponse(false,"",item));
	});
}

function save(){
	var self = this;

	var model = self.post;
	
	console.log(model);

	MedicalInsuranceService.save(model,function(result){
		self.json(utils.genericResponse(false,"",result));
	});
}

function remove(id){
	var self = this;

	MedicalInsuranceService.remove(id,function(result){
		self.json(utils.genericResponse(false,"",result));
	});
}


