'use strict';

angular.module('pokecalc.dv', ['ngRoute', 'pokecalc.routes'])
    .config(['$routeProvider', 'ROUTES', function($routeProvider, ROUTES) {
        $routeProvider.when(ROUTES.DV, {
            templateUrl: 'dv/dv.html',
            controller: 'dvCtrl'
        });

    }])
    .controller('dvCtrl', ['$scope', '$q', 'dexService', function($scope, $q, dexService) {
        $scope.loaders = {
            page: true
        };

        dexService.getPokedex(2).then(function(response) {
            $scope.pokemon = response.data;
            $scope.loaders.page = false;
        });

        $scope.onSearch = function(searchTerm) {
            var deferred = $q.defer();
            deferred.resolve({
                data: $scope.pokemon
            });

            return deferred.promise;
        }

        $scope.onSelect = function(pokemon) {
            $scope.selectedPokemon = pokemon;
            return pokemon.name;
        }
    }]);
