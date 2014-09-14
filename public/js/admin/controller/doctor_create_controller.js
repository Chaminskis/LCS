/*
 *
 *
 **/

'use strict';

console.log(angular.module('app.services'));

angular.module('app.controllers')

.controller('doctor_create', ['$scope','Doctor', function($scope,Doctor){

	$scope.model = {};

 	$scope.save = function(){
 		
 		var model = $scope.model;
 		
 		Doctor.save(model)
 		.then(function(data){
 			alert('Success');

 			$scope.model = {};
 		},function(error){
 			alert('Error');
 		});
 	};
}]);