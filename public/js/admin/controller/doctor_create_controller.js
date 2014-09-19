/*
 * Doctor controller for create new Daaaaa
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('DoctorCreateCtrl', ['$scope','DoctorService', function($scope,Doctor){

	$scope.model = {};

 	$scope.save = function(){
 		alert("Save manito");
 		var model = $scope.model;
 		
 		Doctor.save(model)
 		.then(function(data){
 			window.alert('Success');

 			console.log(data);

 			$scope.model = {};
 			
 			window.location = "#/doctors/";
 			
 		},function(error){
 			window.alert('Error '+ error);
 		});
 	};
}]);