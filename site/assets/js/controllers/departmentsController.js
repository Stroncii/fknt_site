angular.module('app')
.controller('departmentsController',['$scope', '$http', 'departmentsFactory', '$sce' , function($scope, $http, departmentsFactory, $sce){
  
    function setDefaults () {
        $scope.department = {
            name_ru: 'Титул',
            name_uk: 'Тітул',   
            name_en: 'Title',
            id: ''              
        }
        $scope.mode = 'add';
    }

  function getDepartments () {
      departmentsFactory.getDepartments().then((data) => { 
        $scope.deps = data.departments;
     });
  }

  $scope.deleteDepartment = function (id) {
      departmentsFactory.deleteDepartment(id).then((data) => {
        getDepartments();
      })
  };

  $scope.addDepartment = function () {
        departmentsFactory.addDepartment($scope.department).then((data) => {
            getDepartments();
      })
  }

  $scope.editDepartment = function (dep) {
    $scope.mode = 'edit';
    $scope.department = angular.copy(dep);
  }
  
  $scope.changeDepartment = function () {
     departmentsFactory.updateDepartment($scope.department).then((data) => {
        setDefaults();
        getDepartments();
      })
  };


  getDepartments();


}])