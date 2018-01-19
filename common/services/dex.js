(function(angular) {
    'use strict';

    angular.module('pokecalc.service.dex', [])
        .factory('dexService', ['$http', function($http) {
            var genMap = {
                2: 'common/data/dex.json'
            }

            return {
                getPokedex: function(generationNumber) {
                    var src = genMap[generationNumber];
                    return $http.get(src ? src : '');
                }
            };
        }]);
}(angular));
