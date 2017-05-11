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
        });
    return schedule;
  };

  fact.updateSchedule = function (item, dep_id, group_id) {
    let schedule = $http({
            method: 'POST',
            url: '/objects/schedules/update.php',
            //url: '/assets/pdf/schedule/tabs.json'
            data: JSON.stringify({
                formData: [{
                    department_id: dep_id,
                    title_uk: item.uk,
                    title_en: item.en,
                    title_ru: item.ru,    
                    id: group_id  
                }]
            })
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
        });
    return schedule;
  };

fact.deleteSchedule = function (item) {
    let schedule = $http({
            method: 'DELETE',
            url: '/objects/schedules/delete.php',
            //url: '/assets/pdf/schedule/tabs.json'
            data: JSON.stringify({
                id: item.group_id,
                pdf: item.pdf
            })
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
        });
    return schedule;
  };
  

  fact.updatePositions = function (item) {
    let schedule = $http({
            method: 'PUT',
            url: '/objects/schedules/update_positions.php',
            data: JSON.stringify(item)
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
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
        });
    return deps;
  }
  
  return fact;
}]);
