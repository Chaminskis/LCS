/*
 *
 *
 **/

'use strict';

angular.module('app.controllers', ['app.services'])
.controller('HomeCtrl', ['$scope', 'MockHospitalService',  function($scope, service){


    var initializeMap = function(){
        var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        $scope.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    };

    var calculateCurrentPosition = function(){
        //end initialize map

        $scope.markers = [];        
        // map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);

        // calculate current position
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

            var infowindow = new google.maps.InfoWindow({
                map: $scope.map,
                position: pos,
                content: 'You are here.'
            });

            $scope.map.setCenter(pos);
            }, function() {
              console.log("Error!")
            });
        } else {
                // Browser doesn't support Geolocation
            console.log("Browser doesn't support Geolocation");
        }
        // end calculate current position
        
    }

    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.latitude, info.longitude),
            title: info.name
        });
        marker.content = '<div class="infoWindowContent">' + info.details + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
    var findHospitals = function(){
        var hospitals = service.getHospitals()
        var infoWindow = new google.maps.InfoWindow();
        
        
        for (var i = 0; i < hospitals.length; i++){
            createMarker(hospitals[i]);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }        
    }

    // var 
    
    var setup = function(){
        initializeMap();
        calculateCurrentPosition();
        findHospitals();
    }



    setup();

    return {
        setup: setup
    }
}]);