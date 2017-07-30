'use strict';
angular
    .module('ideadeck')
    .controller('ProfileController',function($scope,$rootScope,$routeParams,UserService,ProfileService,$localStorage,$location) {

        console.log("pringing user values prof>>",$localStorage.user,">>>>",$rootScope.user);

        $scope.getUserData = function(){
            console.log("running getUserData")
            ProfileService.getUserDataService($rootScope.user.id)
                .then(function (response) {
                    $scope.profileUser = response.data;
                })
        },

            $scope.getUserData();

        $scope.getideas = function(){
            ProfileService.getideasService($rootScope.user.id)
                .then(function (response) {
                    console.log("getUserData response>>>",response)
                    $scope.profileIdeas = response.data;
                })
        }

        $scope.getideas();
    });
