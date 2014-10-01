/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('MedicalSecureCtrl', ['$scope','MedicalSecureService', function($scope,MedicalSecure){
	
	$scope.load = function(){
	    MedicalSecure.find().then(function(result){
	        $scope.model = result.rows;
	    },function(error){
	        alert('Error ' + error);
	    });
	};
	
}]);