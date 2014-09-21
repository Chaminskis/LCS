/*
 *
 *
 **/

 'use strict';

 angular.module('app.controllers')

 .controller('AuthUserCreate', ['$scope','UserService', function($scope,User){
 	
 	$scope.message = 'nice from auth user create';
 	
    $scope.save = function(){
        
      var model = $scope.model;
      
      User.save(model)
      .then(function(result){
          alert('Usuario Creado');
          
          window.location = '#/auth/users/';
      },function(error){
          alert('Error');
      });
    };
 	
 }]);