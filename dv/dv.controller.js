'use strict';

angular.module('pokecalc.dv', ['ngRoute', 'pokecalc.routes'])
    .config(['$routeProvider', 'ROUTES', function($routeProvider, ROUTES) {
        $routeProvider.when(ROUTES.DV, {
            templateUrl: 'dv/dv.html',
            controller: 'dvCtrl'
        });

    }])
    .controller('dvCtrl', ['$scope', '$q', 'dexService', 'pokeUtilService',
        function($scope, $q, dexService, pokeUtilService) {
            var GEN = 2;

            $scope.loaders = {
                page: true
            };

            $scope.stats = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
            $scope.statLabels = ['HP', 'ATTACK', 'DEFENSE', 'SPCL.ATK', 'SPCL.DEF', 'SPEED'];


            dexService.getPokedex(GEN).then(function(response) {
                $scope.dex = response.data;
                $scope.loaders.page = false;
            });

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
            }

            $scope.calculate = function() {
                $scope.stats.forEach(function(stat) {
                    $scope.calculateStat(stat);
                });
            }

            $scope.calculateStat = function(statName) {
                var stat = $scope.calc.input[statName],
                    level = $scope.calc.input.level;
                $scope.calc.output[statName] = pokeUtilService.getDV(statName, stat, level, $scope.pokemon);
            }

            $scope.onSearch = function(searchTerm) {
                var deferred = $q.defer();
                deferred.resolve({
                    data: $scope.dex
                });

                return deferred.promise;
            }

            $scope.onSelect = function(pokemon) {
                clearCalculator();
                $scope.pokemon = angular.copy(pokemon);
                $scope.pokemon.spriteUrl = dexService.getSpriteUrl(GEN, pokemon);
                $scope.pokemon.detailUrl = dexService.getDetailUrl(GEN, pokemon);
                return pokemon.name;
            }

            $scope.onEmpty = function() {
                clearCalculator();
                $scope.pokemon = {
                    spriteUrl: 'https://www.serebii.net/itemdex/sprites/pokeball.png'
                };
            }

            $scope.onEmpty();
        }
    ]);
