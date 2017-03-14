angular.module('app')
.controller('worksController',['$scope', '$http', 'pdfFactory', '$sce' , function($scope, $http, pdfFactory, $sce){
  
    console.log('booo');

  pdfFactory.getWorks().then((data) => {
      $scope.works = data;
      console.log($scope);
  });


}])