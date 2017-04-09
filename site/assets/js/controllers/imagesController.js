angular.module('app')
.controller('imagesController',['$scope', '$http', 'imagesFactory', '$sce', '$translate', '$rootScope' , function($scope, $http, imagesFactory, $sce, $translate, $rootScope){
  
 function init () {
     console.log('initialization group');
     getImages();
     $scope.files = [];
 }


 function getImages () {
     imagesFactory.getImages().then((data) => {
        $scope.images = data.images;
     });
 };

 $scope.addImage = function () {
    console.log('submit')
 };

 $scope.deleteImage = function (image) {
    imagesFactory.deleteImage(image.path).then((data)=> {
        console.log('deleted');
        console.log(data);
    }, () => {
        console.log('error')
    })
 }

 init();

}])