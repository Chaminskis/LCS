/*
 *
 *
 **/

 'use strict';

 angular.module('app.controllers')

 .controller('doctor',['$scope','Doctor',function($scope,Doctor){
 	$scope.message = 'nice from doctor index';

 	$scope.load = function(){
 		
 		Doctor.list().then(function(data){	
 			
 			$scope.doctors = data.result;

 		},function(error){
 			
 			alert('Error');
 			
 		});
 	}

 }]);