angular.module('app').factory ('departmentsFactory', ['$http', function ($http) {
  var fact = {};

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
  
  fact.deleteDepartment = function (id) {
      let deps = $http({
            method: 'DELETE',
            url: '/objects/departments/delete.php',
            data: JSON.stringify({
                id: id
            })
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return deps;
  }

  fact.addDepartment = function (department) {
      let deps = $http({
            method: 'POST',
            url: '/objects/departments/create.php',
            data: JSON.stringify(department)
        }).then(function successCallback(response) {
            console.log('add');
            console.log(response);
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return deps;
  }

  fact.updateDepartment = function (department) {
      let deps = $http({
            method: 'UPDATE',
            url: '/objects/departments/update.php',
            data: JSON.stringify(department)
        }).then(function successCallback(response) {
            console.log('update');
            console.log(response);
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return deps;
  }

  return fact;
}]);
