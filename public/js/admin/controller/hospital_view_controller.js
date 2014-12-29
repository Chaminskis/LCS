/*
 *
 *
 **/

 'use strict';

angular.module('app.controllers')

.controller('HospitalViewCtrl', ['$scope','$routeParams','HospitalService','MedicalInsuranceService','DoctorService', function($scope,$routeParams,Hospital,MedicalInsurance,Doctor){
    
    $scope.id = $routeParams.id;
    var id = $scope.id;
    
    $scope.show_map = false;

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
     *
     **/
    $scope.load = function(){
        Hospital.get(id)
        .then(function(result){
            console.log("Result view hospital",result);
            $scope.data = result;
            
            if($scope.map === undefined){
                $scope.initMap(result.name,{latitude:result.latitude,longitude:result.longitude});
            }
            
        },function(error){
            window.alert('Error ' + error);
        });
    };
    
    /*
     *
     * init map and market
     *
     **/
    $scope.initMap = function(hospitalName,location){
 
        var latLng = new google.maps.LatLng(location.latitude,location.longitude);
        
        var toggleBounce = function(){
          if (marker.getAnimation() != null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        };
        
        var mapOptions = {
            zoom: 14,
            center: latLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: window.shift_worker_style
        };
        
        $scope.map = new google.maps.Map(document.getElementById('update_map'), mapOptions);
        
        var marker = new google.maps.Marker({
            position: latLng,
            map: $scope.map,
            title: hospitalName,
            draggable:true,
            animation: google.maps.Animation.DROP,
        });
        
        google.maps.event.addListener(marker, 'click', toggleBounce);
        
        google.maps.event.addListener(marker,'dragend',function(event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            
            console.log("Resultado luego del evento ",lat,lng);
            
            $scope.$apply(function(){
                $scope.data.latitude = lat.toFixed(6);
                $scope.data.longitude = lng.toFixed(6);    
                
                $scope.updateLocationOption = true;
            });
        });

    };
    
    /*
     * Upda location hospital
     * Http request
     *
     **/
    $scope.updateLocation = function(){
        var location = {
            latitude:$scope.data.latitude,
            longitude:$scope.data.longitude
        };
        
        Hospital.updateLocation(id,location).then(function(){
            $scope.updateLocationOption = false;
        },function(error){
            alert("Error actualizando la locacion");
            console.log("Error ctualizando locacion",error);
        });
    };
    
    /*
     *
     * Show map, and trigger resize event
     *
     **/
    $scope.showMap = function(){
        $scope.show_map = $scope.show_map? false : true;
        
        if($scope.show_map === true){
            google.maps.event.trigger($scope.map, 'resize');
        }
    };
    

    /*
     *
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
    
    /*
     *
     * Remove Insurance from current list insurance list to add 
     *
     **/
    $scope.removeAsurance = function(secureID){
        $scope.medicalEnsurance = $scope.medicalEnsurance.filter(function(item){
            return secureID != item.id;
        });
    };
    
    /*
     *
     * Remove doctor from current list doctor list to add 
     *
     **/
    $scope.removeDoctor = function(doctorID){
        $scope.doctors = $scope.doctors.filter(function(item){
            return doctorID != item.id;
        });
    };
    
    /*
     *
     * after relate medical insuderance with hospital
     *
     **/
    $scope.postAddInsurance = function(medicalInsuranceID){
        
        if($scope.data.secures === undefined){
            $scope.data.secures = [];
        }
        
        $scope.data.secures.push.apply($scope.data.secures,$scope.medicalEnsurance.filter(function(item){
            return medicalInsuranceID == item.id;
        }));
        
    	$scope.removeAsurance(medicalInsuranceID);
    };
    
    /*
     *
     * Relate medical insurance with hospital
     * Http request
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
     * Load medical insurance from service
     * Http request to service
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
     * after relate doctor with hospital, remove it from list of doctors 
     * and add it to hospital doctos list
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
     * Relate a doctor to hospital
     * Http request to service
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
     
     /*
      * After remove a doctor relation
      *
      **/
     $scope.postRemoveDoctorRelation = function(doctorID){
         
        $scope.error.show = true;
        $scope.error.message = "Doctor desvinculado";
         
        $scope.data.doctors = $scope.data.doctors.filter(function(item){
            return item.id != doctorID;
        });
         
     };
     
     /*
      *
      * Remove doctor from hospital
      * Http request to service
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
      * Load all doctors to show on view
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