/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HomeCtrl',['$scope','HospitalService',function($scope,Hospital){
	$scope.message = 'nice from controller';
	
	alert("you, loading??");
	
    $scope.load = function(){
    	Hospital.list().then(function(data){
    		alert("I'm loaded!");
    		$scope.data = data.result;
    		console.log($scope.data);
    	},function(error){
    		window.alert('Error ' + error);
    	});
    };

}]);