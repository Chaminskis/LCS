angular.module('app.directives').directive('iCheck', ['$timeout',  function($timeout, $parse) {
 return {
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                });
                clickMethod = $attrs['ngClick'];
                clickMethod = clickMethod.replace(/(\(|\))/g, "");

                return $(element).iCheck({
                    // the classes, if you need them.
                    checkboxClass: 'icheckbox_square',
                    radioClass: 'iradio_square',
                    increaseArea: '20%' // optional
                }).on('ifChanged', function(event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function() {
                            return ngModel.$setViewValue(value);
                        });
                    }
                }).on('ifClicked', function(){
                    if(clickMethod)
                    $scope[clickMethod]();
                });
            });
        }
    };
}]);