'use strict';
(function(angular) {
    angular.module('pokecalc', [
        'ngRoute',
        'ngSanitize',
        'pokecalc.routes',
        'pokecalc.constants',
        'pokecalc.directives.autosuggest',
        'pokecalc.directives.enterAsTab',
        'pokecalc.services.dex',
        'pokecalc.services.pokeUtil',
        'pokecalc.dv',
        'pokecalc.iv',
        'pokecalc.dex'
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
