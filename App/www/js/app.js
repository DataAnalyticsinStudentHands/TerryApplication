/*global angular, cordova, console*/

// Honors Application Web App
angular.module('HonorsApplications', [
    'ionic',
    'restangular',
    'ngNotify',
    'databaseServicesModule',
    'TerryControllers',
    'TerryFilters',
    'TerryServices',
    'TerryDirectives',
    'ui.bootstrap.datetimepicker',
    'ui.utils',
    'ng-currency',
    'angular-data.DSCacheFactory',
    'angularFileUpload'
]).run(function ($ionicPlatform, Restangular, $rootScope, Auth, $q, $state, UserService, ngNotify) {
    'use strict';

    // Set Base URL to connect to DASH RESTFUL webservices
    //Restangular.setBaseUrl("http://127.0.0.1:8080/RESTFUL-WS-terry/"); // localhost
    Restangular.setBaseUrl("http://www.housuggest.org:8888/terry/");
    //Restangular.setDefaultHttpFields({cache: true});

    // have Restangular available whereever we need it
    $rootScope.Restangular = function () {
        return Restangular;
    };

    //CHECKING IF AUTHENTICATED ON STATE CHANGE - Called in $stateChangeStart
    $rootScope.isAuthenticated = function (authenticate) {
        UserService.getUser().then(function (result) {
            console.log("authed");
            result = Restangular.stripRestangular(result)[0];
            //USERNAME & ID TO BE USED IN CONTROLLERS
            $rootScope.uid = result.id.toString();
            $rootScope.uin = result.username.toString();
        }, function (error) {
            if (error.status === 0) {
                ngNotify.set("Internet or server unavailable.", {
                    type: "error",
                    sticky: true
                });
            } else { // LOG THEM OUT
                Auth.clearCredentials();
                console.log("not-authed");
                if (authenticate) {
                    $state.go("signin");
                }
            }
        });

        return Auth.hasCredentials();
    };

    //AUTHENTICATE ON CHANGE STATE
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
        if (toState.authenticate && !$rootScope.isAuthenticated(toState.authenticate)) {
            console.log("non-authed");
            // User isn’t authenticated
            $state.go("signin");
            //Prevents the switching of the state
            event.preventDefault();
        }
    });

    //Logout user by clearing credentials
    $rootScope.logout = function () {
        Auth.clearCredentials();
        console.log("log out");
        $state.go('signin', {}, {
            reload: true
        });
    };

    // Some watchdogs for fixing ui-route issues Credits: Adam's answer in http://stackoverflow.com/a/20786262/69362
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeError - fired when an error occurs during transition.');
        console.log(arguments);
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
    });

    $rootScope.$on('$viewContentLoaded', function (event) {
        console.log('$viewContentLoaded - fired after dom rendered', event);
    });

    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    // Set up the various states which the app can be in.

    //signin, this is also the fallback
    $stateProvider
        .state('signin', {
            url: '/signin',
            templateUrl: 'templates/signin.html',
            controller: 'SignInController',
            authenticate: false
        })

    //register
    .state('register', {
        url: "/register",
        templateUrl: "templates/register.html",
        controller: 'RegisterController',
        authenticate: false
    })

    // setup an abstract state for the tabs directive
    .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        authenticate: true
    })

    .state('tabs.myapplications', {
        url: '/myapplications',
        views: {
            'tab-myapplications': {
                templateUrl: 'templates/tab-myapplications.html',
                controller: 'MyapplicationsController'
            }
        },
        authenticate: true
    })


    .state('tabs.myapplication', {
        url: '/myapplication/:applicationId',
        abstract: true,
        authenticate: true
    })

    .state('tabs.myapplication.student_information', {
        url: '/student_information',
        views: {
            "tab-myapplications@tabs": {
                templateUrl: 'templates/student_information.html',
                controller: 'MyApplicationController'
            }
        },
        authenticate: true
    })

    .state('tabs.myapplication.highschool_information', {
        url: '/highschool_information',
        views: {
            "tab-myapplications@tabs": {
                templateUrl: 'templates/highschool_information.html',
                controller: 'MyApplicationController'
            }
        },
        authenticate: true
    })

    .state('tabs.myapplication.highschool_coursework', {
        url: '/highschool_coursework',
        views: {
            "tab-myapplications@tabs": {
                templateUrl: 'templates/highschool_coursework.html',
                controller: 'MyCourseworkController'
            }
        },
        authenticate: true
    })

    .state('tabs.myapplication.employment', {
        url: '/employment',
        views: {
            "tab-myapplications@tabs": {
                templateUrl: 'templates/employment.html',
                controller: 'MyEmploymentController'
            }
        },
        authenticate: true
    })

    .state('tabs.myapplication.college_plans', {
        url: '/college_plans',
        views: {
            "tab-myapplications@tabs": {
                templateUrl: 'templates/college_plans.html',
                controller: 'MyApplicationController'
            }
        },
        authenticate: true
    })

    .state('tabs.myapplication.financial_information', {
        url: '/financial_information',
        views: {
            "tab-myapplications@tabs": {
                templateUrl: 'templates/financial_information.html',
                controller: 'MyApplicationController'
            }
        },
        authenticate: true
    })

    .state('tabs.myapplication.scholarship_information', {
        url: '/scholarship_information',
        views: {
            "tab-myapplications@tabs": {
                templateUrl: 'templates/scholarship_information.html',
                controller: 'MyApplicationController'
            }
        },
        authenticate: true
    })

    .state('tabs.myapplication.essays', {
        url: '/essays',
        views: {
            "tab-myapplications@tabs": {
                templateUrl: 'templates/essays.html',
                controller: 'UploadController'
            }
        },
        authenticate: true
    })

    .state('tabs.myapplication.submit', {
        url: '/submit',
        views: {
            "tab-myapplications@tabs": {
                templateUrl: 'templates/submit.html',
                controller: 'MyApplicationController'
            }
        },
        authenticate: true
    })

    .state('tabs.myapplication.confirmation', {
        url: '/confirmation',
        views: {
            "tab-myapplications@tabs": {
                templateUrl: 'templates/confirmation.html',
                controller: 'MyApplicationController'
            }
        },
        authenticate: true
    })

    .state('tabs.information', {
        url: '/information',
        views: {
            'tab-information': {
                templateUrl: 'templates/tab-information.html'
            }
        },
        authenticate: true
    })

    .state('tabs.user', {
        url: '/user',
        views: {
            'tab-user': {
                templateUrl: 'templates/tab-user_detail.html',
                controller: 'UserDetailController'
            }
        },
        authenticate: true
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/signin');
});