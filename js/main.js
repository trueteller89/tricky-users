'use strict';
angular.module('myApp.users', ['ngRoute', 'myApp.services', 'ui.bootstrap', 'myApp.directives'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'partials/users.html',
            controller: 'mainController'
        });
    }])
    .controller('mainController', ['$scope', '$rootScope', '$http', '$uibModal', function ($scope, $rootScope, $http, $modal) {

        $scope.users = [];
        $scope.searchText = "";
        $scope.sortProperties = ["name", "username", "email", "address.street", "company.name"];
        $scope.sortByProp = "name";
        $scope.reverseOrder = false;
        $scope.showModal = false;
            $http.get("https://jsonplaceholder.typicode.com/users",{ cache: true }).then(function (res) {
                $scope.users = res.data;
                var dialogSuccessInst = $modal.open({
                    templateUrl: 'partials/success-load.html',
                    size: 'xs',
                });
            });
        $scope.addUser = function () {
            var dialogInst = $modal.open({
                templateUrl: 'partials/add-user.html',
                controller: 'addUserController',
                size: 'lg',
                scope: $scope,
            });
        };
    }])
