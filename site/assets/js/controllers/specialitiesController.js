angular.module('app')
.controller('specialitiesController',['$scope', '$http', 'appFactory', '$routeParams', '$location' , function($scope, $http, appFactory, $routeParams, $location){
  

  console.log('specialo4ka');
  console.log($routeParams);

  $scope.activeTab = $routeParams.type;


}])