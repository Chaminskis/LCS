/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HomeCtrl',['$scope',function($scope){
	$scope.message = 'nice from controller';
	
	$scope.sectionActive = 'home';
	
	$scope.setActive = function(section){
	    $scope.sectionActive = section;
	};
	
	$scope.active = function(section){
	    
	    return section == $scope.sectionActive;
	};
	
}]);