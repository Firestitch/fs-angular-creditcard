(function () {
    'use strict';


	/*
	American Express	34, 37
	China UnionPay	62, 88
	Diners ClubCarte Blanche	300-305
	Diners Club International	300-305, 309, 36, 38-39
	Diners Club US & Canada	54, 55
	Discover Card	6011, 622126-622925, 644-649, 65
	JCB	3528-3589
	Laser	6304, 6706, 6771, 6709
	Maestro	5018, 5020, 5038, 5612, 5893, 6304, 6759, 6761, 6762, 6763, 0604, 6390
	Dankort	5019
	MasterCard	50-55
	Visa	4
	Visa Electron	4026, 417500, 4405, 4508, 4844, 4913, 4917
	*/
    angular.module('fs-angular-creditcard',['fs-angular-address','fs-angular-util'])
    .directive('fsCreditcard', function($location) {
        return {
            templateUrl: 'views/directives/creditcard.html',
            restrict: 'E',
            scope: {
            	options: "=?fsOptions",
               	address: "=?fsAddress",
               	card: "=?fsCard"
            },
            controller: function($scope,fsUtil) {

            	$scope.address = $scope.address || {};
            	$scope.card = $scope.card || {};
            	$scope.options = $scope.options || {};

            	if($scope.options.address!==false) {
	            	$scope.options.address = angular.merge({address: { required: true },
				            								city: { required: true },
				            								region: { required: true },
				            								zip: { required: true },
				            								country: { required: true },
				            								map: false,
				            							},$scope.options.address);
	            }

		    	var year = (new Date()).getFullYear();
		    	$scope.years = [];
		    	for(var i=0; i<10; i++) {
		    		$scope.years.push({ name: year + i, value: year + i });
		    	}

		    	var cards = { 	visa: [4],
		    					amex: [34,37],
		    					mastercard: [50,51,52,53,54,55] };
		    	$scope.$watch('card.number',function(number) {
		    		$scope.card.type = undefined;
		    		var number = fsUtil.string(number);
		    		angular.forEach(cards,function(values,type) {
		    			angular.forEach(values,function(value) {

		    				if(number.match(new RegExp('^' + value))) {
		    					$scope.card.type = type;
		    				}
		    			});
		    		});

		    	});
            }
        };
    });
})();