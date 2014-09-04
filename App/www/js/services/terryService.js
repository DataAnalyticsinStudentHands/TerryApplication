'use strict';

/**
 * @ngdoc function
 * @name terry.controller:UserService
 * @description
 * # UserService
 * Service for the terry
 */
angular.module('TerryServices')
.factory('TerryApplicationService', function(Restangular, $q) {
    
    return {
        getTerryApplication:
            function(post_id) {
                return Restangular.all("simple").get(post_id);
            },
        addTerryApplication:
            function(post, uid) {
                post.user_id = uid;
                return Restangular.all("simple").post(post);
            },
        editTerryApplication:
            function(id, post) {
                 return Restangular.all("simple").all(id).post(post);
            },
        deleteTerryApplication:
            function(pid) {
                return Restangular.all("simple").all(pid).remove();
            },
    }
});


