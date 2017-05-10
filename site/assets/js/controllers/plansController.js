angular.module('app')
.controller('plansController',['$scope', '$http', 'plansFactory', '$sce', 'FileUploader' , function($scope, $http, plansFactory, $sce, FileUploader){
  
  function setDefaults () {
    $scope.mode = 'add';
    $scope.saved = false;
    $scope.editedPlan = {
      uk: '',
      en: '',
      ru: '',      
    }
    getPlans();
  }

  function getPlans () {
      plansFactory.getPlans().then((data) => { 
        $scope.plans = data;
        $scope.current_dep_id = data[0].department_id;
     });
  }

  setDefaults();

  $scope.editPill = function (pill) {
    $scope.uploader.url = '/objects/plans/update.php'
    $scope.saved = true;
    $scope.editedPlan = angular.copy(pill.group);
    $scope.current_grop_id = pill.group_id;
    $scope.mode = 'edit';
  };

  $scope.deletePill = function (pill) {
    plansFactory.deletePlan(pill).then(() => {
      setDefaults();
    });
  }


  $scope.setActive = function (id) {
    $scope.current_dep_id = id;
  };

  $scope.cancel = function () {
    $scope.mode = 'add';
    setDefaults();
  };

  $scope.add = function () {
    $scope.saved = true;
    $scope.uploader.url = '/objects/plans/create.php';
    $scope.uploader.formData = [{
      department_id: $scope.current_dep_id,
      title_uk: $scope.editedPlan.uk,
      title_en: $scope.editedPlan.en,
      title_ru: $scope.editedPlan.ru      
    }];
  };

  $scope.change = function () {
    $scope.saved = true;
    plansFactory.updatePlan($scope.editedPlan, $scope.current_dep_id, $scope.current_grop_id).then((data) => {
      setDefaults();
    })
  };

  $scope.updatePosition = function (event, ui) {
    let positions = [];
    let index = $scope.plans.findIndex((item) => {
      if (item.department_id == $scope.current_dep_id) return true;
    })
    $scope.plans[index].pills.map((item, index) => {
        positions.push(item.group_id);
    })
    plansFactory.updatePositions(positions).then((data) => {
    }); 
    
  }

  $scope.somethingChanged = function () {
    $scope.saved = false;
  };




        var uploader = $scope.uploader = new FileUploader({
            url: '/objects/plans/create.php'
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
                title_uk: $scope.editedPlan.uk,
                title_en: $scope.editedPlan.en,
                title_ru: $scope.editedPlan.ru,
                id: $scope.current_grop_id      
            }];
            }
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            uploader.clearQueue();
            setDefaults();
        };
      
        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
                setTimeout(deferred.resolve, 1e3);
            }
        });





}])