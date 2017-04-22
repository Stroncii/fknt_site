angular.module('app')
.controller('coversController',['$scope', '$http', 'imagesFactory', '$sce', '$translate', '$rootScope', 'FileUploader', 'appFactory', 'coversFactory', function($scope, $http, imagesFactory, $sce, $translate, $rootScope, FileUploader, appFactory, coversFactory){
  
 function init () {
     $scope.cover_type = 'full';
     console.log('covers');
     $scope.mode = 'choose';
     $scope.editedItem = {};
    appFactory.getNews($rootScope.language).then(function(data) {
        $scope.news = data.news;
    });
 }

 $scope.editNewsItem = function (item) {
     $scope.uploader.formData = [{
               news_id: $scope.editedItem.id
     }]
     $scope.editedItem = angular.copy (item);
     $scope.mode = 'edit';
     console.log('edit ' + item.id);
 }

 $scope.cancel = function () {
     init ();
 }

 $scope.deleteSmallCover = function () {
    coversFactory.deleteSmallCover($scope.editedItem.id).then((data) => {
        console.log(data);
    });
 }

 $scope.deleteFullCover = function () {
    coversFactory.deleteFullCover($scope.editedItem.id).then((data) => {
        console.log(data);
    });
 }

 $scope.changeType = (type) => {
        $scope.cover_type = type;
        console.log(type);
        if ($scope.cover_type == 'full') {
            $scope.uploader.url = '/objects/news/full_cover.php'
        } else {
            $scope.uploader.url = '/objects/news/small_cover.php'
        }
        $scope.uploader.formData = [{
            news_id: $scope.editedItem.id
        }]
 };

 
 init();

 var uploader = $scope.uploader = new FileUploader({
            url: '/objects/news/full_cover.php',
        });

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };


}])