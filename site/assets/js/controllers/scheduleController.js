angular.module('app')
.controller('scheduleController',['$scope', '$http', 'scheduleFactory', '$sce' , function($scope, $http, scheduleFactory, $sce){
  
    

  scheduleFactory.getSchedule().then((data) => {
      $scope.schedule = data;
      console.log($scope.schedule);
  });


}])