angular.module('app').factory ('pdfFactory', ['$http', '$rootScope', function ($http, $rootScope) {
  var fact = {};

  fact.getSchedule = function () {
      let schedule = $http({
            method: 'GET',
            url: '/objects/schedules/read.php'
            //url: '/assets/pdf/schedule/tabs.json'
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return schedule;
  };













  // PDF-s

  fact.getWorks = function () {
      let works = $http({
            method: 'GET',
            url: '/objects/plans/read.php'
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
