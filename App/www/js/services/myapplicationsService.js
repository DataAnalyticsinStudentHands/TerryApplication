'use strict';

/**
 * @ngdoc function
 * @name terry.controller:LoginController
 * @description
 * # LoginController
 * Controller of the terry
 */
angular.module('TerryServices')
.factory('MyapplicationsService', function(Restangular, $q) {
    
    
    var myapplications = ["terry1", "terry2", "terry3"];
    
    return {
    all: function() {
      return myapplications;
    },
    first: function() {
      return myapplications[0];
    }
  }
    
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
});
