'use strict';

angular.module('pokecalc.dex', ['ngRoute', 'pokecalc.routes'])
    .config(['$routeProvider', 'ROUTES', function($routeProvider, ROUTES) {
        $routeProvider.when(ROUTES.DEX, {
            templateUrl: 'dex/dex.html',
            controller: 'dexCtrl'
        });
    }])
    .controller('dexCtrl', ['$scope', '$q', 'dexService', 'pokeUtilService', 'GEN', 'GEN_LIST', 'STATS', 'STAT_LABELS',
        function($scope, $q, dexService, pokeUtilService, GEN, GEN_LIST, STATS, STAT_LABELS) {
            $scope.gens = GEN_LIST;
            var GEN_NUM;
            $scope.loaders = {
                page: true
            };

            $scope.filters = {};

            $scope.order = {}
            $scope.changeOrder = function(stat) {
                if ($scope.order.by === 'stats.' + stat) {
                    $scope.order.desc = !$scope.order.desc
                } else {
                    $scope.order.desc = true;
                }
                $scope.order.by = 'stats.' + stat;
            }

            $scope.getSmogonUrl = function(pokemon) {
                return dexService.getSmogonUrl(GEN_NUM, pokemon);
            }

            $scope.getSpriteClass = function(pokemon) {
                return 'sprite-xyicons-' + pokemon.name.toLowerCase().replace(/\s/g, '_').replace(/\./g, '');
            }

            var isPokemonEvolved = function(pokemon) {
                return Boolean(pokemon && pokemon.evos && !pokemon.evos.length);
            };

            var pokemonHasFormats = function(pokemon, formatsMap) {
                var foundCount = 0;
                if (pokemon.stats.formats) {
                    for (var i = 0; i < pokemon.stats.formats.length; i++) {
                        if (formatsMap[pokemon.stats.formats[i]]) {
                            foundCount++;
                        }
                    }
                }

                return foundCount;
            }

            $scope.selected = {
                formats: {
                    "Uber": false,
                    "OU": true,
                    "UU": true,
                    "RU": true,
                    "NU": true,
                    "PU": true,
                    "LC": false
                },
                allowPreEvo: false,
                allowAlt: false
            };

            $scope.filterDex = function(override) {
              var allow = true;
              if(!override) {
                $scope.filteredDex = [];
                $scope.dex.forEach(function(poke) {
                    allow = Boolean(pokemonHasFormats(poke, $scope.selected.formats));

                    if(!$scope.selected.allowPreEvo) {
                      allow = (allow && (isPokemonEvolved(poke)));
                    }

                    if(!$scope.selected.allowAlt) {
                      allow = (allow && !poke.isAlt);
                    }

                    if(allow) {
                      $scope.filteredDex.push(poke);
                    }
                });
              }
            };

            $scope.getDex = function(gen) {
              $scope.selected.gen = gen;
              GEN_NUM = gen.id;
              dexService.getPokedex(GEN_NUM).then(function(response) {
                  $scope.dex = [];
                  $scope.loaders.page = false;
                  response.data.forEach(function(poke) {
                      pokeUtilService.separateAltForms(poke, function(altForm, isAlt) {
                          altForm.isAlt = isAlt;
                          $scope.dex.push(altForm)
                      });
                  });
                  $scope.filterDex();
              });
            }

            var initialize = function() {
                $scope.formats = ["Uber", "OU", "UU", "RU", "NU", "PU", "LC"];
                $scope.getDex($scope.gens[$scope.gens.length - 1]);
                $scope.stats = STATS;
                $scope.statLabels = STAT_LABELS[GEN_NUM];
            }

            initialize();
        }
    ]);
