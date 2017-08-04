
    'use strict';
    angular
        .module('ideadeck')
        .controller('UserController',function($scope,$rootScope,$routeParams,$localStorage,UserService,$location) {


            $scope.signup = function(){
                $scope.user.members = $scope.choices;
                UserService.create($scope.user)
                .then(function (response) {
                    if(response.data.flag) {
                        $rootScope.user = response.data.user;
                        $rootScope.loggedUser = $rootScope.user.name;
                        $rootScope.modalFlag = true;
                        $localStorage.user = $rootScope.user;
                        $location.path("/");
                    }
                    else{
                        $scope.showerror = true;
                        $rootScope.loggedUser = null;
                        $scope.message = response.data.message[0];
                        $location.path("/signup");
                    }
                })
            },

                $scope.loginUser = function(){
                    UserService.login($scope.user)
                        .then(function (response) {
                            if(response.data.flag) {
                                $rootScope.user = response.data.user;
                                $rootScope.loggedUser = $rootScope.user.name;
                                $rootScope.modalFlag = false;
                                $scope.message = null;
                                $localStorage.user = $rootScope.user;
                                $location.path("/");
                            }
                            else{
                                $scope.showerror = true;
                                $rootScope.loggedUser = null;
                                $scope.message = response.data.message[0];
                            }
                        })
                },
            


                $scope.forgotPassword = function() {
                    UserService.forgotPassword($scope.email)
                        .then(function(response){
                        })
                },

                $scope.resetPass = function(){
                    $scope.user.id = $routeParams.id;
                    UserService.resetPassService($scope.user)
                        .then(function(response){
                            $location.path("/login");
                        })
                },


                $scope.userLogout = function () {
                    $localStorage.user = null;
                    $rootScope.user = null;
                    $rootScope.loggedUser = null;
                    $rootScope=undefined;
                    UserService.logoutService()
                        .then(function(response){
                            $location.path("/");
                    })
                },

                $scope.choices = [{counter: 1},{counter: 2}];

            $scope.addNewChoice = function() {
                var newItemNo = $scope.choices.length+1;
                if( newItemNo<6)
                $scope.choices.push({'counter':newItemNo});
            };

            $scope.removeChoice = function() {
                var lastItem = $scope.choices.length-1;
                $scope.choices.splice(lastItem);
            },

                $scope.forgetpasswordLink = function () {
                    $scope.showmessage = true;
                    $scope.resetmessage = "Please check your inbox for an email we just sent you with instructions for how to reset your password and log into your account."
                    UserService.getIdByEmail($scope.user.email)
                        .then(function(response){
                            $scope.showmessage = true;
                            $scope.resetmessage = "Please check your inbox for an email we just sent you with instructions for how to reset your password and log into your account."
                        })
                }

        });
