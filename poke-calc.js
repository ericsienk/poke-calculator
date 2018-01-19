'use strict';
(function(angular) {
    angular.module('pokecalc', [
        'ngRoute',
        'ngSanitize',
        'pokecalc.services.dex',
        'pokecalc.dv'
    ]).config(['$routeProvider', 'ROUTES',
        function($routeProvider, ROUTES) {
            $routeProvider.otherwise({
                redirectTo: ROUTES.DV
            });
        }
    ]).controller('PokeCalcCtrl', ['$scope', function($scope) {
            console.log('root');
        }
    ]);
}(window.angular));
