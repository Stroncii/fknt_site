angular.module('app').factory ('appFactory', ['$http', function ($http) {
  var fact = {};

  fact.corp = 4;

  fact.getOneNewsItem = function (id, language) {
      //console.log(`Hey! Our Id is ${id}`);
        return $http({
            method: 'GET',
            url: '/objects/news/read_one.php?language=' + language + '&id=' + id
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
        });
  }

  fact.getFullNews = function (id) {
      let news = $http({
            method: 'GET',
            url: '/objects/news/read_full.php?id=' + id
        }).then(function successCallback(response) { 
            console.log(`What does we have here? Id is ${id}`); 
            return response.data;
        }, function errorCallback(response) {
            console.log('ERROR!');
            console.log(response);
        });
    return news;
  };

  fact.getNews = function (language) {
      console.log(`What language is it ${language}`);
      let news = $http({
            method: 'GET',
            url: '/objects/news/read.php?language=' + language
        }).then(function successCallback(response) {         
            return response.data;
        }, function errorCallback(response) {
        });
    return news;
  };

  fact.getLastNews = function (language){
      let lastNews = $http({
            method: 'GET',
            url: '/objects/news/read_last.php?language=' + language
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
        });
    return lastNews;
  };
  
  return fact;
}]);
