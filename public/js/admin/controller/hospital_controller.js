/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HospitalCtrl', ['$scope','Hospital', function($scope,Hospital){
	$scope.message = 'hopsital index controller';	

	$scope.load = function(){
		Hospital.list().then(function(data){
			$scope.data = data.result;
		},function(error){
			window.alert('Error ' + error);
		});
	};
}]);