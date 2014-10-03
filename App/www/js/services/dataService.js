/*global angular*/


/**
 * @ngdoc function
 * @name terry.service:MyEmploymentService
 * @description
 * # MyEmploymentService
 * Service for the terry
 */
angular.module('TerryServices').factory('DataService', function (Restangular, $q, ngNotify) {
'use strict';








return {
    

    getAll: function (type) {
        return Restangular.all(type).getList();
        

    },
    getMyEmployment: function (employment_id) {
        return Restangular.all("employment").get(employment_id);
    },
    addEmployment: function (employment) {
        return Restangular.all("employment").post(employment).then(
            function (result) {
                ngNotify.set("Succesfully saved your employment to the server.", {
                    position: 'bottom',
                    type: 'success'
                });
            },
            function (error) {
                ngNotify.set("Could not contact server to add employment!", {
                    position: 'bottom',
                    type: 'error'
                });
            }
        );
    },
    updateEmployment: function (employment_id, employment) {
        return Restangular.all("employment").all(employment_id).post(employment).then(
            function (result) {
                ngNotify.set("Succesfully updated your employment on the server.", {
                    position: 'bottom',
                    type: 'success'
                });
            },
            function (error) {
                ngNotify.set("Could not contact server to update employment!", {
                    position: 'bottom',
                    type: 'error'
                });
            }
        );
    },
    deleteEmployment: function (employment_id) {
        return Restangular.all("employment").all(employment_id).remove().then(
            function (result) {
                ngNotify.set("Succesfully deleted your employment.", {
                    position: 'bottom',
                    type: 'success'
                });
            },
            function (error) {
                ngNotify.set("Could not contact server to delete employment!", {
                    position: 'bottom',
                    type: 'error'
                });
            }
        );
    }
};
});