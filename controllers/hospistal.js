/*
 *
 *
 **/

var utils = require('../definitions/utils_service.js');
var controllerBaseUrl = '/app/manage/hospital/';

var HospitalService = require('../definitions/services/hospital_service.js');

exports.install = function(framework){
	
	framework.route(controllerBaseUrl + '',index,['GET','authorize']);
	framework.route(controllerBaseUrl + '{{ page }}',index,['GET','authorize']);
	framework.route(controllerBaseUrl + '',save,['JSON','POST','authorize']);

	framework.route(controllerBaseUrl + 'names/',getNames,['GET','authorize']);
	framework.route(controllerBaseUrl + 'all/',full,['GET','authorize']);
	framework.route(controllerBaseUrl + 'search/',search,['POST','JSON']);
	
	/** Insurance **/
	framework.route(controllerBaseUrl + 'insurance/',addMedicalInsurance,['JSON','POST','authorize']);
	framework.route(controllerBaseUrl + 'insurance/',removeMedicalInsurance,['JSON','PUT','authorize']);
	
	/** Doctor **/
	framework.route(controllerBaseUrl + 'doctor/',addDoctor,['JSON','POST','authorize']);
	framework.route(controllerBaseUrl + 'doctor/',removeDoctor,['JSON','PUT','authorize']);
	
	framework.route(controllerBaseUrl + 'view/{{ id }}',view,['GET','authorize']);
	framework.route(controllerBaseUrl + 'delete/{{ id }}',remove,['DELETE','authorize']);
	
	framework.route('#401', error401);
};

function error401(){
	this.redirect('/app/manage/login');
}

function index(page){
	
	if(page === undefined){
		page = 1;
	}
	
	var self = this;

	HospitalService.find(page,function(result){
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