angular.module('app').factory ('appFactory', ['$http', function ($http) {
  var fact = {};

  fact.corp = 4;

  fact.getNews = function () {
    return jsonA;
  };

  fact.getLastNews = function (){
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