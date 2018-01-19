(function(angular) {
    'use strict';
    angular.module('pokecalc.directives.autosuggest', [])
        .directive('autosuggest', ['$window', '$document', '$filter', '$timeout',
            function($window, $document, $filter, $timeout) {
                return ({
                    restrict: 'AE',
                    scope: {
                        onSearch: '&', //function(searchTerm) : required - return search promise
                        onSelect: '&', //function(selectedObject) : optional - contains selected list item
                        width: '@', //string : optional - input width style
                        triggerLength: '@', //string : optional - default 2 char before search
                        name: '@', //string : optional - input name
                        searchTerm: '=?', //bound string : optional - input text
                        required: '=?', //bound boolean : optional - ng-required
                        placeholder: '@' //string : optional - placeholder input text
                    },
                    transclude: true,
                    replace: false,
                    templateUrl: 'common/directives/autosuggest/autosuggest.html',
                    link: function($scope, $element, $attrs) {
                        var SELECTED_INDEX = -1,
                            TRIGGER_LENGTH = (!isNaN($scope.triggerLength) ? parseInt($scope.triggerLength) : 2);
                        $scope.LOADING = false;


                        var validTriggerLength = function() {
                            return !TRIGGER_LENGTH || (angular.isDefined($scope.searchTerm) && $scope.searchTerm.length >= TRIGGER_LENGTH);
                        };

                        $scope.select = function(item) {
                            if ($scope.onSelect instanceof Function) {
                                $scope.searchTerm = $scope.onSelect({
                                    item: item
                                });
                            }
                            $scope.blur();
                        };

                        $scope.search = function(hideShow) {
                            SELECTED_INDEX = -1;
                            if (validTriggerLength()) {
                                $scope.SHOW = true;
                                $scope.LOADING = true;
                                $scope.onSearch({
                                    searchTerm: $scope.searchTerm
                                }).then(function(response) {
                                    $scope.LOADING = false;
                                    $scope.list = response.data;
                                    $scope.filteredList = $filter('filter')($scope.list, $scope.searchTerm);
                                });
                            } else {
                                $scope.SHOW = false;
                                $scope.list = [];
                                $scope.filteredList = $filter('filter')($scope.list, $scope.searchTerm);
                            }
                        };

                        $scope.focus = function() {
                            $timeout(calcMaxHeight);
                            $scope.SHOW = $scope.searchTerm && ($scope.triggerLength <= $scope.searchTerm.length);
                        };

                        $scope.blur = function() {
                            $scope.SHOW = false;
                            SELECTED_INDEX = -1;
                        };

                        var calcMaxHeight = function() {
                            var list = $element.find('.autosuggestWrapper'),
                                topOffset = (list.offset().top - ($window.scrollY || $window.pageYOffset));
                            list.css({
                                maxHeight: ($window.innerHeight - topOffset) - 9
                            });
                        };

                        var keypress = {
                            //UP
                            38: function(cbFnc) {
                                if (SELECTED_INDEX > 0) {
                                    SELECTED_INDEX--;
                                    cbFnc(SELECTED_INDEX + 1, SELECTED_INDEX);
                                }
                            },
                            //DOWN
                            40: function(cbFnc) {
                                if (SELECTED_INDEX < $scope.filteredList.length - 1) {
                                    SELECTED_INDEX++;
                                    cbFnc(SELECTED_INDEX - 1, SELECTED_INDEX);
                                }
                            },
                            //ENTER
                            13: function() {
                                if (SELECTED_INDEX > -1) {
                                    $timeout(function() {
                                        $scope.select($scope.filteredList[SELECTED_INDEX]);
                                    });
                                }
                            }
                        };

                        angular.element($window).on('load resize scroll', calcMaxHeight);
                        $element.on('keydown', function(e) {
                            if ($scope.SHOW && keypress[e.keyCode]) {
                                keypress[e.keyCode](function(beforeIndex, afterIndex) {
                                    $element.find('li:eq(' + beforeIndex + ')').removeClass('item-selected');

                                    var item = $element.find('li:eq(' + afterIndex + ')'),
                                        wrapper = $element.find('.autosuggestWrapper'),
                                        itemBottom = item.position().top + item.outerHeight(true);

                                    if (wrapper.scrollTop() >= item.position().top) {
                                        wrapper.scrollTop(item.position().top);
                                    } else if (itemBottom >= (wrapper.height() + wrapper.scrollTop())) {
                                        wrapper.scrollTop(wrapper.scrollTop() + (itemBottom - (wrapper.height() + wrapper.scrollTop())));
                                    }

                                    item.addClass('item-selected');
                                });
                            }
                        });

                        //initialize
                        $timeout(function() {
                            $scope.search(true);
                            //apply jquery
                            $scope.$$postDigest(calcMaxHeight);
                        });
                    }
                });
            }
        ]).directive('autoTransclude', function() {
            return {
                compile: function(tElement, tAttrs, transclude) {
                    return function(scope, iElement) {
                        transclude(scope.$new(), function(clone) {
                            iElement.append(clone);
                        });
                    };
                }
            };
        });
}(angular));
