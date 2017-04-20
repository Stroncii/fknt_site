angular.module('app').factory ('plansFactory', ['$http', function ($http) {
  var fact = {};

  fact.getPlans = function () {
      let plans = $http({
            method: 'GET',
            url: '/objects/plans/read.php'
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return plans;
  }
  
  fact.deletePlan = function (id) {
      let plans = $http({
            method: 'DELETE',
            url: '/objects/plans/delete.php',
            data: JSON.stringify({
                id: id
            })
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return plans;
  }

  fact.addPlan = function (department) {
      let plans = $http({
            method: 'POST',
            url: '/objects/plans/create.php',
            data: JSON.stringify(department)
        }).then(function successCallback(response) {
            console.log('add');
            console.log(response);
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return plans;
  }

  fact.updatePlan = function (department) {
      let plans = $http({
            method: 'UPDATE',
            url: '/objects/plans/update.php',
            data: JSON.stringify(department)
        }).then(function successCallback(response) {
            console.log('update');
            console.log(response);
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return plans;
  }

  return fact;
}]);
