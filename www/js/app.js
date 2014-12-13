/*global angular, cordova, console*/

// Honors Application Web App
angular.module('HonorsApplications', [
    'ionic',
    'restangular',
    'ngNotify',
    'databaseControllerModule',
    'databaseServicesModule',
    'Controllers',
    'Filters',
    'Services',
    'Directives',
    'ui.bootstrap.datetimepicker',
    'ui.utils',
    'ng-currency',
    'angularFileUpload'
]).run(function ($ionicPlatform, Restangular, $rootScope, $ionicSideMenuDelegate, Auth, $q, $state) {
    'use strict';

    // Set Base URL to connect to DASH RESTFUL webservices
    Restangular.setBaseUrl("http://127.0.0.1:8080/terrytest/"); // localhost
    //Restangular.setBaseUrl("http://www.housuggest.org:8080/terrytest/");
    //Restangular.setDefaultHttpFields({cache: true});

    // have Restangular available whereever we need it
    $rootScope.Restangular = function () {
        return Restangular;
    };

    $rootScope.isAuthenticated = function () {
        return Auth.hasCredentials();
    };

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        console.log("$stateChangeStart to state: " + toState.name);
        //console.log($rootScope.isAuthenticated());
        if (toState.authenticate && !$rootScope.isAuthenticated()) {
            console.log("non-authed");
            // User isn’t authenticated
            $state.go("signin");
            //What?
            event.preventDefault();
        }
        
    });
    
    $rootScope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

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
    $stateProvider
        .state('signin', {
            url: '/sign-in',
            templateUrl: 'templates/signin.html',
            controller: 'loginCtrl',
            authenticate: false
        })

        .state('tabs', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html',
            authenticate: true
        })
    
        .state('tabs.applications', {
            url: '/applications',
            resolve: {
                freshman_applications: function (DataService) {
                    return DataService.getAllItems('application');
                },
                transfer_applications: function (DataService) {
                    return DataService.getAllItems('transferApplication');
                }
            },
            views: {
                'applications-tab': {
                    templateUrl: 'templates/tab-applications.html',
                    controller: 'MainController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.application', {
            url: '/application/:applicationId',
            abstract: true,
            views: {
                'applications-tab@tabs': {                    
                        templateUrl: 'templates/abstract_application.html',
                        controller: 'MyApplicationController' 
                }
            },
            resolve: {
                application: function (ApplicationService, $stateParams) {
                    return ApplicationService.getApplication('application', $stateParams.applicationID);
                },
                institutions: function (DataService) {
                    return DataService.getAllItems('institution');
                },
                universities: function (DataService) {
                    return DataService.getAllItems('university');
                },
                scholarships: function (DataService) {
                    return DataService.getAllItems('scholarship');
                },
                children: function (DataService) {
                    return DataService.getAllItems('child');
                },
                employment: function (DataService) {
                    return DataService.getAllItems('employment');
                }
            },
            authenticate: true           
        })
    
        .state('tabs.applications.application.student_information', {
            url: '/student_information',
            views: {
                'main_content': {
                    templateUrl: 'templates/student_information.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.application.highschool_information', {
            url: '/highschool_information',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/highschool_information.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.employment', {
            url: '/employment',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/employment.html',
                    controller: 'MyEmploymentController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.college_plans', {
            url: '/college_plans',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/college_plans.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.financial_information', {
            url: '/financial_information',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/financial_information.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.scholarship_information', {
            url: '/scholarship_information',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/scholarship_information.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.essays', {
            url: '/essays',
            views: {
                'main_content': {
                    templateUrl: 'templates/essays.html',
                    controller: 'UploadController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.submit', {
            url: '/submit',
            views: {
                'main_content': {
                    templateUrl: 'templates/submit.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.confirmation', {
            url: '/confirmation',
            views: {
                'main_content': {
                    templateUrl: 'templates/confirmation.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.transfer_application', {
            url: '/transfer_application/:applicationId',
            abstract: true,
            views: {
                'applications-tab@tabs': {
                        templateUrl: 'templates/abstract_transfer_application.html',
                        controller: 'MyApplicationController'
                }
            },
            resolve: {
                application: function (ApplicationService, $stateParams) {
                    return ApplicationService.getApplication('transferApplication', $stateParams.applicationID);
                },
                institutions: function (DataService) {
                    return DataService.getAllItems('institution');
                },
                universities: function (DataService) {
                    return DataService.getAllItems('university');
                },
                scholarships: function (DataService) {
                    return DataService.getAllItems('scholarship');
                },
                children: function (DataService) {
                    return DataService.getAllItems('child');
                },
                employment: function (DataService) {
                    return DataService.getAllItems('employment');
                }
            },
            authenticate: true           
        })
    
        .state('tabs.applications.transfer_application.student_information', {
            url: '/student_information',
            views: {
                'main_content': {
                        templateUrl: 'templates/student_information.html',
                        controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.transfer_application.education', {
            url: '/education',
            views: {
                'main_content': {
                        templateUrl: 'templates/transfer_app/education.html',
                        controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.transfer_application.employment', {
            url: '/education',
            views: {
                'main_content': {
                        templateUrl: 'templates/transfer_app/employment.html',
                        controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.transfer_application.financial_information', {
            url: '/education',
            views: {
                'main_content': {
                        templateUrl: 'templates/transfer_app/financial_information.html',
                        controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.information', {
            url: '/information',
            views: {
                'information-tab': {
                    templateUrl: 'templates/tab-information.html'
                }
            },
            authenticate: true
        })
    
        .state('tabs.user', {
            url: '/user',
            views: {
                'user-tab': {
                    templateUrl: 'templates/tab-user_detail.html'
                }
            }
        });

    $urlRouterProvider.otherwise('signin');
});