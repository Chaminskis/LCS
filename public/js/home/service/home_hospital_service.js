/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('HomeHospitalService', ['$http','$q', 'HospitalService',function($http,$q, hospitalService){
	 
	

	var createSearchObject = function (){

		return {
			"searchType":"LOCATION",
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
	}
	var findHospitalsByLocation = function(location){

		var searchObject = createSearchObject();
		var location = createLocationObject(location.lat, location.lon);
		searchObject.location = location;
 		
		return hospitalService.search(searchObject);
		// return performSearch(searchObject);

	}

	var findHospitalsByName = function(searchParam){
		var loc = createLocationObject(searchParam.location.lat, searchParam.location.lon);
		var searchObject = createSearchObject();
		
		return searchObject.search(searchObject);
	}

	var performSearch = function(searchObject){
		var searchUrl = '/app/manage/hospital/search';
		var task = $q.defer();
		$http({
			url: searchUrl,
			method:'POST',
			data:searchObject
		}).success(function(response){
			task.resolve(response);
		}).error(function(){

			task.reject({ error: 'Error trying to retrieve hospital'});
		});
		return task.promise;
	};

	return {
		findHospitalsByLocation: findHospitalsByLocation,
		findHospitalsByName: findHospitalsByName
	}
}]);	