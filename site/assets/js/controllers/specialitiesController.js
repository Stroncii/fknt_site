angular.module('app')
.controller('specialitiesController',['$scope', '$http', 'appFactory', '$routeParams', '$location' , function($scope, $http, appFactory, $routeParams, $location){
  

  $scope.type = $location.type || 'bachelor';
  $scope.activeTab = $scope.type || $routeParams.type;

  $scope.setActive = function (type) {
    $scope.activeTab = type;
  };

}])