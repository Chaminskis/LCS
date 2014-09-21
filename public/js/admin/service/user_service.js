/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('UserService', ['$http','$q', function($http,$q){
    
    var def = $q;
    
    var baseUrl = "/app/manage/auth/user/";
    
    var list = function(callback){
        return $http({
                    url:baseUrl,
                    method:"GET"
                }).then(function(result){
                    return result.data.result;
                },function(error){
                    def.reject(error);
                });
    };
    
    var get = function(id){
        return $http({
            url:baseUrl + "view/"+id
        }).then(function(result){
            return result.data.result;
        },function(error){
            def.reject(error);
        });
    };
    
    var remove = function(id){
        return $http({
            url:baseUrl + "delete/"+id,
            method:"DELETE",
        }).then(function(result){
            return result.data.result;
        },function(error){
            def.reject(error);
        });
    };
    
    var save = function(model){
        return $http({
            url:baseUrl,
            method:"POST",
            data:model,
        }).then(function(result){
            return result.data.result;
        },function(error){
            def.reject(error);
        });
    };
    
    return {
        list:list,
        get:get,
        remove:remove,
        save:save,
    };
}]);