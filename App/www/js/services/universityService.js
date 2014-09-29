/*global angular*/

/**
 * @ngdoc function
 * @name terry.service:MyUniversityService
 * @description
 * # MyUniversityService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyUniversityService', function (Restangular, $q, ngNotify) {
    'use strict';

    return {
        getAllUniversity:
            function () {
                return Restangular.all("university").getList();
            },
        getMyUniversity:
            function (university_id) {
                return Restangular.all("university").get(university_id);
            },
        addUniversity:
            function (university) {
                return Restangular.all("university").post(university).then(
                    function (result) {
                        ngNotify.set("Succesfully saved your university to the server.", {
                            position: 'bottom',
                            type: 'success'
                        });
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to add university!", {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                );
            },
        updateUniversity:
            function (university_id, university) {
                return Restangular.all("university").all(university_id).post(university).then(
                    function (result) {
                        ngNotify.set("Succesfully updated your university on the server.", {
                            position: 'bottom',
                            type: 'success'
                        });
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to update university!", {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                );
            },
        deleteUniversity:
            function (university_id) {
                return Restangular.all("university").all(university_id).remove().then(
                    function (result) {
                        ngNotify.set("Succesfully deleted your university.", {position: 'bottom', type: 'success'});
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to delete university!", {position: 'bottom', type: 'error'});
                    }
                );
            }
    };
});


