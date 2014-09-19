/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

<<<<<<< HEAD
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
=======
.controller('HomeCtrl',['$scope',function($scope){
	$scope.message = 'nice from controller';
	
	$scope.sectionActive = 'home';
	
	$scope.setActive = function(section){
	    $scope.sectionActive = section;
	};
	
	$scope.active = function(section){
	    
	    return section == $scope.sectionActive;
	};
	
>>>>>>> 15313f6297378da4edae15550c9707ae8a4b034a
}]);