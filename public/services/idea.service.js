'use strict';
angular.module('ideadeck')
    .factory('IdeaService', function ($http) {
        return {
            createService:function(ideaData){
                return $http.post('/api/idea',ideaData);
            },
            problemListService:function () {
                return $http.get('/api/problemAll');
            }
        }
    });
