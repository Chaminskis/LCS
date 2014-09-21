/*
 *
 *
 **/

 'use strict';

 angular.module('app.controllers')

 .controller('HospitalViewCtrl', ['$scope','$routeParams','HospitalService', function($scope,$routeParams,Hospital){
 	
	var id = $routeParams.id;

 	$scope.message = 'nice from hospital view';

 	$scope.load = function(){
	 	Hospital.get(id)
	 	.then(function(data){
	 		console.log(data);
	 		$scope.data = data.result;
	 	},function(error){
	 		window.alert('Error ' + error);
	 	});
 	};

 	$scope.delete = function(id){

 		var answer = window.confirm('Seguro de eliminar este Hospital?');

 		if(answer === false){
 			return;
 		}

 		Hospital.delete(id)
 		.then(function(result){

 			window.alert('Eliminardo exitosamente');

 			window.location = '#/hospital/';
 		},function(error){
 			alert('Error ' + error);
 		});
 	}
 }]);