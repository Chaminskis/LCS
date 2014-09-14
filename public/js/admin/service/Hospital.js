/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('Hospital', ['$http','$q', function($http,$q){
	
	var def = $q;

	var save = function(model){
		
		alert('Save Joder');
		console.log('Data to save');
		console.log(model);

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
		return $http({
			url:'/app/manage/hospital/',
		}).then(function(result){
			
			console.log(result);

			return result.data;
		},function(error){
			def.reject(error);
		});
	};

	var get = function(id){
		return $http({
			url:'/app/manage/hospital/view/'+id,
		}).then(function(result){
			console.log(result);
			return result.data;
		},function(error){
			dev.reject(error);
		});
	};

	var deleteMethod = function(id){

		window.alert(id);

		return $http({
			url:'/app/manage/hospital/delete/'+id,
			method:'DELETE',
		}).then(function(result){
			console.log(result);
			return result.data;
		},function(error){
			dev.reject(error);
		});
	};

	return {
		save:save,
		list:list,
		get:get,
		delete:deleteMethod,
	};
}]);