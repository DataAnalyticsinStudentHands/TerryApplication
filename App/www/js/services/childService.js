/*global angular*/

/**
 * @ngdoc function
 * @name terry.service:MyChildService
 * @description
 * # MyChildService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyChildService', function (Restangular, $q, ngNotify) {
    'use strict';
    
    return {
        getAllChild:
            function () {
                return Restangular.all("child").getList();
            },
        getMyChild:
            function (child_id) {
                return Restangular.all("child").get(child_id);
            },
        addChild:
            function (child) {
                return Restangular.all("child").post(child).then(
                    function (result) {
                        ngNotify.set("Succesfully saved your child to the server.", {
                            position: 'bottom',
                            type: 'success'
                        });
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to add child!", {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                );
            },
        updateChild:
            function (child_id, child) {
                return Restangular.all("child").all(child_id).post(child).then(
                    function (result) {
                        ngNotify.set("Succesfully updated your child on the server.", {
                            position: 'bottom',
                            type: 'success'
                        });
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to child university!", {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                );
            },
        deleteChild:
            function (child_id) {
                return Restangular.all("child").all(child_id).remove().then(
                    function (result) {
                        ngNotify.set("Succesfully deleted your child.", {position: 'bottom', type: 'success'});
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to delete child!", {position: 'bottom', type: 'error'});
                    }
                );
            }
    };
});


