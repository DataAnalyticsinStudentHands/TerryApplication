/*global angular*/

/**
 * @ngdoc function
 * @name terry.service:MyActivityService
 * @description
 * # MyActivityService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyActivityService', function (Restangular, $q, ngNotify) {
    'use strict';
    
    return {
        getAllActivity:
            function () {
                return Restangular.all("activity").getList();
            },
        getMyActivity:
            function (activity_id) {
                return Restangular.all("activity").get(activity_id);
            },
        addActivity:
            function (activity) {
                return Restangular.all("activity").post(activity).then(
                    function (result) {
                        ngNotify.set("Succesfully saved your activity to the server.", {
                            position: 'bottom',
                            type: 'success'
                        });
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to add activity!", {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                );
            },
        updateActivity:
            function (activity_id, activity) {
                return Restangular.all("activity").all(activity_id).post(activity).then(
                    function (result) {
                        ngNotify.set("Succesfully saved your activity to the server.", {
                            position: 'bottom',
                            type: 'success'
                        });
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to update activity!", {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                );
            },
        deleteActivity:
            function (activity_id) {
                return Restangular.all("activity").all(activity_id).remove().then(
                    function (result) {
                        ngNotify.set("Succesfully deleted your activity.", {position: 'bottom', type: 'success'});
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to delete activity!", {position: 'bottom', type: 'error'});
                    }
                );
            }
    };
});


