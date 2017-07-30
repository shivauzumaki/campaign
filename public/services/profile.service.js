'use strict';
angular.module('ideadeck')
    .factory('ProfileService', function ($http) {
        return {
            getUserDataService: function (userid) {
                return $http.post('/api/getUserInfo', {id:userid})
            },

            getideasService: function (userid) {
                return $http.post('/api/getUserIdeas', {id:userid})
            }
        }
    });
