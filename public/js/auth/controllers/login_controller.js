/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('LoginCtrl',['$scope','AuthService',function($scope,AuthService){
    $scope.message = "nitido en el nintendo";
    
    $scope.model = {};
    
    $scope.login = function(){
        
        var user = $scope.model.user;
        var password = $scope.model.password;
        
        AuthService.login(user,password).then(function(result){
            
            console.log(result);
            
            if(result.error === false){
                window.location = "/app/manage/";
                return;
            }
            
            alert("metio mano");
        },function(error){
            alert(error);
        });    
    };
    
}]);