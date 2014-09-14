/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('Hospital', ['$http','$q', function($http,$q){
	
	var def = $q;

	var save = function(model){
		return $http({
			url:'/app/manage/hospital/',
			method:'POST',
			data:model,
		}).then(function(result){
			return result.data;
		},function(error){
			return dev.reject(error);
		});
	};

	var list = function(){

	};

	var get = function(){

	};

	var deleteMethod = function(){

	};

	return {
		save:save,
		list:list,
		get:get,
		delete:deleteMethod,
	};
}]);