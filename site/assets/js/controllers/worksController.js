angular.module('app')
.controller('worksController',['$scope', '$http', 'pdfFactory', '$sce' , function($scope, $http, pdfFactory, $sce){
  


  pdfFactory.getWorks().then((data) => {
      $scope.works = data;
  });


}])