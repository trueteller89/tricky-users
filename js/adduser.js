'use strict';

angular.module('myApp.addnew', ['ngRoute', 'ui.bootstrap'])
    .controller('addUserController', ["$scope", "$rootScope", "$uibModalInstance", function ($scope, $rootScope, $uibModalInstance) {
        var foundEqualUsername = false,
            foundEqualEmail = false,
            foundEqualCompanyName = false,
            foundDot = false,
            maxId=0,
            initUsr = function () {
                $scope.usr = {
                    'id': 0,
                    'email': '',
                    'phone': '',
                    'name': '',
                    'username': '',
                    'website': '',
                    'company': {
                        'name': '',
                        'bs': '',
                        'catchPhrase': ''
                    },
                    'address': {
                        'city': '',
                        'street': '',
                        'suite': '',
                        'zipcode': '',
                        'geo': {
                            'lat': '',
                            'lng': ''
                        }
                    }
                };
            }
        initUsr();
        $scope.alerts = [];
        $scope.submitUser = function () {
            if ($scope.usr.website.indexOf(".") < 1 || $scope.usr.website.indexOf(".") == $scope.usr.website.length - 1) {
                foundDot = false
            }
            else {
                foundDot = true
            }
            $scope.users.forEach(function (elem, index) {
                if (elem.username === $scope.usr.username) {
                    foundEqualUsername = true;
                }
                if (elem.email === $scope.usr.email) {
                    foundEqualEmail = true;
                }
                if (elem.company.name === $scope.usr.company.name) {
                    foundEqualCompanyName = true;
                }
            })
            if (!foundEqualCompanyName && !foundEqualEmail && !foundEqualUsername && foundDot) {
                if ($scope.userForm.$valid) {
                    $scope.alerts = [];
                    $scope.users.forEach(function (elem, index) {
                        if (elem.id > maxId) {
                            maxId = elem.id;
                        }
                    });
                    $scope.usr.id=maxId+1;
                    $scope.users.push($scope.usr);
                    $scope.alerts.push({msg: 'Your form has been successfully submitted!'});
                    foundEqualUsername = false;
                    foundEqualEmail = false;
                    foundEqualCompanyName = false;
                    foundDot = false;
                    maxId=0;
                    initUsr();
                    console.log($scope.users);
                }
                else {
                    $scope.alerts = [];
                    $scope.alerts.push({msg: 'Form is not valid!'});
                }
            }
            else {
                if (foundEqualCompanyName) {
                    $scope.alerts.push({msg: 'This company name is already taken!'});
                }
                if (foundEqualEmail) {
                    $scope.alerts.push({msg: 'This email is already taken!'});
                }
                if (foundEqualUsername) {
                    $scope.alerts.push({msg: 'This username is already taken!'});
                }
                if (!foundDot) {
                    $scope.alerts.push({msg: 'Incorrect website name!'});
                }
            }
        };
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
;