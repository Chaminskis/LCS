/*
 *
 *
 **/

'use strict';

angular.module('app.controllers', ['app.services'])
.controller('HomeCtrl', ['$scope', 'MockHospitalService', '$q',  function($scope, service, $q){

    var initializeMap = function(){
        var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        $scope.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        $scope.markers = [];        
        $scope.directionsService = new google.maps.DirectionsService();
        $scope.directionsDisplay = new google.maps.DirectionsRenderer();
        $scope.distanceService = new google.maps.DistanceMatrixService();
        $scope.directionsDisplay.setMap($scope.map);
        setPopup();
    };

    var calculateCurrentPosition = function(){


        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

            // var infowindow = new google.maps.InfoWindow({
            //     map: $scope.map,
            //     position: pos,
            //     content: 'You are here.'
            // });
            $scope.currentPosition = pos;
            $scope.map.setCenter(pos);
            }, function() {
              console.log("Error!");
            });
        } else {
                // Browser doesn't support Geolocation
            console.log("Browser doesn't support Geolocation");
        }
        
    };

    var getDistance = function(marker){
        
        var def = $q.defer();
        var request = {
            origins: [ $scope.currentPosition ],
            destinations: [ marker.position],
            travelMode: google.maps.TravelMode.DRIVING,
            avoidHighways: false,
            avoidTolls: false
        };

        $scope.distanceService.getDistanceMatrix(request, function(response,status){
            if(status == google.maps.DistanceMatrixStatus.OK){
                var result = response.rows[0].elements;

                $scope.popup.distance = result[0].distance.text;
                $scope.popup.duration = result[0].duration.text;
                // console.log(result[0].distance.text + " " + result[0].duration.text);
                def.resolve(response);
            }else{
                console.log("Error calculating distance: " + status);
            }
        });

        return def.promise;
    }


    var drawRoute = function(marker){
        
        var def = $q.defer();
        $scope.directionsDisplay.setDirections({routes: []});
        var start = $scope.currentPosition;
        var end = marker.position;
        var request = {
              origin:start,
              destination:end,
              travelMode: google.maps.TravelMode.DRIVING
        };
        
        $scope.directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                $scope.directionsDisplay.setDirections(response);
                def.resolve(response);
            }
        });
 
        return def.promise;
    };

    var setPopup = function(){
        $scope.popup = new Object();
        $scope.popup.show = false;
    };

    var showPopup = function(marker){
        $scope.popup.show = true;
        $scope.popup.title = marker.title;
        $scope.popup.content = marker.description;
        console.log($scope.popup);
        $scope.$apply();
    };

    var createMarker = function (info){
        
        var infoWindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.latitude, info.longitude),
            title: info.name
        });

        marker.content = '<div class="infoWindowContent">' + info.details + '</div>';
        marker.description = info.details;
        google.maps.event.addListener(marker, 'click', function(){
            // infoWindow.setContent('<p>' + marker.title + '</p>' + marker.content);
            // infoWindow.open($scope.map, marker);
            $q.all([drawRoute(marker), getDistance(marker)]).then(function(a, b){
                showPopup(marker);
                $scope.markers.push(marker);
            }, function(error){
                console.log("You failed, bitch");
            }); 
            
        });
        
        
    }; 
    
    var findHospitals = function(){
        var hospitals = service.getHospitals()
                
        for (var i = 0; i < hospitals.length; i++){
            createMarker(hospitals[i]);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }        
    };


    
    var setup = function(){
        initializeMap();
        calculateCurrentPosition();
        findHospitals();
    };

    $scope.viewPopUp = function(){
        if($scope.popup.show)
            return "popup-show";
    }

    $scope.closePopUp = function(){
        $scope.popup.show = false;
    }

    $scope.findHospital = function(){
        
    }

    setup();

    return {
        setup: setup
    }
}]);