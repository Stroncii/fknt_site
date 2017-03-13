angular.module('app').factory ('appFactory', ['$http', function ($http) {
  var fact = {};

  fact.corp = 4;

  fact.getOneNewsItem = function (id) {
      console.log(`Hey! Our Id is ${id}`);
    $http({
            method: 'GET',
            url: 'http://localhost:8888/news/read.php/' + id
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log("Error!");
            console.log(response);
        });

        return 1;
  }

  fact.getNews = function () {
      $http({
            method: 'GET',
            url: 'http://localhost:8888/news/read.php'
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log("Error!");
            console.log(response);
        });
    return jsonA;
  };

  fact.getLastNews = function (){
      $http({
            method: 'GET',
            url: 'http://localhost:8888/news/read_last.php'
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log("Error!");
            console.log(response);
        });
    return jsonA.slice(-4);
  }
  
  return fact;
}]);


var jsonA = [{
    "title": "<h3>Some Title</h3>",
    "synopsis": "<ul><li>blah-blah</li></ul>",
    "text": "blah-blah-blah"
}, {
    "title": "some title",
    "text": "news 1"
}, {
    "title": "some title",
    "text": "news 2"
}, {
    "title": "some title",
    "text": "news 3"
}];