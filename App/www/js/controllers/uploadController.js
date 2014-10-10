/*global angular, console*/


/**
 * @ngdoc function
 * @name terry.controller:UploadController
 * @description
 * # UploadController
 * Controller for the terry
 */

var uploadUrl = (window.location.protocol || 'http:') + '//www.housuggest.org:8888/terry/applications/upload?id=18';
window.uploadUrl = window.uploadUrl || 'upload';

angular.module('TerryControllers').controller('UploadController', function ($scope, $ionicSideMenuDelegate, $http, $timeout, $upload) {

    'use strict';

    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
    
    $scope.documents = {};
    
    $scope.fileName = 'essay1';
    
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
            
            if ($file.type === 'application/pdf')
                $scope.fileName = param + '.pdf';
            else
                $scope.fileName = param + '.doc';
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
            url: 'http://www.housuggest.org:8888/terry/applications/upload?id=18',
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




    
    $scope.success_action_redirect = $scope.success_action_redirect || window.location.protocol + "//" + window.location.host;
    $scope.jsonPolicy = $scope.jsonPolicy || '{\n  "expiration": "2020-01-01T00:00:00Z",\n  "conditions": [\n    {"bucket": "angular-file-upload"},\n    ["starts-with", "$key", ""],\n    {"acl": "private"},\n    ["starts-with", "$Content-Type", ""],\n    ["starts-with", "$filename", ""],\n    ["content-length-range", 0, 524288000]\n  ]\n}';
    $scope.acl = $scope.acl || 'private';
});