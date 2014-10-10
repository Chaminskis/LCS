/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('HospitalTypeService', ['$http','$q', function($http,$q){
	var baseUrlApi = "/app/manage/hospital_type/";
	
	var list = function(){
		
		var def = $q.defer();
		
		$http({
			url:baseUrlApi,
		}).then(function(response){
			def.resolve(response.data.result);
		},function(error){
			def.reject(error);
		});
		
		return def.promise;
	};

	return{
		list:list
	};
}]);