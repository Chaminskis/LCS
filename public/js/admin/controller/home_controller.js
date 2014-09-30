/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')
.controller('AdminHomeCtrl', ['$scope',function($scope){
    
    $scope.sectionActive = 'home';
	
	$scope.setActive = function(section){
	    $scope.sectionActive = section;
	};
	
	$scope.active = function(section){
	    return section == $scope.sectionActive;
	};
	
	$scope.load = function(){
		var controller = window.location.hash.split('/')[1]
		
		$scope.setActive(controller);
	};
    
}]);