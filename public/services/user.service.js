(function () {
    'use strict';
    angular.module('ideadeck')
        .factory('UserService', function ($http,$rootScope,$localStorage) {
            return {
                getUserById:function(userData){
                    return $http.get('/api/user',userData);
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
                getIdByEmail: function (id) {
                    return $http.get('/api/forgetpassword',{params: {id: id}});
                },
                forgotPassword: function (email){
                    return $http.get('/api/userspass',{params: {id:email}});
                },
                resetPassService: function(data){
                    return $http.put('/api/passwordupdate',data)
                },
                isLoggedIn: function(){
                    if($localStorage.user) {
                        $rootScope.user = $localStorage.user;
                        $rootScope.loggedUser = $rootScope.user.name;
                        return true;
                    } else {
                        return false;
                    }
                },
                getUser: function () {
                    return $http.get('/auth/user')
                },
                getUserStatus: function() {
                    return  $http.get('/api/status').then(function (response) {
                        if(response.status){
                            $rootScope.user = response.data.user;
                        } else {
                            $rootScope.user = false;
                        }
                    })

                    /*.success(function (response) {
                        if(data.status){
                            $rootScope.user = response.data.user;
                        } else {
                            $rootScope.user = false;
                        }
                    })
                    .error(function (data) {
                        $rootScope.user = false;
                    });*/
            }

            }
        });
})();