'use strict';
angular.module('myApp.services', ['ngRoute'])
    .service('ngCopy', ['$window', function ($window) {
        var body = angular.element($window.document.body);
        var textarea = angular.element('<textarea/>');
        return function (toCopy) {
            textarea.val(toCopy);
            body.append(textarea);
            textarea[0].select();
            try {
                var successful = document.execCommand('copy');
                if (!successful) throw successful;
            } catch (err) {
                window.prompt("Copy to clipboard: Ctrl+C, Enter", toCopy);
            }
            textarea.remove();
        }
    }])
.service('httpRequestsService', ['$http', function($http) {
        return {
            getUsers: function() {
                var globalOptions={
                    cache:true
                };
                var options = angular.extend({}, globalOptions);
                return $http.get("https://jsonplaceholder.typicode.com/users",{
                    params: options
                });
            }
        };
    }]);