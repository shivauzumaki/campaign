    'use strict';
    angular
        .module('ideadeck')
        .controller('ProblemController',function($scope,$rootScope,$routeParams,ProblemService,UserService,$localStorage,$location) {

            $scope.successMessage = null;
            $scope.createProblem = function(){
                $scope.problem.userId = $rootScope.user.id;
                ProblemService.createService($scope.problem)
                    .then(function (response) {
                        $scope.problem = null;
                        alert("Problem Statement created successfully!!!")
                    })
            },

                $scope.getProblemList = function(subcategory){
                $rootScope.mainSubCategory = subcategory.subcategory;
                    ProblemService.getProbListService($rootScope.mainSubCategory,$rootScope.mainCategory)
                        .then(function (response) {
                            $rootScope.problemlist = response.data;
                            $location.path('/problemlist')
                        })
                },

                $scope.getSubCatList = function(category){
                    $rootScope.mainCategory = category;
                    ProblemService.SubCatListService($rootScope.mainCategory)
                        .then(function (response) {
                            $rootScope.mainSubCatgoryList = response.data;
                            $location.path('/subcategories')
                        })
                },

                $scope.problemDetails = function(problemDet){
                    $rootScope.problemItem = null;
                    $rootScope.problemItem = problemDet
                    $location.path("/problemdetails")

            },
                $scope.submitIdea = function(){
                    $location.path("/idea");
                },

                $scope.getSubList = function () {
                    ProblemService.getSubListService($scope.problem.category)
                        .then(function (response) {
                            $scope.subcategories = response.data;
                        })
                },
                
                $scope.go_back = function () {
                    $location.path("/problemlist")
                },

                $scope.go_back_main = function () {
                    $location.path("/")
                },

                $scope.go_back_subcat = function () {
                    $location.path("/subcategories")
                }



        });
