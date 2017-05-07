angular.module('app').factory ('plansFactory', ['$http', function ($http) {
  var fact = {};

  fact.getPlans = function () {
      let plans = $http({
            method: 'GET',
            url: '/objects/plans/read.php'
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return plans;
  }
  
  fact.deletePlan = function (item) {
      let plans = $http({
            method: 'DELETE',
            url: '/objects/plans/delete.php',
            data: JSON.stringify({
                id: item.group_id,
                pdf: item.pdf
            })
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return plans;
  }

  fact.addPlan = function (department) {
      let plans = $http({
            method: 'POST',
            url: '/objects/plans/create.php',
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
            console.log('add');
            console.log(response);
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return plans;
  }

  fact.updatePlan = function (item, dep_id, group_id) {
      let plans = $http({
            method: 'POST',
            url: '/objects/plans/update.php',
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
            console.log('update');
            console.log(response);
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return plans;
  }

    fact.updatePositions = function (item) {
        let plan = $http({
                method: 'PUT',
                url: '/objects/plans/update_positions.php',
                data: JSON.stringify(item)
            }).then(function successCallback(response) {
                console.log(response);       
                return response.data;
            }, function errorCallback(response) {
                console.log(response);
            });
        return plan;
    };


  return fact;
}]);
