/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('HomeHospitalService', ['$http','$q', 'HospitalService',function($http,$q, hospitalService){
	 
	var searchType = {
		LOCATION : "LOCATION",
		CRITERIA : "CRITERIA"
	};

	var createSearchObject = function (searchType){

		return {
			"searchType":searchType,
	  		"criteria":"",
	  		"location":{
				"lat":0,
	    		"lon":0,
	    		"distance":0
			}
		};	
	};

	var createLocationObject = function(lat, lon){
		
		return {
			"lat": lat,
			"lon": lon,
			"distance": 500
		};
	};
	
	var findHospitalsByLocation = function(location){

		var searchObject = createSearchObject(searchType.LOCATION);
		
		var tmpLocation = createLocationObject(location.lat, location.lon);
		
		searchObject.location = location;
 		console.log(searchObject);
		 return hospitalService.search(searchObject);
		//return performSearch(searchObject);
	};

	var findHospitalsByCriteria = function(searchParam){
		
		console.log(searchParam);
		
		//unused variable
		//var loc = createLocationObject(searchParam.location.lat, searchParam.location.lon);
		
		var searchObject = createSearchObject(searchType.CRITERIA);
		
		return hospitalService.search(searchObject);		
	};

	var performSearch = function(searchObject){
		var def = $q.defer();
		var x =  {
			"error":false,
			"message":"",
			"result":
			{
				"count": 3,
				"rows": [{"id":1,
				"name":"Clínica Independencia",
				"details":"Debitis quasi ullamco quos nullam! Ullamco fames lacus, justo, laborum in id eleifend posuere porta lobortis curabitur in minim. Fugiat. Lectus pariatur in nostrud, pariatur laboris aliquam vivamus, tortor, sodales, dolor quo eleifend, sodales. Nec aenean",
				"address":"Calle ovanco casi esquina albert thomas",
				"latitude":18.490031, 
				"longitude":-69.922130,
				"hospital_type":2,
				"secures":
					[{"id":1,"name":"Humano","details":"Seguro medico Humano"},
					{"id":3,"name":"ARS Senasa","details":"ARS Senasa", "logo": "/images/trollface.jpg"},
					{"id":2,"name":"Plic","details":"Palic seguros", "logo": "/images/trollface.jpg"}],
					"doctors":
						[{"id":1,
						"name":"Doctor Fulano",
						"last":"Apellido",
						"details":"El mejor en operaciones corazon abierto. Aparte Debitis quasi ullamco quos nullam! Ullamco fames lacus, justo, laborum in id eleifend posuere porta lobortis curabitur in minim. Fugiat. Lectus pariatur in nostrud, pariatur laboris aliquam vivamus, tortor, "
						}],
						"hospitalType":
						{"id":2,"name":"CLINICA","details":"Clinica"}},
					{"id":2,
					"name":"Plaza de la Salud",
					"details":"Debitis quasi ullamco quos nullam! Ullamco fames lacus, justo, laborum in id eleifend posuere porta lobortis curabitur in minim. Fugiat. Lectus pariatur in nostrud, pariatur laboris aliquam vivamus, tortor, sodales, dolor quo eleifend, sodales. Nec aenean",
					"address":"Calle ovanco casi esquina albert thomas",
					"latitude":18.488751, 
					"longitude":-69.922003,
					"hospital_type":1,
					"secures":
						[{"id":1,"name":"Humano","details":"Seguro medico Humano"},
						{"id":3,"name":"ARS Senasa","details":"ARS Senasa", "logo": "/images/trollface.jpg"},
						{"id":2,"name":"Plic","details":"Palic seguros", "logo": "/images/trollface.jpg"}],
						"doctors":
							[{"id":1,
							"name":"Doctor Fulano",
							"last":"Apellido",
							"details":"El mejor en operaciones corazon abierto. Aparte Debitis quasi ullamco quos nullam! Ullamco fames lacus, justo, laborum in id eleifend posuere porta lobortis curabitur in minim. Fugiat. Lectus pariatur in nostrud, pariatur laboris aliquam vivamus, tortor, "
							}],
							"hospitalType":
							{"id":2,"name":"CLINICA","details":"Clinica"}}
							,
					{"id":3,
					"name":"UAP Robert Read Cabral",
					"details":"Debitis quasi ullamco quos nullam! Ullamco fames lacus, justo, laborum in id eleifend posuere porta lobortis curabitur in minim. Fugiat. Lectus pariatur in nostrud, pariatur laboris aliquam vivamus, tortor, sodales, dolor quo eleifend, sodales. Nec aenean",
					"address":"Calle ovanco casi esquina albert thomas",
					"latitude":18.453572, 
					"longitude":-69.923581,
					"hospital_type":2,
					"secures":
						[{"id":1,"name":"Humano","details":"Seguro medico Humano"},
						{"id":3,"name":"ARS Senasa","details":"ARS Senasa", "logo": "/images/trollface.jpg"},
						{"id":2,"name":"Plic","details":"Palic seguros", "logo": "/images/trollface.jpg"}],
						"doctors":
							[{"id":1,
							"name":"Doctor Fulano",
							"last":"Apellido",
							"details":"El mejor en operaciones corazon abierto. Aparte Debitis quasi ullamco quos nullam! Ullamco fames lacus, justo, laborum in id eleifend posuere porta lobortis curabitur in minim. Fugiat. Lectus pariatur in nostrud, pariatur laboris aliquam vivamus, tortor, "
							}],
							"hospitalType":
							{"id":2,"name":"CLINICA","details":"Clinica"}}
								]
			}};
			def.resolve(x);
			return def.promise;
	};

	return {
		findHospitalsByLocation: findHospitalsByLocation,
		findHospitalsByCriteria: findHospitalsByCriteria
	}
}]);	