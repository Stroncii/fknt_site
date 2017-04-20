angular.module('app').factory ('pdfFactory', ['$http', function ($http) {
  var fact = {};

  fact.getSchedule = function () {
      let schedule = $http({
            method: 'GET',
            url: '/assets/pdf/schedule/tabs.json'
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return schedule;
  };

  fact.getWorks = function () {
      let works = $http({
            method: 'GET',
            url: '/assets/pdf/plans/tabs.json'
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return works;
  };

  fact.getDepartments = function () {
      let deps = $http({
            method: 'GET',
            url: '/objects/departments/read.php'
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return deps;
  }
  
  return fact;
}]);
