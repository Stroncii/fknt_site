angular.module('app')
.controller('scheduleController',['$scope', '$http', 'pdfFactory', '$sce' , function($scope, $http, pdfFactory, $sce){
  
  function getDefaults () {
    $scope.mode = 'add';
    $scope.editedGroup = {
      uk: '',
      en: '',
      ru: '',      
    }
    getSchedules();
  }

  function getSchedules () {
    pdfFactory.getSchedule().then((data) => {
      $scope.schedule = data;
      $scope.editedGroup.id = data[0].department_id;
    });
  };
  
  getDefaults();

  $scope.editPill = function (pill) {
    console.log(pill);
    $scope.editedGroup = angular.copy(pill.group);
    $scope.mode = 'edit';
  };


  $scope.setActive = function (id) {
    $scope.editedGroup.id = id;
    console.log($scope.editedGroup);
  };

  $scope.cancel = function () {
    $scope.mode = 'add';
    getDefaults();
  };

  $scope.add = function () {

  };





        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });

        // FILTERS
      
        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                console.log('syncFilter');
                return this.queue.length < 10;
            }
        });
      
        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });



}])