angular.module('app.directives').directive('simple', [function($timeout, $parse) {
    return {
        link: function($scope, element, $attrs) {
            console.log("la gente!");
        
        },
        template: '<h1>Test!</h1>'
    };
}]);