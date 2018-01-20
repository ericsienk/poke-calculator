(function(angular) {
    'use strict';
    angular.module('pokecalc.directives.enterAsTab', []).directive('enterAsTab', function() {
        return {
            link: function(scope, element, attrs) {
                element.on("keypress", function(event) {
                    if (event.which === 13) {
                        event.preventDefault();
                        angular.element(attrs.next).focus();
                    }
                });
            }
        };
    });
}(angular));
