(function(angular) {
    'use strict';

    angular.module('pokecalc.services.pokeUtil', [])
        .factory('pokeUtilService', [function() {
            return {
                getDvObject: function(pokemonObject) {
                    return pokemonObject
                }
            };
        }]);
}(angular));
