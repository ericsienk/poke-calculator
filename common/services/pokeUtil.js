(function(angular) {
    'use strict';

    angular.module('pokecalc.services.pokeUtil', [])
        .factory('pokeUtilService', ['EM_DASH', function(EM_DASH) {
            var normalizeDV = function(value) {
                return isNaN(value) ? 0 : (Math.min(15, Math.max(0, value)));
            }

            return {
                getDV: function(statName, stat, level, pokemonObject) {
                    var base = pokemonObject.stats,
                        adjust = (statName === 'hp') ? (level - 10) : 5,
                        dv = (100 * (stat - adjust) - (2 * base[statName] * level)) / (2 * level);

                    return normalizeDV(dv);
                },
                getIV: function(statName, stat, level, ev, nature, pokemonObject) {
                  //TODO implement equation
                  return 31;
                },
                separateAltForms: function(pokemonObject, onNewPokemonObject) {
                  var suffix;
                  for(var i = 0; i < pokemonObject.alts.length; i++) {
                    suffix = pokemonObject.alts[i].suffix;
                    onNewPokemonObject({
                      name: pokemonObject.name + (suffix ? EM_DASH + suffix : ''),
                      stats: pokemonObject.alts[i],
                      evos: pokemonObject.evos
                    }, Boolean(i));
                  }
                }
            };
        }]);
}(angular));
