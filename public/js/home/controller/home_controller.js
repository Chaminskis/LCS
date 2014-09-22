/*
 *
 *
 **/

'use strict';

angular.module('app.controllers', ['app.services'])
.controller('HomeCtrl', ['$scope', 'MockHospitalService',  function($scope, service){
    // $scope.message = 'nice from controller';

    // $scope.sectionActive = 'home';
    
    // $scope.setActive = function(section){
    //     $scope.sectionActive = section;
    // };
    
    // $scope.active = function(section){
        
    //     return section == $scope.sectionActive;
    // };


    var setup = function(){
        // alert("loaded");
        // console.log(service);
        var hospitals = service.getHospitals()
        // .then(function(data){
                // alert("I'm loaded!");
                $scope.data = hospitals;
                console.log($scope.data);
            // }
        // });         
    
        var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        $scope.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

        $scope.markers = [];
        
        
        // map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
        

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



        var infoWindow = new google.maps.InfoWindow();
        
        var createMarker = function (info){
            
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.name
        });
        marker.content = '<div class="infoWindowContent">' + info.details + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
            
        }  
        
        for (var i = 0; i < hospitals.length; i++){
            createMarker(hospitals[i]);
        }

        console.log($scope.markers);
        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }
    }

    setup();

    return {
        setup: setup
    }
}]);