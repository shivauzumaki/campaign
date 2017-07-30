    'use strict';
    angular.module('ideadeck')
        .factory('ProblemService', function ($http) {
            return {
                createService:function(problemData){
                    return $http.post('/api/problem',problemData);
                },
                /*problemListService:function (category) {
                    return $http.get('/api/problemAll',{params: {category:category}});
                },*/
                getSubListService:function (category) {
                    return $http.post('/api/subcat',{category:category});
                },
                getProbListService:function (subcategory,category) {
                    return $http.post('/api/problist',{subcategory:subcategory,category:category});
                },

                SubCatListService:function (category) {
                    return $http.post('/api/subcatlist',{category:category});
                },




                login: function (userData) {
                    return $http.post('/api/login',userData);
                },
                logoutService: function() {
                    return $http.get('/api/logout');
                },
                create: function (userData) {
                    return $http.post('/api/signup', userData);
                },
                delete: function (id) {
                    return $http.delete('/api/users/' + id);
                },
                forgotPassword: function (email){
                    return $http.get('/api/userspass',{params: {id:email}});
                }

            }
        });
