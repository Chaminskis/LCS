/*
 *
 *
 **/

var utils = require('../definitions/utils_service.js');
var controllerBaseUrl = '/app/manage/hospital/';

var HospitalService = require('../definitions/services/hospital_service.js');

exports.install = function(framework){
	framework.route(controllerBaseUrl + '',index,['GET']);
	framework.route(controllerBaseUrl + '',save,['JSON','POST']);

	framework.route(controllerBaseUrl + 'names/',getNames,['GET']);
	framework.route(controllerBaseUrl + 'all/',full,['GET']);
	framework.route(controllerBaseUrl + 'search/',search,['POST','JSON']);
	
	/** Insurance **/
	framework.route(controllerBaseUrl + 'insurance/',addMedicalInsurance,['JSON','POST']);
	framework.route(controllerBaseUrl + 'insurance/',removeMedicalInsurance,['JSON','PUT']);
	
	/** Doctor **/
	framework.route(controllerBaseUrl + 'doctor/',addDoctor,['JSON','POST']);
	framework.route(controllerBaseUrl + 'doctor/',removeDoctor,['JSON','PUT']);
	
	framework.route(controllerBaseUrl + 'view/{{ id }}',view,['GET']);
	framework.route(controllerBaseUrl + 'delete/{{ id }}',remove,['DELETE']);
}

function index(){
	var self = this;

	HospitalService.find(function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}

function search(){
	
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

function getNames(){
	var self = this;
	
	HospitalService.findAllNames(function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}

function full(){
	var self = this;

	HospitalService.findAll(function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}

function save(){
	var self = this;

	var data = self.post;

	HospitalService.save(data,function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}

function remove(id){
	var self = this;

	HospitalService.delete(id,function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}

function view(id){
	var self = this;

	HospitalService.get(id,function(item){
		self.json(utils.genericResponse(false,'',item));
	});
	
}

function addMedicalInsurance(){
	var self = this;
	
	var hospital = self.post.hospital;
	var insurance = self.post.insurance;
	
	console.log(hospital,insurance);
	
	HospitalService.addMedicalInsurance(hospital,insurance,function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}


function removeMedicalInsurance(){
	var self = this;
	
	var hospital = self.post.hospital;
	var insurance = self.post.insurance;
	
	HospitalService.removeMedicalInsurance(hospital,insurance,function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}



function addDoctor(){
	var self = this;
	
	var hospital = self.post.hospital;
	var doctor = self.post.doctor;
	
	HospitalService.addDoctor(hospital,doctor,function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}

function removeDoctor(){
	var self = this;
	
	var hospital = self.post.hospital;
	var doctor = self.post.doctor;
	
	HospitalService.removeDoctor(hospital,doctor,function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}