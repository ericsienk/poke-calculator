'use strict';

angular.module('pokecalc.dv', ['ngRoute'])
    .config(['$routeProvider', 'ROUTES', function($routeProvider, ROUTES) {
        $routeProvider.when(ROUTES.DV, {
            templateUrl: 'dv/dv.html',
            controller: 'dvCtrl'
        });

    }])
    .controller('dvCtrl', ['$scope', 'dexService'function($scope, dexService) {
        dexService.getPokedex(2).then(function(response) {
            console.log(response.data);
        })
    }]);
