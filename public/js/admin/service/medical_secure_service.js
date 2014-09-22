/*
 *
 *
 **/
 'use strict';
 
 angular.module('app.services')
 
 .service('MedicalSecureService',['$http','$q',function($http,$q){
     
     var baseUrlApi = "/app/manage/medical_secure/";
     var def = $q;
     
     var save = function(model){
         return $http({
             url:baseUrlApi,
             method:"POST",
             data:model,
         }).then(function(result){
             return result.data;
         },
         function(error){
             def.reject(error);
         });
     };
     
     var list = function(){
         return $http({
             url:baseUrlApi,
         }).then(function(response){
             return response.data.result;
         },function(error){
            def.reject(error);
         });
     };
     
     var get = function(id){
         return $http({
             url:baseUrlApi + "view/"+id
         }).then(function(response){
             return response.data.result;
         },function(error){
             def.reject(error)
         });
     };
     
     var remove = function(id){
         return $http({
             url: baseUrlApi + 'delete/'+id,
             method:'DELETE',
         }).then(function(response){
             return response.data;
         },function(error){
             def.reject(error);
         });
     };
     
     var notrelatedMedicalAsurance = function(hospitalID){
         return $http({
             url:baseUrlApi + "exclude/hospital/"+hospitalID
         }).then(function(response){
             
             var result = [];
             
             for(var i=0;i<response.data.result.length;i++){
                 var item = response.data.result[i];
                 
                 delete item['hospitals'];
                 
                 result.push(item);
             }
             
             return result;
         },function(error){
             return error;
         });
     };
     
     return {
         save:save,
         find:list,
         get:get,
         delete:remove,
         notrelatedMedicalAsurance:notrelatedMedicalAsurance,
     }
 }]);