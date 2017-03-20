angular.module('app')
.controller('specialitiesController',['$scope', '$http', 'appFactory', '$routeParams', '$location' , function($scope, $http, appFactory, $routeParams, $location){

   $scope.setActive = function (type) {
    $scope.activeTab = type;
  }; 

  
  
  $scope.type = $routeParams.type || 'bachelor';
  $scope.activeTab = $scope.type;
}]);