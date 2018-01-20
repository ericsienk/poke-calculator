(function(angular) {
    'use strict';

    angular.module('pokecalc.services.dex', [])
        .factory('dexService', ['$http', function($http) {
            var baseSpriteRoute = 'https://www.smogon.com/dex/media/sprites',
                baseDetailRoute = 'http://www.smogon.com/dex',
                baseHostRoute = window.location.contains('github') ? 'poke-calculator' : '';
                genMap = {
                    2: {
                        dex: baseHostRoute + '/common/data/dex.json',
                        spriteRoute: function(pokemonObject) {
                            return baseSpriteRoute + '/c/' + pokemonObject.name.toLowerCase() + '.gif'
                        },
                        detailRoute: function(pokemonObject) {
                            return baseDetailRoute + '/gs/pokemon/' + pokemonObject.name.toLowerCase();
                        }
                    }
                };

            return {
                getPokedex: function(generationNumber) {
                    var src = genMap[generationNumber];
                    return $http.get(src ? src.dex : '');
                },
                getSpriteUrl: function(generationNumber, pokemonObject) {
                    var src = genMap[generationNumber];
                    return src ? src.spriteRoute(pokemonObject) : '';
                },
                getDetailUrl: function(generationNumber, pokemonObject) {
                    var src = genMap[generationNumber];
                    return src ? src.detailRoute(pokemonObject) : '';
                }
            };
        }]);
}(angular));