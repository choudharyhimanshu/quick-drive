'use strict';

var app = angular.module('quickDrive', ['angularFileUpload']);

app.factory('FetchDirectory', ['$http', function($http){
	return {
		getContent : function(dir_name){
			return $http({
			    url: 'script/fetch_directory.php', 
			    method: "GET",
			    params: {directory : dir_name}
			});
		}
	}
}])

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

app.controller('ViewDirectoryController', ['$scope','FetchDirectory', function($scope,FetchDirectory){
	$scope.loading_files = false;
	$scope.directory_data = null;
	$scope.goToDirectory = function(dir){
		$scope.loading_files = true;
		$scope.directory_data = null;
		FetchDirectory.getContent(dir).success(function(response){
			$scope.directory_data = response;
			$scope.loading_files = false;
		});
	};
}]);