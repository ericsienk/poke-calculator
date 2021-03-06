'use strict';

angular.module('pokecalc.dv', ['ngRoute', 'pokecalc.routes'])
    .config(['$routeProvider', 'ROUTES', function($routeProvider, ROUTES) {
        $routeProvider.when(ROUTES.DV, {
            templateUrl: 'dv/dv.html',
            controller: 'dvCtrl'
        });
    }])
    .controller('dvCtrl', ['$scope', '$q', 'dexService', 'pokeUtilService', 'GEN', 'STATS', 'STAT_LABELS',
        function($scope, $q, dexService, pokeUtilService, GEN, STATS, STAT_LABELS) {
            var GEN_NUM = GEN.GSC;
            $scope.loaders = {
                page: true
            };

            var clearCalculator = function() {
                $scope.calc = {
                    input: {
                        level: 5
                    },
                    output: {}
                }

                $scope.stats.forEach(function(stat) {
                    $scope.calc.input[stat] = 0;
                    $scope.calc.output[stat] = 0;
                });
            };

            $scope.calculate = function() {
                $scope.stats.forEach(function(stat) {
                    $scope.calculateStat(stat);
                });
            };

            $scope.calculateStat = function(statName) {
                var stat = $scope.calc.input[statName],
                    level = $scope.calc.input.level;
                $scope.calc.output[statName] = pokeUtilService.getDV(statName, stat, level, $scope.pokemon);
            };

            $scope.onSearch = function(searchTerm) {
                var deferred = $q.defer();
                deferred.resolve({
                    data: $scope.dex
                });

                return deferred.promise;
            };

            $scope.onSelect = function(pokemon) {
                clearCalculator();
                $scope.pokemon = angular.copy(pokemon);
                $scope.pokemon.spriteUrl = dexService.getSpriteUrl(GEN_NUM, pokemon);
                $scope.pokemon.smogonUrl = dexService.getSmogonUrl(GEN_NUM, pokemon);
                return pokemon.name;
            };

            $scope.onEmpty = function() {
                clearCalculator();
                $scope.pokemon = {
                    spriteUrl: dexService.getSpriteUrl()
                };
            };

            var initialize = function() {
              $scope.stats = STATS;
              $scope.statLabels = STAT_LABELS[GEN_NUM];
              $scope.onEmpty();

              dexService.getPokedex(GEN_NUM).then(function(response) {
                  $scope.dex = response.data;
                  $scope.loaders.page = false;
                  //TODO make custom search filter
                  $scope.dex.forEach(function(poke) {
                    delete poke.evos;
                  });
              });
            }

            initialize();
        }
    ]);
