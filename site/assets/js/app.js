var app = angular.module('app', ['ngRoute', 'ngSanitize', 'pascalprecht.translate'])
  .config( ['$routeProvider', '$locationProvider', '$translateProvider', function($routeProvider, $locationProvider, $translateProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/main.html'
  })
  .when ('/history', {
      templateUrl: 'templates/history.html'
  })
  .when('/news', {
    templateUrl: 'templates/news.html'
  })
  .when('/admin', {
    templateUrl: 'templates/admin.html'
  })
  .when('/dean', {
    templateUrl: 'templates/dean.html'
  })
  .when('/pmi', {
    templateUrl: 'templates/pmi.html'
  })
  .when('/kn', {
    templateUrl: 'templates/kn.html'
  })
  .when('/ki',{
    controller : function(){
        window.location.replace('/ki/');
    }, 
    template : "<div></div>"
  })
  .when('/philosophy', {
    templateUrl: 'templates/philosophy.html'
  })
  .when('/schedule', {
    templateUrl: 'templates/schedule.html',
    controller: 'scheduleController'
  })
  .when('/consultations', {
    templateUrl: 'templates/consultations.html'
  })
  .when('/process', {
    templateUrl: 'templates/process.html'
  })
  .when('/plans', {
    templateUrl: 'templates/plans.html',
    controller: 'worksController'
  })
  .when('/organizations', {
    templateUrl: 'templates/organizations.html'
  })
  .when('/documents', {
    templateUrl: 'templates/documents.html'
  })
  .when('/specialties', {
    templateUrl: 'templates/specialties.html'
  })
  .when('/specialties/:type', {
    templateUrl: 'templates/specialties.html',
    controller: 'specialitiesController'
  })
  .when('/cooperation', {
    templateUrl: 'templates/cooperation.html'
  })
  .when('/aspirantur', {
    templateUrl: 'templates/aspirantur.html'
  })
  .when('/contacts', {
    templateUrl: 'templates/contacts.html'
  })
  .when('/news/:id', {
    templateUrl: 'templates/news-item.html',
    controller: 'oneNewsController'
  })
  .when('/error', {
    templateUrl: 'templates/error.html'
  })
  .otherwise('/error');






  $translateProvider.translations('ua', {
    'TITLE': 'Факультет комп\'ютерних наук і технологій',
    'HISTORY': 'Історія',
    'NEWS': 'Новини',
    'STRUCTURE': 'Структура',
    'STUDENTS': 'Студенту',
    'ABITURIENTS': 'Абітурієнту',
    'SCIENCE': 'Наука та співробітництво',
    'CONTACTS': 'Контакти',
    'DEAN': 'Деканат',
    'KI': 'Комп\'ютерна інженерія',
    'KI_FACULTY': 'Кафедра комп\'ютерних наук і технологій',
    'PMI': 'Прикладна математика та інформатика',
    'PMI_FACULTY': 'Кафедра прикладної математики та інформатики',
    'KN': 'Комп\'ютерні науки',
    'KN_FACULTY': 'Кафедра комп\'ютерних наук',
    'PHILOSOPHY': 'Філософія',
    'PHILOSOPHY_FACULTY': 'Кафедра філософії',
    'SCHEDULE': 'Розклад занять',
    'PLANS': 'Робочі плани',
    'CONSULTATIONS': 'Графік консультацій',
    'GRAPHICS': 'Графік навчального процесу',
    'ORGANIZATIONS': 'Студентські організації',
    'DOCUMENTS': 'Документи',
    'PORTAL': 'Портал абітурієнта',
    'SPECIALTIES': 'Спеціальності',
    'ASPIRANTUR_TITLE': 'Аспірантура',
    'INTERNATIONAL': 'Міжнародна співпраця',
    'BACHELOR': 'Даний рівень освіти дозволяє отримати базову вищу освіту та успішно реалізуватися у кар\'єрному плані',
    'BACHELOR_TITLE': 'Бакалавріат',
    'MASTER': 'Рівень освіти, на которому студент має можливість не тільки стати першокласним спеціалістом, але і займатися наукою та викладацькою діяльністю.',
    'MASTER_TITLE': 'Магістратура',
    'ASPIRANTUR': 'Аспірантура - це вибір людей, котрі ніколи не зупиняються на досягнутому! Адже немає межі для досконалості',
    'LEVELS_TITLE': 'Рівні освіти',
    'LEVELS': 'Рівні освіти, яких можуть досягти студенти, котрі навчаються на факультеті комп\'ютерних наук та технологій',
    'ONE_NEWS_BUTTON': 'Докладніше',
    'ALL_NEWS': 'Усі новини',
    'FOO': 'Деканат ФКНТ'
  });
 
  $translateProvider.translations('ru', {
    'TITLE': 'Факультет компьютерных наук и технологий',
    'HISTORY': 'История',
    'NEWS': 'Новости',
    'STRUCTURE': 'Структура',
    'STUDENTS': 'Студенту',
    'ABITORIENTS': 'Абитуриенту',
    'SCIENCE': 'Наука и сотрудничество',
    'CONTACTS': 'Контакты',
    'DEAN': 'Деканат',
    'KI': 'Компьютерная инженерия',
    'PMI': 'Прикладная математика и информатика',
    'KN': 'Компьютерные науки',
    'PHILOSOPHY': 'Философия',
    'SCHEDULE': 'РАсписание занятий',
    'PLANS': 'Рабочие планы',
    'CONSULTATIONS': 'График консультаций',
    'GRAPHICS': 'График учебного процесса',
    'ORGANIZATIONS': 'Студенческие организации',
    'DOCUMENTS': 'Документы',
    'PORTAL': 'Портал абитуриента',
    'SPECIALTIES': 'Специальности',
    'ASPIRANTUR_TITLE': 'Аспирантура',
    'INTERNATIONAL': 'Международное сотрудничество',
    'BACHELOR': 'Данный уровень образования позволяет получить базовое высшее образование и успешно развиваться в карьерном плане',
    'BACHELOR_TITLE': 'Бакалаврат',
    'MASTER': 'Уровень образования, при котором студент имеет возможность не только стать первоклассным специалистом, но и заниматься наукой и преподавательской деятельностью',
    'MASTER_TITLE': 'Магистратура',
    'ASPIRANTUR': 'Аспирантура - выбор людей, которые никогда не останавливаются на достигнутом! Ведь нет предела совершенству',
    'LEVELS_TITLE': 'Уровни образования',
    'LEVELS': 'Уровни образования, которых могут достичь студенты, обучающиеся на факультете компьютерных наук и технологий',
    'MAIN_NEWS_BUTTON': 'Подробнее...',
    'ALL_NEWS': 'Все новости',
    'FOO': 'Деканат ФКНТ'
  });

  $translateProvider.preferredLanguage('ua');


    // use the HTML5 History API
    $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
    }); 
}]);

app.run(function($rootScope, $location, $anchorScroll) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    console.log("change");
   // if($location.hash()) $anchorScroll();  
  });
});

  
