(function(angular) {
    'use strict';
    angular.module('pokecalc.constants', [
    ]).constant('STATS', [
      'hp', 'atk', 'def', 'spa', 'spd', 'spe'
    ]).constant('STAT_LABELS', {
        2: ['HP', 'ATTACK', 'DEFENSE', 'SPCL.ATK', 'SPCL.DEF', 'SPEED'],
        7: ['HP', 'Attack', 'Defense', 'Speed', 'Sp. Def', 'Sp. Atk']
    }).constant('GEN', {
        GSC: 2,
        SM: 7
    }).constant('EM_DASH', '-').constant('GEN_LIST', [
        {name: 'Gold & Silver', id: 2},
        {name: 'Sun & Moon', id: 7}
    ])
}(angular));
