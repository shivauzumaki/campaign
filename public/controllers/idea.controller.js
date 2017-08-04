'use strict';
angular
    .module('ideadeck')
    .controller('IdeaController',function($scope,$rootScope,$routeParams,IdeaService,UserService,ProblemService,$localStorage,$location) {

        $scope.creatingIdea = function(){
            /*$scope.idea.problemId = $rootScope.problemItem.id;*/
            IdeaService.createService($scope.idea)
                .then(function (response) {
                    $location.path("/profile")
                })
        },

            $scope.getSubList = function () {
                ProblemService.getSubListService($scope.idea.category)
                    .then(function (response) {
                        $scope.subcategories = response.data;
                    })
            },

            $scope.getProbList = function () {
                ProblemService.getProbListService($scope.idea.subcategory,$scope.idea.category)
                    .then(function (response) {
                        $scope.problist = response.data;
                    })
            }

            /*$scope.getProblemList = function(){
                ProblemService.problemListService()
                    .then(function (response) {
                        $scope.problemlist = response.data;
                    })
            };*/





    });
