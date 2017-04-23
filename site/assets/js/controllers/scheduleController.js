angular.module('app')
.controller('scheduleController',['$scope', '$http', 'pdfFactory', '$sce', 'FileUploader' , function($scope, $http, pdfFactory, $sce, FileUploader){
  
  function getDefaults () {
    $scope.mode = 'add';
    $scope.saved = false;
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
    $scope.saved = false;
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
    $scope.saved = true;
    $scope.uploader.url = '/objects/schedules/create.php';
    $scope.uploader.formData = [{
      department_id: $scope.editedGroup.id,
      title_uk: $scope.editedGroup.uk,
      title_en: $scope.editedGroup.en,
      title_ru: $scope.editedGroup.ru,      
    }];
    console.log($scope.uploader);
  };

  $scope.somethingChanged = function () {
    $scope.saved = false;
  }




        var uploader = $scope.uploader = new FileUploader({
            url: '/objects/schedules/create.php'
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