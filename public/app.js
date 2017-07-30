'use strict';

angular
    .module('ideadeck', ['ngRoute','ngStorage','checklist-model'])
    .directive('header', function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/view/ideaheader.html',
            controller: 'UserController'
        };
    })
    .directive('header2', function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/view/ideaheader2.html',
            controller: 'UserController'
        };
    })
    .directive('footeridea', function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/view/ideafooter.html',
            controller: 'UserController'
        };
    })
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/view/MainPage.html',
                    controller: 'ProblemController as probCtrl',
                    access: {restricted: false}
                })
                .when('/subcategories', {
                    templateUrl: '/view/subcategorylist.html',
                    controller: 'ProblemController as probCtrl',
                    access: {restricted: false}
                })
            .when('/idea', {
                templateUrl: '/view/ideaform.html',
                controller: 'IdeaController as ideaCtrl',
                access: {restricted: true}
            })
            .when('/problemstatement', {
                templateUrl: '/view/probstmtform.html',
                controller: 'ProblemController as probCtrl',
                access: {restricted: true}
            })
            .when('/profile', {
                templateUrl: '/view/profile.html',
                controller: 'ProfileController as profileCtrl',
                access: {restricted: true}
            })
                .when('/problemlist', {
                    templateUrl: '/view/probstmtlist.html',
                    controller: 'ProblemController as probCtrl',
                    access: {restricted: false}

                })
                .when('/problemdetails',{
                    templateUrl: '/view/probstmtdetails.html',
                    controller: 'ProblemController as probCtrl',
                    access: {restricted: true}
                })
                .when('/signup',{
                    templateUrl: '/view/signup.html',
                    controller: 'UserController as userCtrl',
                    access: {restricted: false}
                })
                .when('/login',{
                    templateUrl: '/view/login.html',
                    controller: 'UserController as userCtrl',
                    access: {restricted: false}
                })
                .when('/forgotpassword',{
                    templateUrl: '/view/forgotpassword.html',
                    controller: 'UserController as userCtrl',
                    access: {restricted: false}
                })
                .when('/resetPassword/:id',{
                    templateUrl: '/view/resetpassword.html',
                    controller: 'UserController as userCtrl',
                    access: {restricted: false}
                })
        }])
    .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])

    .filter('range', function() {
        return function(input, min, max) {
            min = parseInt(min); //Make string input int
            max = parseInt(max);
            for (var i=min; i<max; i=i+.5)
                input.push(i);
            return input;
        };
    })
    .run(function ($rootScope, $location, $route, UserService) {
    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
                if (next.access.restricted && !UserService.isLoggedIn()){
                    $location.path('/login');
                    $route.reload();
                }}
    )

});