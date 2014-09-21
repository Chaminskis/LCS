/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('DoctorIndexCtrl',['$scope','DoctorService',function($scope,Doctor){

 	$scope.load = function(){
 		Doctor.list().then(function(data){	
 			$scope.doctors = data.result;
 		},function(error){
 			window.alert('Error' + error);
 		});
 	};
 	
}]);