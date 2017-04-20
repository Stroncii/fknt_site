angular.module('app')
.controller('scheduleController',['$scope', '$http', 'pdfFactory', '$sce' , function($scope, $http, pdfFactory, $sce){
  


  function getSchedules () {
    pdfFactory.getSchedule().then((data) => {
      console.log('schedule.data');
      console.log(data);
      $scope.schedule = data;
    });
  };

  getSchedules();




}])