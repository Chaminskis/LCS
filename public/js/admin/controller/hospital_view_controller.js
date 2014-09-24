/*
 *
 *
 **/

 'use strict';

angular.module('app.controllers')

.controller('HospitalViewCtrl', ['$scope','$routeParams','HospitalService','MedicalSecureService', function($scope,$routeParams,Hospital,MedicalAsurance){
    
    var id = $routeParams.id;

    /** Error object **/
    $scope.error = {
        show:false, /** hide or show bootstrap alert on view **/
        message: "", 
        hideMessage:function(){
            this.show = false;
        }
    };
    
    /** on add new medical asurance it will reload the page when user close modal **/
    $scope.shouldReload = false;
    
    /** medical asurance list use it on modal **/
    $scope.medicalEnsurance = [];
    
    /*
     * init method
     *
     **/
    $scope.load = function(){
        Hospital.get(id)
        .then(function(result){
            console.log("Result view hospital",result);
            $scope.data = result;
        },function(error){
            window.alert('Error ' + error);
        });
    };

    /*
     * remove current hopsital
     *
     **/
    $scope.delete = function(id){

        var answer = window.confirm('Seguro de eliminar este Hospital?');

        if(answer === false){
            return;
        }

        Hospital.delete(id)
        .then(function(result){
            window.alert('Eliminardo exitosamente');

            window.location = '#/hospital/';
        },function(error){
            alert('Error ' + error);
        });
    };
    
    /** remove asurance from current list asurance list to add **/
    $scope.removeAsurance = function(secureID){
        $scope.medicalEnsurance = $scope.medicalEnsurance.filter(function(item){
            return secureID != item.id;
        });
    };
    
    /*
     *
     **/
    $scope.addMedicalInsurance = function(secureID){
    	  Hospital.addMedicalInsurance(id,secureID)
    	  .then(function(result){
    	      alert("Agregado con exito");
    	      
    	      $scope.shouldReload = true;
    	      
    	      $scope.removeAsurance(secureID);
    	  },function(error){
    	      window.alert(error);
    	  });
    };

    /*
     *
     *
     **/
    $scope.loadMedicalEnsurance = function(){
    	
    	MedicalAsurance.notRelatedMedicalAsurance(id)
    	.then(function(result){
    	    $scope.medicalEnsurance.push.apply($scope.medicalEnsurance,result);
    	},function(error){
    	    window.alert('Error ' + error);
    	});
    	
    };
    
    /*
     *
     **/
    $scope.reload = function(){
        
        if($scope.shouldReload === true){
            window.location.reload();
        }
    };
    
    /*
     * wrap method execute after remove relation between hospital and any asurance
     **/
    var postRemoveRelation = function(medicalAsuranceID){
        
        $scope.error.show = true;
        $scope.error.message = "Seguro medico desvinculado";
        
        $scope.data.secures = $scope.data.secures.filter(function(item){
            return item.id != medicalAsuranceID;
        });
    };
    
    /*
     * http call to remove one reliation between hospital and any asurance
     **/
    $scope.removeRelation = function(medicalAsuranceID){
        Hospital.removeMedicalAsurance(id,medicalAsuranceID)
        .then(function(result){
        
            //
            postRemoveRelation(medicalAsuranceID);
        },function(error){
            alert(error);
        });
    };
}]);