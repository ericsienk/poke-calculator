(function(angular) {
    'use strict';

    angular.module('pokecalc.services.dex', [])
        .factory('dexService', ['$http', 'EM_DASH', function($http, EM_DASH) {
            var baseSpriteUrl = 'https://www.smogon.com/dex/media/sprites',
                defaultSpriteUrl = 'https://www.serebii.net/itemdex/sprites/pokeball.png',
                baseSmogonUrl = 'https://www.smogon.com/dex',
                baseHostUrl = window.location.host.indexOf('github') > -1 ? '/poke-calculator' : '',
                baseBulbaUrl = 'https://bulbapedia.bulbagarden.net/wiki',
                genMap = {
                    2: {
                        dex: baseHostUrl + '/common/data/gs-dex.json',
                        sprite: 'c',
                        smogon: 'gs'
                    },
                    7: {
                        dex: baseHostUrl + '/common/data/sm-dex.json',
                        sprite: 'xy',
                        smogon: 'sm'
                    }
                };

            var buildSmogonUrl = function(dir, pokemonObject) {
                    return baseSmogonUrl + '/' + dir + '/pokemon/' + pokemonObject.name.toLowerCase();
                },
                buildSpriteUrl = function(dir, pokemonObject) {
                    return baseSpriteUrl + '/' + dir + '/' + pokemonObject.name.toLowerCase() + '.gif';
                },
                buildBulbapediaUrl = function(pokemonObject) {
                    //strip possible alola / mega post fix in name
                    var index = pokemonObject.name.indexOf(EM_DASH),
                        name = index > -1 ? pokemonObject.name.substring(0, index) : pokemonObject.name;
                    return baseBulbaUrl + '/' + name + '_(Pokemon)';
                };

            return {
                getPokedex: function(generationNumber) {
                    var src = genMap[generationNumber];
                    return $http.get(src ? src.dex : '');
                },
                getSpriteUrl: function(generationNumber, pokemonObject) {
                    var src = genMap[generationNumber];
                    return src ? buildSpriteUrl(src.sprite, pokemonObject) : defaultSpriteUrl;
                },
                getSmogonUrl: function(generationNumber, pokemonObject) {
                    var src = genMap[generationNumber];
                    return src ? buildSmogonUrl(src.smogon, pokemonObject) : '';
                },
                getBulbapediaUrl: function(pokemonObject) {
                    return buildBulbapediaUrl(pokemonObject);
                },
            };
        }]);
}(angular));
