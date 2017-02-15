'use strict';
angular.module('myApp.directives', ['ngRoute', 'myApp.services', 'ui.bootstrap'])
    .directive('copyToClipboard', ['ngCopy', function (ngCopy) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function (e) {
                    ngCopy(attrs.copyToClipboard);
                });
            }
        }
    }])
;