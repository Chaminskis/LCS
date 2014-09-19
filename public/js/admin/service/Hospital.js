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
		}).then(function(result){
			return result.data;
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

	return {
		save:save,
		list:list,
		get:get,
		delete:remove,
	};
}]);