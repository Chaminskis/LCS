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

	var list = function(){
		return $http({
			url:baseUrlApi,
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

	return {
		save:save,
		list:list,
		get:get,
		delete:remove,
		addMedicalInsurance:addMedicalInsurance,
		removeMedicalAsurance:removeMedicalAsurance,
		addDoctor:addDoctor,
		removeDoctor:removeDoctor,
	};
}]);