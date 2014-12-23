/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('HospitalService', ['$http','$q', function($http,$q){
	
	var baseUrlApi = '/app/manage/hospital/';
	var def = $q;

	var save = function(model){
		return $http({
			url:baseUrlApi,
			method:'POST',
			data:model,
		}).then(function(response){
			return response.data;
		},function(error){
			return def.reject(error);
		});
	};

	var list = function(page){
		
		console.log("Page on hospital service " + page);
		
		return $http({
			url:baseUrlApi + page,
		}).then(function(result){
			return result.data;
		},function(error){
			def.reject(error);
		});
	};

	var get = function(id){
		return $http({
			url:baseUrlApi + 'view/'+id,
		}).then(function(response){
			return response.data.result;
		},function(error){
			def.reject(error);
		});
	};

	var remove = function(id){
		return $http({
			url:baseUrlApi + 'delete/'+id,
			method:'DELETE',
		}).then(function(result){
			return result.data;
		},function(error){
			def.reject(error);
		});
	};
	
	var addDoctor = function(hospital,doctor){
		return $http({
			url:baseUrlApi + "doctor/",
			method:"POST",
			data:{
				hospital:hospital,
				doctor:doctor
			}
		}).then(function(response){
			return response.data.result;
		},function(error){
			def.reject(error);
		});	
	};
	
	var removeDoctor = function(hospital,doctor){
		return $http({
			url:baseUrlApi + "doctor/",
			method:"PUT",
			data:{
				hospital:hospital,
				doctor:doctor
			}
		}).then(function(response){
			return response.data.result;
		},function(error){
			def.reject(error);
		});	
	};
	
	var addMedicalInsurance = function(hospital,medicalInsurance){
		return $http({
			url:baseUrlApi + "insurance/",
			method:"POST",
			data:{
				hospital:hospital,
				insurance:medicalInsurance
			}
		}).then(function(response){
			return response.data.result;
		},function(error){
			def.reject(error);
		});	
	};
	
	var removeMedicalAsurance = function(id,secureID){
		return $http({
			url:baseUrlApi + "insurance/",
			method:"PUT",
			data:{
				hospital:id,
				insurance:secureID
			}
		}).then(function(response){
			return response.data.result;
		},function(error){
			def.reject(error);
		});
	};
	
	var search = function(searchObject){
		return $http({
			url: baseUrlApi + "search/", // ;)
			method:'POST',
			data:searchObject
		}).then(function(response) {
			
			console.log("Search service");
			console.log(response);
			
		    return response.data;
		},function(error) {
		    def.reject(error);
		});	
	};
	
	/*
	 * lat,lng
	 *
	 **/
	var updateLocation = function(id,location){
		return $http({
			url: baseUrlApi + "location/", 
			method:'PUT',
			data:{
				id:id,
				location:location
			}
		}).then(function(response) {
			
			console.log("Search service");
			console.log(response);
			
		    return response.data;
		},function(error) {
		    def.reject(error);
		});		
	};
	
	/*
	 *
	 * Wrap method to simplyfy the search method and just search by criteria
	 *
	 **/
	var searchByCriteria = function(criteria){
		return search({
			searchType:"CRITERIA",
			criteria:criteria,
		});	
	};

	return {
		save:save,
		list:list,
		get:get,
		delete:remove,
		addMedicalInsurance:addMedicalInsurance,
		removeMedicalAsurance:removeMedicalAsurance,
		addDoctor:addDoctor,
		removeDoctor:removeDoctor,
		search:search,
		searchByCriteria:searchByCriteria,
		updateLocation:updateLocation,
	};
}]);