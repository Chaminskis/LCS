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
			url:'/app/manage/hospital/',
		}).then(function(result){
			return result.data;
		},function(error){
			def.reject(error);
		});
	};

	var get = function(id){
		return $http({
			url:'/app/manage/hospital/view/'+id,
		}).then(function(response){
			return response.data.result;
		},function(error){
			def.reject(error);
		});
	};

	var remove = function(id){
		return $http({
			url:'/app/manage/hospital/delete/'+id,
			method:'DELETE',
		}).then(function(result){
			return result.data;
		},function(error){
			def.reject(error);
		});
	};
	
	var addMedicalInsurance = function(hospital,medicalInsurance){
		return $http({
			url:baseUrlApi + "asurance/",
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

	return {
		save:save,
		list:list,
		get:get,
		delete:remove,
		addMedicalInsurance:addMedicalInsurance
	};
}]);