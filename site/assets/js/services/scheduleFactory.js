angular.module('app').factory ('scheduleFactory', ['$http', function ($http) {
  var fact = {};

  fact.getSchedule = function () {
      let schedule = $http({
            method: 'GET',
            url: 'http://localhost:8888/assets/pdf/schedule/tabs.json'
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            console.log("Error!");
            console.log(response);
        });
    return schedule;
  };
  
  return fact;
}]);
