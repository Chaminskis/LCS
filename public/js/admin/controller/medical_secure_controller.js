/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('MedicalSecureCtrl', ['$scope','MedicalSecure', function($scope,MedicalSecure){
	
	$scope.load = function(){
	    MedicalSecure.find().then(function(items){
	        $scope.model = items;
	    },function(error){
	        alert('Error ' + error);
	    });
	};
	
}]);