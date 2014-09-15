/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('home', 'hospital', ['$scope',function($scope, home, hospital){
	$scope.message = 'nice from controller';

$scope.load = function(){
	hospital.list().then(function(data){
		alert("I'm loaded!");
		$scope.data = data.result;
	},function(error){
		window.alert('Error ' + error);
	});
};

}]);