
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

angular.module('fs-angular-creditcard').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/creditcard.html',
    "<div class=\"cc\"><md-input-container class=\"md-block cc-name\" ng-if=\"options.name\"><label>Cardholder's Name</label><input type=\"text\" ng-model=\"card.name\" name=\"name\" required></md-input-container><div layout=\"row\"><md-input-container class=\"md-block cc-number\" flex><label>Credit Card Number</label><div class=\"icon {{card.type}}\" ng-show=\"card.type\"></div><div class=\"icon unknown\" ng-show=\"!card.type\"></div><input type=\"text\" ng-model=\"card.number\" name=\"number\" required></md-input-container></div><div layout=\"row\"><md-input-container class=\"md-block\" flex><label>Expiry Month</label><md-select ng-model=\"card.expiry_month\" name=\"expiry_month\"><md-option value=\"1\">01</md-option><md-option value=\"2\">02</md-option><md-option value=\"3\">03</md-option><md-option value=\"4\">04</md-option><md-option value=\"5\">05</md-option><md-option value=\"6\">06</md-option><md-option value=\"7\">07</md-option><md-option value=\"8\">08</md-option><md-option value=\"9\">09</md-option><md-option value=\"10\">10</md-option><md-option value=\"11\">11</md-option><md-option value=\"12\">12</md-option></md-select></md-input-container><md-input-container class=\"md-block\" flex><label>Expiry Year</label><md-select ng-model=\"card.expiry_year\" name=\"expiry_year\"><md-option value=\"{{year.value}}\" ng-repeat=\"year in years\">{{year.name}}</md-option></md-select></md-input-container><md-input-container class=\"md-block cc-cvc\" ng-if=\"options.cvc\"><label>CVC</label><input type=\"text\" ng-model=\"card.cvc\" name=\"cvc\" required></md-input-container></div></div><fs-address fs-options=\"options.address\" fs-address=\"address\" ng-if=\"options.address\"></fs-address>"
  );

}]);
