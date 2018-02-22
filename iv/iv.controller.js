'use strict';

angular.module('pokecalc.iv', ['ngRoute', 'pokecalc.routes'])
    .config(['$routeProvider', 'ROUTES', function($routeProvider, ROUTES) {
        $routeProvider.when(ROUTES.IV, {
            templateUrl: 'iv/iv.html',
            controller: 'ivCtrl'
        });
    }])
    .controller('ivCtrl', ['$scope', '$q', 'dexService', 'pokeUtilService', 'GEN', 'STATS', 'STAT_LABELS',
        function($scope, $q, dexService, pokeUtilService, GEN, STATS, STAT_LABELS) {
            var GEN_NUM = GEN.SM;
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
                $scope.calc.output[statName] = pokeUtilService.getIV();//TODO
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
                  $scope.dex = [];
                  $scope.loaders.page = false;
                  response.data.forEach(function(poke) {
                    pokeUtilService.separateAltForms(poke, function(altForm) {
                      $scope.dex.push(altForm)
                    });
                  });
              });
            }

            initialize();
        }
    ]);
