angular.module('app')
.controller('scheduleController',['$scope', '$http', 'pdfFactory', '$sce' , function($scope, $http, pdfFactory, $sce){
  
  function getDefaults () {
    $scope.editedGroup = {
      name_uk: '',
      name_en: '',
      name_ru: ''
    }
    getSchedules();
  }

  function getSchedules () {
    pdfFactory.getSchedule().then((data) => {
      console.log('schedule.data');
      console.log(data);
      $scope.schedule = data;
    });
  };


  $scope.editPill = function (pill) {
    console.log(pill);
  };




}])