/*
 *
 *
 **/

'use strict';

angular.module('app.controllers', ['app.services'])

.controller('home', ['$scope', 'Hospital',  function($scope, home, hospital){
	// $scope.message = 'nice from controller';

	// $scope.$on('$viewContentLoaded', function(){
	    //Here your view content is fully loaded !!
	// });

	var setup = function(){
		// alert("loaded");
		Hospital.list().then(function(data){
				// alert("I'm loaded!");
				$scope.data = data.result;
				console.log($scope.data);
			},function(error){
				window.alert('Error ' + error);
		});  		
	}

	setup();
}]);