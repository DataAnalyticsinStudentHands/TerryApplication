/*global angular, console*/


/**
 * @ngdoc function
 * @name terry.controller:UploadController
 * @description
 * # UploadController
 * Controller for the terry
 */



angular.module('TerryControllers').controller('UploadController', function ($filter, $scope, $ionicSideMenuDelegate, $http, $timeout, $upload, $stateParams, Restangular, ngNotify) {

    'use strict';
    
    $scope.myVariables = {};
    
    Restangular.all("applications").customGET("upload", {
        applicationId: $stateParams.applicationId
    }).then(
        function (result) {
            result = Restangular.stripRestangular(result);
            $scope.myVariables.orig_fileEssay1 = $filter('filter')(result.fileName, 'essay1');
            if ($scope.myVariables.orig_fileEssay1.length !== 0) {
                $scope.myVariables.fileEssay1 = $scope.myVariables.orig_fileEssay1[0].substr(6);
            }
            $scope.myVariables.orig_fileEssay2 = $filter('filter')(result.fileName, 'essay2', 'true');
            if ($scope.myVariables.orig_fileEssay2.length !== 0) {
                $scope.myVariables.fileEssay2 = $scope.myVariables.orig_fileEssay2[0].substr(6);
            }

        },
        function (error) {
            ngNotify.set("Something went wrong retrieving uploaded file information.", {
                position: 'bottom',
                type: 'error'
            });
        }
    );


    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.usingFlash = FileAPI && FileAPI.upload !== null;
    $scope.fileReaderSupported = window.FileReader !== null && (window.FileAPI === null || FileAPI.html5 !== false);
    $scope.uploadRightAway = true;

    $scope.hasUploader = function (index) {
        return $scope.upload[index] !== null;
    };
    $scope.abort = function (index) {
        $scope.upload[index].abort();
        $scope.upload[index] = null;
    };

    $scope.onFileSelect = function ($files, param) {

        $scope.selectedFiles = [];
        $scope.progress = [];
        if ($scope.upload && $scope.upload.length > 0) {
            for (var i = 0; i < $scope.upload.length; i++) {
                if ($scope.upload[i] !== null) {
                    $scope.upload[i].abort();
                }
            }
        }
        $scope.upload = [];
        $scope.uploadResult = [];
        $scope.selectedFiles = $files;
        $scope.dataUrls = [];
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            //add essay1 or eesay2 to the file Name    
            $scope.fileName = param + $file.name;

            if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($files[i]);
                var loadFile = function (fileReader, index) {
                    fileReader.onload = function (e) {
                        $timeout(function () {
                            $scope.dataUrls[index] = e.target.result;
                        });
                    };
                }(fileReader, i);
            }
            $scope.progress[i] = -1;
            if ($scope.uploadRightAway) {
                $scope.start(i);
            }
        }
    };

    $scope.start = function (index) {
        $scope.progress[index] = 0;
        $scope.errorMsg = null;

        //$upload.upload()
        $scope.upload[index] = $upload.upload({
            url: 'http://www.housuggest.org:8888/terry/applications/upload?id=' + $stateParams.applicationId,
            //method: $scope.httpMethod,
            //headers: {'my-header': 'my-header-value'},
            data: {
                myModel: $scope.myModel,
                errorCode: $scope.generateErrorOnServer && $scope.serverErrorCode,
                errorMessage: $scope.generateErrorOnServer && $scope.serverErrorMsg
            },
            /* formDataAppender: function(fd, key, val) {
					if (angular.isArray(val)) {
                        angular.forEach(val, function(v) {
                          fd.append(key, v);
                        });
                      } else {
                        fd.append(key, val);
                      }
				}, */
            /* transformRequest: [function(val, h) {
					console.log(val, h('my-header')); return val + '-modified';
				}], */
            file: $scope.selectedFiles[index],
            fileName: $scope.fileName // to modify the name of the file(s)
            //fileFormDataName: 'myFile'
        });
        $scope.upload[index].then(function (response) {
            $timeout(function () {
                $scope.uploadResult.push(response.data);
                $scope.updateView();
            });
        }, function (response) {


            if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
        $scope.upload[index].xhr(function (xhr) {
            //				xhr.upload.addEventListener('abort', function() {console.log('abort complete')}, false);
        });



    };

    $scope.deleteFile = function (param) {
        var deleteFile;
        if (param === 'essay1') {
           deleteFile = $scope.myVariables.orig_fileEssay1;
        } else {
           deleteFile = $scope.myVariables.orig_fileEssay2;
        }

        Restangular.all("applications").all("upload").remove({"applicationId": $stateParams.applicationId, "fileName":  deleteFile}).then(

            function (result) {
                console.log(result);
                $scope.updateView();

            },
            function (error) {
                ngNotify.set("Could not delete your file on server.", {
                    position: 'bottom',
                    type: 'error'
                });
            }
        );
        

    };

    $scope.updateView = function () {
        Restangular.all("applications").customGET("upload", {
            applicationId: $stateParams.applicationId
        }).then(
            function (result) {
                result = Restangular.stripRestangular(result);
                $scope.myVariables = {};
                $scope.myVariables.orig_fileEssay1 = $filter('filter')(result.fileName, 'essay1');
                if ($scope.myVariables.orig_fileEssay1.length !== 0) {
                    $scope.myVariables.fileEssay1 = $scope.myVariables.orig_fileEssay1[0].substr(6);
                }
                $scope.myVariables.orig_fileEssay2 = $filter('filter')(result.fileName, 'essay2', 'true');
                if ($scope.myVariables.orig_fileEssay2.length !== 0) {
                    $scope.myVariables.fileEssay2 = $scope.myVariables.orig_fileEssay2[0].substr(6);
                }

            },
            function (error) {
                ngNotify.set("Something went wrong retrieving uploaded file information.", {
                    position: 'bottom',
                    type: 'error'
                });
            }
        );

    };



    $scope.success_action_redirect = $scope.success_action_redirect || window.location.protocol + "//" + window.location.host;
    $scope.jsonPolicy = $scope.jsonPolicy || '{\n  "expiration": "2020-01-01T00:00:00Z",\n  "conditions": [\n    {"bucket": "angular-file-upload"},\n    ["starts-with", "$key", ""],\n    {"acl": "private"},\n    ["starts-with", "$Content-Type", ""],\n    ["starts-with", "$filename", ""],\n    ["content-length-range", 0, 524288000]\n  ]\n}';
    $scope.acl = $scope.acl || 'private';
});