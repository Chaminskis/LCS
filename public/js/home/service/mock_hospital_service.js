/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('MockHospitalService', ['$http','$q', function($http,$q){
	
	var hospitals = [

	{
		id: 1,
		name: "Clínica Independencia",
		details: "Clínica de propósito general",
		latitude: 18.449273,
		longitude: -69.932125
	},

	{
		id: 2,
		name: "Hospital General Plaza de La Salud",
		details: "Hospital semiprivado.",
		latitude: 18.489584,
		longitude: -69.922087
	},

	{
		id: 3,
		name: "Hospital Robert Reid Cabral",
		details: "eh??",
		latitude: 18.453796, 
		longitude: -69.923753

	}

	]

	var getHospitals = function(){
		return hospitals;
	}

	return {
		getHospitals: getHospitals
	}
}]);	