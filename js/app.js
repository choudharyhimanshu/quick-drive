'use strict';

var app = angular.module('quickDrive', ['angularFileUpload']);

app.controller('UploadController', ['$rootScope','$scope','$http','FileUploader', function($rootScope,$scope,$http,FileUploader){
	$scope.share_directory = 'public';
	$scope.uploader = new FileUploader({
		url: 'script/upload.php'
	});
	$scope.uploader.onBeforeUploadItem = function(item) {
	    item.formData.push({
	    	directory: $scope.share_directory
	    });
	};
	$scope.uploader.onCompleteItem = function(item, response, status, headers) {
		if(response.status == 200){
			item.status = true;
			$scope.upload_status = true;
		}
		else {
			item.status = false;
			$scope.upload_status = false;
		}
		$scope.error_message = response.message;
	};
}]);