'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope) {


    $scope.address = {};
    $scope.card = {};
    $scope.options = { cvc: true, address: true, name: true };

    $scope.submit = function() {
        alert('submit');
    }
});
