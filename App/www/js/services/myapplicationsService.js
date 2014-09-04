'use strict';

/**
 * @ngdoc function
 * @name terry.controller:LoginController
 * @description
 * # LoginController
 * Controller of the app
 */
angular.module('TerryServices')
    .factory('MyapplicationsService', function ($q, $http) {
        return {
            getMyApplications: function () {
                var deferred = $q.defer(),
                    httpPromise = $http.get('terry/myapplications.json');
 
                httpPromise.then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    console.error(error);
                });
 
                return deferred.promise;
            }
        };
    });

    /*return {
        getAllApplications:
            function() {
                return Restangular.all("simple").getList();
            },
        getApplication:
            function(application_id) {
                return Restangular.all("simple").get(application_id);
            },
        createApplication:
            function(application, uid) {
                application.user_id = uid;
                return Restangular.all("simple").post(application);
            },
        editApplication:
            function(id, post) {
                 return Restangular.all("simple").all(id).post(post);
            },
        deleteApplication:
            function(pid) {
                return Restangular.all("simple").all(pid).remove();
            },
    }*/

