angular.module('app')
.controller('imagesController',['$scope', '$http', 'imagesFactory', '$sce', '$translate', '$rootScope', 'FileUploader', 'appFactory', function($scope, $http, imagesFactory, $sce, $translate, $rootScope, FileUploader, appFactory){
  
 function init () {
     console.log('initialization group');
     getImages();
     getUnusedImages();
     $scope.mode = 'add';
     $scope.choose = {
         mode: 'choose',
         id: "" 
     };
     appFactory.getNews($rootScope.language).then(function(data) {
        console.log(data);
        $scope.news = data.news;
        
    });
 }

 $scope.changeMode = function(type) {
     console.log('change');
     $scope.mode = type;
 }


 function getImages () {
     imagesFactory.getImages().then((data) => {
        console.log(data);
        $scope.images = data.images;
     });
 };

 function getUnusedImages () {
     imagesFactory.getUnusedImages().then((data) => {
         console.log('unused');
         console.log(data);
        $scope.unused = data.images;
     });
 };

 $scope.editNewsImages = function (id) {
     console.log(id);
     $scope.choose.mode = 'edit';
     $scope.choose.id = id;
     getUnusedImages();
     appFactory.getOneNewsItem(id, 'ru').then((data) => {
        $scope.choose.item = data;
        console.log(data);
     });
 };

 $scope.deleteImageFromNews = function (path) {
   imagesFactory.updateImage(path, "").then((data)=> {
        console.log('deleted from news');
        console.log(data);
    }, () => {
        console.log('error')
    });

 };

 $scope.addImageToNews = function (image) {
     console.log(image);
   imagesFactory.updateImage(image.path, $scope.choose.id).then((data)=> {
        console.log('deleted from news');
        console.log(data);
    }, () => {
        console.log('error')
    });
};

 $scope.deleteImage = function (image) {
    imagesFactory.deleteImage(image.path).then((data)=> {
        console.log('deleted');
        console.log(data);
    }, () => {
        console.log('error')
    });
 };

 $scope.cancelNewsImageEdit = function () {
    $scope.choose.mode = 'choose';
 };

 init();

 var uploader = $scope.uploader = new FileUploader({
            url: '/objects/images/create.php'
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