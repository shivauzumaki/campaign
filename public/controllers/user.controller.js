
    'use strict';
    angular
        .module('ideadeck')
        .controller('UserController',function($scope,$rootScope,$routeParams,$localStorage,UserService,$location) {


            $scope.signup = function(){
                console.log("user object>>>",$scope.user)
                console.log("choice data>>",$scope.choices)
                $scope.user.members = $scope.choices;
                console.log("total object>>>",$scope.user)
                UserService.create($scope.user)
                .then(function (response) {
                    console.log("prinrinf response on login>>>",response)
                    if(response.data.flag) {
                        console.log(response)
                        $rootScope.user = response.data.user;
                        $rootScope.loggedUser = $rootScope.user.name;
                        $rootScope.modalFlag = true;
                        $localStorage.user = $rootScope.user;
                        console.log("pringing user values signup>>",$localStorage.user,$rootScope.user);
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
                    console.log("user object for login>>>",$scope.user)
                    UserService.login($scope.user)
                        .then(function (response) {
                            console.log("response after login>>>",response)
                            if(response.data.flag) {
                                $rootScope.user = response.data.user;
                                $rootScope.loggedUser = $rootScope.user.name;
                                $rootScope.modalFlag = false;
                                $scope.message = null;
                                $localStorage.user = $rootScope.user;
                                console.log("pringing user values login>>",$localStorage.user,$rootScope.user);
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
