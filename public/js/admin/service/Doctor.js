/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('Doctor', ['$http','$q', function($http,$q){
 	
	var def = $q;

	var list = function(){
		return $http({
			url:'/app/manage/doctor/',
		}).then(function(data){
			console.log('Result nice doctors');
			console.log(data);
			return data.data;
		},function(data){
			console.log('Result Error');
			def.reject(data);
		});		
	};

	var get = function(id){
		return $http({
			url:'/app/manage/doctor/view/' + id
		}).then(function(data){
			return data.data;
		},function(error){	
			def.reject(error);
		});
	};

	var save = function(model){

		var dataToSend = {
			name:model.name,
			last:model.last,
			details:model.details,
		};

		return $http({
			url:'/app/manage/doctor/',
			data:dataToSend,
			method:'POST',
		}).then(function(data){
			console.log('Save data');
			console.log(data);
			return data;
		},function(data){
			def.reject(data);
		});
	};

	var deleteMethod = function(id){
		return $http({
			url:'/app/manage/doctor/delete/'+id,
			method:'DELETE'
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
		delete:deleteMethod,
	};

}]);