'use strict';
angular.module('myApp', [
    'ngRoute',
    'myApp.users',
    'myApp.addnew',
    'myApp.services',
    'myApp.directives',
    'ui.bootstrap'
]).config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider, $httpProvider) {
    $routeProvider.otherwise({redirectTo: '/users'});
    $httpProvider.defaults.cache = true;
}]);

