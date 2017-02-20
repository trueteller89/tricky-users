'use strict';
angular.module('myApp', [
    'ngRoute',
    'myApp.controllers',
    'myApp.services',
    'myApp.directives',
    'ui.bootstrap'
]).config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider, $httpProvider) {
    $routeProvider.otherwise({redirectTo: '/users'});
    $httpProvider.defaults.cache = true;
}]).config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'partials/users.html',
            controller: 'mainController'
        });
}]);

