/*global angular, console*/
'use strict';

/**
 * @ngdoc function
 * @name myapplication.controller:MyApplicationController
 * @description
 * # MyApplicationController
 * Controller for the terry
 */
angular.module('TerryControllers')
    .controller('MyApplicationController', function ($scope, Restangular, ngNotify, $stateParams, MyApplicationService, $ionicSideMenuDelegate, $filter, $ionicPopup) {

        $scope.myapplication = {};

        MyApplicationService.getMyApplication($stateParams.applicationId).then(
            function (result) {
                if ($stateParams.applicationId !== "") {
                
                    $scope.myapplication = result;
                    if ($scope.myapplication.state !== null) {
                        $scope.test = $filter('filter')($scope.states, {name: $scope.myapplication.state}, true);
                        $scope.myState = $scope.test[0];
                    } else {
                        $scope.myState = $scope.states[50];
                    }
                }
            },
            function (error) {
                if (error.status === 0) {
                    ngNotify.set("Internet or Server unavailable.", {type : "error", sticky : true});
                } else {
                    ngNotify.set("Something went wrong retrieving data.", {type : "error", sticky : true});
                }
            }
        );
    
    
        $scope.newUser = {};

        $scope.$watch('newUser.birthDate', function (unformattedDate) {
            $scope.myapplication.dob = $filter('date')(unformattedDate, 'dd/MM/yyyy');
        });

        $scope.openDatePicker = function () {
            $scope.tmp = {};
            $scope.tmp.newDate = $scope.newUser.birthDate;
            var configdate = "{ startView:'year' }";
    
            var birthDatePopup = $ionicPopup.show({
                template: '<datetimepicker data-ng-model="tmp.newDate"></datetimepicker>',
                title: "Birth date",
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            $scope.newUser.birthDate = $scope.tmp.newDate;
                        }
                    }
                ]
            });
        };
    

        $scope.toggleRight = function() {
            $ionicSideMenuDelegate.toggleRight();
        };

        // callback for ng-submit 'save':
        $scope.save = function() {
            $scope.myapplication.state = $scope.myapplication.state.name;
            MyApplicationService.updateMyApplication($scope.myapplication.id, $scope.myapplication).then(
            function(result) {
                ngNotify.set("Saved to server.", {position: 'bottom', type: 'success'});
            },
            function(error) {
                ngNotify.set("Could not contact server to save application!", {position: 'bottom', type: 'error'});

        });
    }
    
    
    
    $scope.states = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
];
    
    
});