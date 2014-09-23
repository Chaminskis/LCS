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
        $scope.markers = [];        
        $scope.directionsService = new google.maps.DirectionsService();
        $scope.directionsDisplay = new google.maps.DirectionsRenderer();
        $scope.directionsDisplay.setMap($scope.map);
    };

    var calculateCurrentPosition = function(){
        //end initialize map


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
              console.log("Error!")
            });
        } else {
                // Browser doesn't support Geolocation
            console.log("Browser doesn't support Geolocation");
        }
        
    };
    var getRoute = function(marker){
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
            }
        });
    };

    var createMarker = function (info){
        
        var infoWindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.latitude, info.longitude),
            title: info.name
        });
        marker.content = '<div class="infoWindowContent">' + info.details + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<p>' + marker.title + '</p>' + marker.content);
            getRoute(marker);
            // infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
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

    var setPopup = function(){
        $scope.popup.show = false;
    };

    var showPopup = function(marker){
        $scope.popup.show = true;
        $scope.popup.title = marker.title;
        $scope.popup.content = marker.content;
    };
    
    var setup = function(){
        initializeMap();
        calculateCurrentPosition();
        findHospitals();
    };



    setup();

    return {
        setup: setup
    }
}]);