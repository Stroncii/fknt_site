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
      $scope.current_dep_id = data[0].department_id;
    });
  };
  
  getDefaults();

  $scope.editPill = function (pill) {
    $scope.uploader.url = '/objects/schedules/update.php'
    $scope.saved = true;
    $scope.editedGroup = angular.copy(pill.group);
    $scope.current_grop_id = pill.group_id;
    $scope.mode = 'edit';
  };

  $scope.deletePill = function (pill) {
    pdfFactory.deleteSchedule(pill).then(() => {
      getDefaults();
    });
  }


  $scope.setActive = function (id) {
    $scope.current_dep_id = id;
  };

  $scope.cancel = function () {
    $scope.mode = 'add';
    getDefaults();
  };

  $scope.add = function () {
    $scope.saved = true;
    $scope.uploader.url = '/objects/schedules/create.php';
    $scope.uploader.formData = [{
      department_id: $scope.current_dep_id,
      title_uk: $scope.editedGroup.uk,
      title_en: $scope.editedGroup.en,
      title_ru: $scope.editedGroup.ru      
    }];
  };

  $scope.change = function () {
    $scope.saved = true;
    pdfFactory.updateSchedule($scope.editedGroup, $scope.current_dep_id, $scope.current_grop_id).then((data) => {
      getDefaults();
    })
  };

  $scope.somethingChanged = function () {
    $scope.saved = false;
  };

  $scope.updatePosition = function (event, ui) {
    let positions = [];
    let index = $scope.schedule.findIndex((item) => {
      if (item.department_id == $scope.current_dep_id) return true;
    })
    $scope.schedule[index].pills.map((item, index) => {
        positions.push(item.group_id);
    })
    pdfFactory.updatePositions(positions).then((data) => {
    }); 
    
  }




        var uploader = $scope.uploader = new FileUploader({
            url: '/objects/schedules/create.php'
        });

        // FILTERS
      
        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });
        uploader.onBeforeUploadItem = function(item) {
          if ($scope.mode = 'edit') {
              item.formData = [{
                department_id: $scope.current_dep_id,
                title_uk: $scope.editedGroup.uk,
                title_en: $scope.editedGroup.en,
                title_ru: $scope.editedGroup.ru,
                id: $scope.current_grop_id      
            }];
            }
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            uploader.clearQueue();
            getDefaults();
        };
      
        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
                setTimeout(deferred.resolve, 1e3);
            }
        });



}])