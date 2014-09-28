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
        setSearchResultsBar();
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
        
        var bounds = new google.maps.LatLngBounds($scope.currentPosition, marker.position);
        $scope.map.fitBounds(bounds);
 
        return def.promise;
    };

    var setPopup = function(){
        $scope.popup = new Object();
        $scope.popup.show = false;
    };

    var showPopup = function(marker){
        
        if(!$scope.searchModeOn){
            $scope.popup.show = true;
            $scope.popup.title = marker.title;
            $scope.popup.content = marker.description;
        }
    };

    var createMarker = function(info, addMarkerlistener){
        
        var infoWindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.latitude, info.longitude),
            title: info.name
        });

        $scope.markers.push(marker);
        marker.content = '<div class="infoWindowContent">' + info.details + '</div>';
        marker.description = info.details;
        addMarkerlistener(marker);
    }; 

    var showPopupRouteAndDistanceOnClick = function(marker){
        google.maps.event.addListener(marker, 'click', function(){        
            $q.all([drawRoute(marker), getDistance(marker)]).then(function(a, b){
                showPopup(marker);
            }, function(error){
                console.log("You failed, bitch");
            }); 
        });
    }

    var showRouteAndDistance = function(marker){
             drawRoute(marker); 
             getDistance(marker);
    }
    

    var findHospitals = function(){
        $scope.markers = [];
        var hospitals = service.getHospitals()
            
        for (var i = 0; i < hospitals.length; i++){
            createMarker(hospitals[i], showPopupRouteAndDistanceOnClick);
        }
    };

    $scope.showMarkerRoute = function(e, selectedMarker){
        e.preventDefault();
        showRouteAndDistance(selectedMarker);
    }        

    
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

    var enableSearchMode = function(){
        $scope.searhModeOn = true;
        $scope.bar.show = true;
        $scope.map.partialWidth = true;
        $scope.popup.show = false;
    }
    
    $scope.search = function(){
        removeAllMarkers();
        var hospitals = service.findHospitalsByName($scope.txtHospital);
        $scope.markers = [];
        for(var i = 0; i < hospitals.length; i++){
            createMarker(hospitals[i], showPopupRouteAndDistanceOnClick);
        }

        enableSearchMode();       
    }

    $scope.quickSearch = function(){
        console.log("quick search!");
    }
    
    var setSearchResultsBar = function(){
        $scope.bar = new Object();
        $scope.bar.show = false;   
        $scope.searchModeOn = false;
    }


    $scope.setMapWidth = function(){
        if($scope.map.partialWidth)
            return "map-partial-width";
    }

    $scope.showResultsBar = function(){
        if($scope.bar.show)
            return "show-search-results-panel";
    }

    $scope.disableSearchMode = function(){
        $scope.bar.show = false;
        $scope.map.partialWidth = false;
        $scope.searchModeOn = false;
    }

    
    var removeAllMarkers = function(){
        for(var i = 0; i < $scope.markers.length; i++){
            $scope.markers[i].setMap(null);
        }
    }
    setup();

    return {
        setup: setup
    }
}]);