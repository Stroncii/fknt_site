angular.module('app').factory ('pdfFactory', ['$http', function ($http) {
  var fact = {};

  fact.getSchedule = function () {
      let schedule = $http({
            method: 'GET',
            url: 'http://fknt.donntu.edu.ua/assets/pdf/schedule/tabs.json'
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
            url: 'http://fknt.donntu.edu.ua/assets/pdf/plans/tabs.json'
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return works;
  };
  
  return fact;
}]);
