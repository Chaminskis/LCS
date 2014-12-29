
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

	var data = [{
	    "name": "Cedimat",
	    "Point": {
	        "coordinates": "-69.922721,18.48895,0.0"
	    }
	},
	{
	    "name": "Plaza de la Salud",
	    "Point": {
	        "coordinates": "-69.922335,18.486976,0.0"
	    }
	},
	{
	    "name": "Centro Medico Corominas Pepin",
	    "Point": {
	        "coordinates": "-69.921879,18.480622,0.0"
	    }
	},
	{
	    "name": "Centro de Otorinolaringologia y Especialidades",
	    "Point": {
	        "coordinates": "-69.906145,18.476266,0.0"
	    }
	},
	{
	    "name": "Clinica Gomez Patiño",
	    "Point": {
	        "coordinates": "-69.906623,18.461572,0.0"
	    }
	},
	{
	    "name": "Centro de Obstreticia y Ginecologia",
	    "Point": {
	        "coordinates": "-69.900223,18.464495,0.0"
	    }
	},
	{
	    "name": "Clinica Abreu",
	    "Point": {
	        "coordinates": "-69.895105,18.467087000000003,0.0"
	    }
	},
	{
	    "name": "Padre Billini",
	    "Point": {
	        "coordinates": "-69.889129,18.471219,0.0"
	    }
	},
	{
	    "name": "Grupo de Salud Gazcue",
	    "Point": {
	        "coordinates": "-69.911579,18.466976,0.0"
	    }
	},
	{
	    "name": "Clinica Doctor Betances",
	    "Point": {
	        "coordinates": "-69.912701,18.466701,0.0"
	    }
	},
	{
	    "name": "Hospital Docente Semma",
	    "Point": {
	        "coordinates": "-69.901929,18.467606,0.0"
	    }
	},
	{
	    "name": "Robert Read Cabral para niños",
	    "Point": {
	        "coordinates": "-69.923944,18.452509000000003,0.0"
	    }
	},
	{
	    "name": "Clinica Independencia",
	    "Point": {
	        "coordinates": "-69.932334,18.448275,0.0"
	    }
	},
	{
	    "name": "Hospital Propuesto",
	    "Point": {
	        "coordinates": "-69.915399,18.490944,0.0"
	    }
	},
	{
	    "name": "Abel Gonzalez",
	    "Point": {
	        "coordinates": "-69.934705,18.474404,0.0"
	    }
	},
	{
	    "name": "Centro Medico Dominicano",
	    "Point": {
	        "coordinates": "-69.955949,18.455761,0.0"
	    }
	},
	{
	    "name": "Hospital Traumatologico Ney Arias Lora H",
	    "Point": {
	        "coordinates": "-69.88398,18.547457,0.0"
	    }
	},
	{
	    "name": "Hospital Luis Aibar",
	    "Point": {
	        "coordinates": "-69.890256,18.495157,0.0"
	    }
	},
	{
	    "name": "Instituto Dermatologico",
	    "Point": {
	        "coordinates": "-69.889956,18.494261,0.0"
	    }
	},
	{
	    "name": "Instituto Oncologico",
	    "Point": {
	        "coordinates": "-69.91431,18.460417,0.0"
	    }
	},
	{
	    "name": "Instituto Nacional del Cancer Rosa Emilia Tavrez",
	    "Point": {
	        "coordinates": "-69.919567,18.458412,0.0"
	    }
	},
	{
	    "name": "Centro Medico Dominico Cubano",
	    "Point": {
	        "coordinates": "-69.913269,18.45919,0.0"
	    }
	},
	{
	    "name": "Hospital Dr. Dario Contreras",
	    "Point": {
	        "coordinates": "-69.863187,18.485735,0.0"
	    }
	},
	{
	    "name": "Hospital Central de las Fuerzas Armadas",
	    "Point": {
	        "coordinates": "-69.921123,18.480647000000005,0.0"
	    }
	},
	{
	    "name": "Clinica Rodriguez Santos",
	    "Point": {
	        "coordinates": "-69.899692,18.480609,0.0"
	    }
	},
	{
	    "name": "Centro Medico alcantara & Gonzalez",
	    "Point": {
	        "coordinates": "-69.921726,18.491959,0.0"
	    }
	},
	{
	    "name": "Posible Solar",
	    "Point": {
	        "coordinates": "-69.893346,18.497761,0.0"
	    }
	},
	{
	    "name": "Hospiten",
	    "Point": {
	        "coordinates": "-69.921235,18.465149,0.0"
	    }
	},
	{
	    "name": "Hospital REgional Doctor MArcelino Velez Santana",
	    "Point": {
	        "coordinates": "-69.971226,18.473086,0.0"
	    }
	},
	{
	    "name": "Placemark 33",
	    "Point": {
	        "coordinates": "-69.95936,18.497619,0.0"
	    }
	},
	{
	    "name": "Centro Medico Moderno",
	    "Point": {
	        "coordinates": "-69.957483,18.476002,0.0"
	    }
	},
	{
	    "name": "Centro Medico Integral 2",
	    "Point": {
	        "coordinates": "-69.877993,18.47998,0.0"
	    }
	},
	{
	    "name": "Centro Medico Integral",
	    "Point": {
	        "coordinates": "-69.839734,18.516827,0.0"
	    }
	},
	{
	    "name": "Alex rodriguez",
	    "Point": {
	        "coordinates": "-69.982266,18.490883,0.0"
	    }
	},
	{
	    "name": "Mario Guerra",
	    "Point": {
	        "coordinates": "-69.906204,18.461022000000003,0.0"
	    }
	},
	{
	    "name": "x mirador",
	    "Point": {
	        "coordinates": "-69.986537,18.433019,0.0"
	    }
	},
	{
	    "name": "CECANOT",
	    "Point": {
	        "coordinates": "-69.889827,18.494119,0.0"
	    }
	},
	{
	    "name": "Centro Medico Real",
	    "Point": {
	        "coordinates": "-69.964628,18.447227,0.0"
	    }
	},
	{
	    "name": "Centro Medico Universal",
	    "Point": {
	        "coordinates": "-69.868155,18.485999,0.0"
	    }
	},
	{
	    "name": "Centro Policlinico Nacional",
	    "Point": {
	        "coordinates": "-69.849905,18.511578,0.0"
	    }
	}];
	
	var results = [];
	
	var callback = function(result){
		
		console.log("Callback result");
		
		results.push(result);
		
		console.log("resultado search",result);
	};

	for(var i=0;i<data.length;i++){
		var item = data[i];
		
		var searchObject = {
			searchType:"CRITERIA",
			criteria:item.name
		};
		
		console.log("iteration object");
		
		HospitalService.search(searchObject,callback);
	}

	var self = this;
	
	setInterval(200,function(){
		if(results.length > 3){
			self.json(results);
		}	
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