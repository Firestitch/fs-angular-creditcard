(function () {
    'use strict';

    angular.module('fs-angular-creditcard',['fs-angular-address'])
    .directive('fsCreditcard', function($location) {
        return {
            templateUrl: 'views/directives/creditcard.html',
            restrict: 'E',
            scope: {
               selected: "@fsSelected"
            },
            controller: function($scope) {
            	$scope.addressOptions = { map: false };
            	$scope.address = {};
            },
            link: function($scope, element, attrs, ctrl) {

                $scope.redirect = function(path) {
                    $location.path(path);
                }
            }
        };
    });
})();