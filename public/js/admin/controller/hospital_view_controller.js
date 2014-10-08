/*
 *
 *
 **/

 'use strict';

angular.module('app.controllers')

.controller('HospitalViewCtrl', ['$scope','$routeParams','HospitalService','MedicalInsuranceService','DoctorService', function($scope,$routeParams,Hospital,MedicalInsurance,Doctor){
    
    var id = $routeParams.id;

    /** Error object **/
    $scope.error = {
        show:false, /** hide or show bootstrap alert on view **/
        message: "", 
        hideMessage:function(){
            this.show = false;
        }
    };
    
    /** medical asurance list use it on modal **/
    $scope.medicalEnsurance = [];
    
    /** doctors **/
    $scope.doctors = [];
    
    /*
     * init method
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
    
    /*
     * Remove Insurance from current list insurance list to add 
     **/
    $scope.removeAsurance = function(secureID){
        $scope.medicalEnsurance = $scope.medicalEnsurance.filter(function(item){
            return secureID != item.id;
        });
    };
    
    /*
     * Remove doctor from current list doctor list to add 
     **/
    $scope.removeDoctor = function(doctorID){
        $scope.doctors = $scope.doctors.filter(function(item){
            return doctorID != item.id;
        });
    };
    
    $scope.postAddInsurance = function(medicalInsuranceID){
        
        $scope.data.secures.push.apply($scope.data.secures,$scope.medicalEnsurance.filter(function(item){
            return medicalInsuranceID == item.id;
        }));
        
    	$scope.removeAsurance(medicalInsuranceID);
    };
    
    /*
     *
     **/
    $scope.addMedicalInsurance = function(secureID){
    	  Hospital.addMedicalInsurance(id,secureID)
    	  .then(function(result){
    	      alert("Seguro medico agregado");
    	      
    	      $scope.postAddInsurance(secureID);
    	  },function(error){
    	      window.alert(error);
    	  });
    };

    /*
     *
     **/
    $scope.loadMedicalInsurance = function(){
    	MedicalInsurance.notRelatedMedicalInsurance(id)
    	.then(function(result){
    	    $scope.medicalEnsurance = result;
    	},function(error){
    	    window.alert('Error ' + error);
    	});
    };

    /*
     * wrap method execute after remove relation between hospital and any asurance
     **/
    var postRemoveAsuranceRelation = function(medicalAsuranceID){
        
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
            postRemoveAsuranceRelation(medicalAsuranceID);
        },function(error){
            alert(error);
        });
    };
    
    /*
     *
     **/
    $scope.postAddDoctor = function(doctorID){
        
        /** Add the doctor added to current hospital doctor's object **/
         $scope.data.doctors.push.apply($scope.data.doctors,$scope.doctors.filter(function(item){
             return item.id == doctorID;
         }));
         
         /** Remove the added doctor object from list of avaliable doctors not related **/
         $scope.removeDoctor(doctorID);
    };
    
    /*
     *
     **/
     $scope.addDoctor = function(doctorID){
         Hospital.addDoctor(id,doctorID)
         .then(function(result){
             
             alert('Doctor agregado');
             
             $scope.postAddDoctor(doctorID);
         },function(error){
             alert(error);
         });
     };
     
     $scope.postRemoveDoctorRelation = function(doctorID){
         
        $scope.error.show = true;
        $scope.error.message = "Doctor desvinculado";
         
        $scope.data.doctors = $scope.data.doctors.filter(function(item){
            return item.id != doctorID;
        });
         
     };
     
     /*
      *
      **/
     $scope.removeRelationDoctor = function(doctorID){
        
        Hospital.removeDoctor(id,doctorID).then(function(result){
            $scope.postRemoveDoctorRelation(doctorID);
        },function(error){
            alert('Error ' + error);
        });
     };
     
     /*
      *
      **/
     $scope.loadDoctors = function(){
        Doctor.notRelatedDoctor(id).then(function(result){
            $scope.doctors = result;
        },function(error){
            alert("Error opteniendo los doctores");
        });
     };
     
}]);