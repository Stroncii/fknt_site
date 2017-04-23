angular.module('app')
.controller('plansController',['$scope', '$http', 'plansFactory', '$sce' , function($scope, $http, plansFactory, $sce){
  
    function setDefaults () {
    }

  function getPlans () {
      plansFactory.getPlans().then((data) => { 
          console.log('plans');
          console.log(data);
        $scope.plans = data;
     });
  }
  
  getPlans();


}])