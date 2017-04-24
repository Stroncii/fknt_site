angular.module('app')
.controller('specialitiesController',['$scope', '$http', 'appFactory', '$routeParams', '$location', '$anchorScroll' , function($scope, $http, appFactory, $routeParams, $location, $anchorScroll){

   $scope.setActive = function (type) {
    $scope.activeTab = type;
  }; 

  
  
  $scope.type = $routeParams.type || 'bachelor';
  console.log($routeParams);
  console.log($location.hash());
    $scope.activeTab = $scope.type;
  if($routeParams.item) {
    $anchorScroll.yOffset = 150;
    $location.hash($routeParams.type + '_' + $routeParams.item);
    $anchorScroll();
  }
}]);