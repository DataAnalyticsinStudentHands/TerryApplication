/*global angular, console*/

/**
 * @ngdoc function
 * @name terry.service:DataService
 * @description
 * # DataService
 * Service for the terry
 */
angular.module('Services').factory('DataService', function (Restangular, $http, $q, $ionicLoading, ngNotify) {
    'use strict';

    //Load data for form data for terry application
    var application_form,
        transfer_application_form,
        states,
        marital_statuses,
        grades,
        course_types;

    $http.get('json/form_application.json').success(function (data) {
        application_form = data;
    });
    $http.get('json/form_transfer_application.json').success(function (data) {
        transfer_application_form = data;
    });
    $http.get('json/states.json').success(function (data) {
        states = data;
    });
    $http.get('json/marital_statuses.json').success(function (data) {
        marital_statuses = data;
    });
    $http.get('json/grades.json').success(function (data) {
        grades = data;
    });
    $http.get('json/course_types.json').success(function (data) {
        course_types = data;
    });

    return {

        getForm: function (acType) {
            switch (acType) {
            case 'application':
                return application_form;
            case 'transfer_application':
                return transfer_application_form;
            }
        },
        getStates: function () {
            return states;
        },
        getMarital_statuses: function () {
            return marital_statuses;
        },
        getGrades: function () {
            return grades;
        },
        getCourseTypes: function () {
            return course_types;
        },

        getAllItems: function (acType) {

            return Restangular.all(acType).getList().then(
                function (result) {

                    result = Restangular.stripRestangular(result);
                    result.type = acType;
                    return result;
                },
                function (error) {
                    if (error.status === 0) {
                        ngNotify.set("Internet or Server not available. Please make sure you have internet connection.", {
                            position: 'bottom',
                            type: 'error'
                        });
                    } else {
                        ngNotify.set("Something went wrong retrieving data for " + acType, {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                }
            );

        },
        getItem: function (type, item_id) {

            return Restangular.one(type, item_id).get().then(
                function (result) {

                    result = Restangular.stripRestangular(result);
                    return result[0];
                },
                function (error) {

                    ngNotify.set("Something went wrong retrieving data for type " + type, {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        },
        addItem: function (type, item) {

            return Restangular.all(type).post(item).then(

                function (result) {
                    ngNotify.set("Succesfully saved your " + type + " to the server.", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    console.log(error);
                    ngNotify.set("Could not contact server to add " + type + " !", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        },
        updateItem: function (type, item_id, item) {

            $ionicLoading.show({
                template: '<div class="item item-icon-left"><i class="icon ion-loading-c"></i>Updating data on server ...</div>'
            });

            return Restangular.all(type).customPUT(item, item.id).then(
                function (result) {
                    $ionicLoading.hide();
                    ngNotify.set("Succesfully updated your " + type + " on the server.", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    $ionicLoading.hide();
                    ngNotify.set("Could not contact server to update " + type + " !", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        },
        storeItem: function (type, item) {

            localStorage.setItem(type, item);
            return true;

        },
        deleteItem: function (type, item_id) {

            return Restangular.all(type).all(item_id).remove().then(
                function (result) {
                    ngNotify.set("Succesfully deleted your " + type + ".", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    ngNotify.set("Could not contact server to delete " + type + "!", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        },
        getListofDocuments: function (type, application_id) {
            return Restangular.one(type).customGET("upload", {
                applicationId: application_id
            }).then(
                function (result) {
                    result = Restangular.stripRestangular(result);
                    return result;
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving uploaded file information.", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        }
    };
});