/*global angular, console*/

/**
 * @ngdoc function
 * @name terry.service:DataService
 * @description
 * # DataService
 * Service for the terry
 */
angular.module('TerryServices').factory('DataService', function (Restangular, $q, DSCacheFactory, ngNotify) {
    'use strict';

    // Create a new cache called "itemsCache"
    var itemsCache = new DSCacheFactory('itemsCache');

    return {
        getAllItems: function (type) {
            if (itemsCache.get(type) !== undefined) {
                return itemsCache.get(type);
            } else {
                return Restangular.all(type).getList().then(
                    function (result) {
                        result = Restangular.stripRestangular(result);
                        itemsCache.put(type, result);
                        return result;
                    },
                    function (error) {
                        ngNotify.set("Something went wrong retireving data for " + type, {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                );
            }
        },
        addItem: function (type, item) {
            
            return Restangular.all(type).post(item).then(

                function (result) {
                    var test = itemsCache.get(type);
                    item.id = result;
                    test.push(item);
                    itemsCache.remove(type);
                    itemsCache.put(type, test);

                    ngNotify.set("Succesfully saved your " + type + " to the server.", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    ngNotify.set("Could not contact server to add " + type + " !", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        },
        updateItem: function (type, item_id, item) {
            
            return Restangular.all(type).all(item_id).post(item).then(
                function (result) {
                    ngNotify.set("Succesfully updated your " + type + " on the server.", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    ngNotify.set("Could not contact server to update " + type + " !", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        },
        deleteItem: function (type, item) {
            var test = itemsCache.get(type);
            test = _.without(test, item);
            itemsCache.remove(type);
            itemsCache.put(type, test);
            return Restangular.all(type).all(item.id).remove().then(
                function (result) {
                    ngNotify.set("Succesfully deleted your " + type + " .", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    ngNotify.set("Could not contact server to delete " + type + " !", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        }
    };
});