'use strict';
angular
    .module('ideadeck')
    .controller('ProfileController',function($scope,$rootScope,$routeParams,UserService,ProfileService,$localStorage,$location) {
        $scope.profileUser = null;
        $scope.profileIdeas = null;

        $scope.getUserData = function(){
            ProfileService.getUserDataService($rootScope.user.id)
                .then(function (response) {
                    $scope.profileUser = response.data[0];
                })
        },

            $scope.getUserData();

        $scope.getideas = function(){
            ProfileService.getideasService($rootScope.user.id)
                .then(function (response) {
                    $scope.profileIdeas = response.data;
                })
        }

        $scope.getideas();
    });
