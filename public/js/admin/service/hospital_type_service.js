/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('HospitalTypeService', ['$http','$q', function($http,$q){
	var baseUrlApi = "/app/manage/hospital_type/";
	var def = $q;
	
	var list = function(){
		return $http({
			url:baseUrlApi,
		}).then(function(response){
			return response.data.result;
		},function(error){
			def.reject(error);
		});
	};

	return{
		list:list
	};
}]);