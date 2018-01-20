(function(angular) {
    'use strict';

    angular.module('pokecalc.services.pokeUtil', [])
        .factory('pokeUtilService', [function() {
            var normalizeDV = function(value) {
                return isNaN(value) ? 0 : (Math.min(15, Math.max(0, value)));
            }

            return {
                getDV: function(statName, stat, level, pokemonObject) {
                    var base = pokemonObject.stats,
                        adjust = (statName === 'hp') ? (level - 10) : 5,
                        dv = (100 * (stat - adjust) - (2 * base[statName] * level)) / (2 * level);

                    return normalizeDV(dv);
                }
            };
        }]);
}(angular));
