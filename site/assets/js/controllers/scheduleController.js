angular.module('app')
.controller('scheduleController',['$scope', '$http', 'pdfFactory', '$sce' , function($scope, $http, pdfFactory, $sce){
  


  pdfFactory.getSchedule().then((data) => {
      $scope.schedule = data;
      //console.log($scope.schedule);
  });


}])