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
    // HEADERS

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
    'KI_FACULTY': 'Кафедра комп\'ютерної інженерії',
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
    'FOO': 'Деканат ФКНТ',


     // HISTORY
    'ET_FACULTY_TITLE': 'Електротехнічний факультет',
    'ET_FACULTY': 'У 1959 році в Донецькому індустріальному інституті був створений електротехнічний факультет, першим деканом якого став Матвій Борисович Шумяцкий (1912-1994). За його ініціативи та за його активної участі багато що було зроблено для створення майбутнього факультету обчислювальної техніки та інформатики.',
    'FIRST_LAB_TITLE': 'Перша лабораторна робота по курсу "Математичні машини і програмування”',
    'FIRST_LAB': 'Важливою віхою в історії факультету та інституту явився 1961 рік, коли для студентів усіх спеціальностей інституту почав читатися курс “Математичні машини і програмування”, підготовку якого здійснили доцент С.Г. Буачідзе та асистенти В.І. Назаренко і В.А. Святний. Придбання в цьому ж році обчислювальної машини “Мінськ-12” поклало початок обчислювальному центру ДПІ.',
    'FIRST_SCIENCE_TITLE': 'Перша науково-дослідна робота в галузі інформатики',
    'FIRST_SCIENCE': 'У 1962 р. була виконана перша науково-дослідна робота в галузі інформатики по створенню систем управління із застосуванням керуючих ЕОМ.',
    'CT_CAF_TITLE': 'Кафедра обчислювальної техніки',
    'CT_CAF': 'У 1963 р була створена кафедра обчислювальної техніки (ОТ), яку очолив доцент Л.П. Фельдман. У 1965 р на цій кафедрі була відкрита спеціальність “Математичні лічильно-вирішальні прилади та пристрої”, а в 1971 р – “Прикладна математика”.',
    'CTAI_FACULTY_TITLE': 'Факультет обчислювальної техніки та автоматизованих систем управління',
    'CTAI_FACULTY': 'У зв’язку з відкриттям нових спеціальностей і швидким збільшенням чисельності студентів у 1972 р електротехнічний факультет був розділений на два – енергетичний та факультет обчислювальної техніки та автоматизованих систем управління (ФОТ і АСУ). Деканом ФОТ і АСУ був обраний В.А. Святний. У складі цього факультету були випускаючі кафедри: обчислювальної техніки, АСУ, автоматики і телемеханіки. У 1974 р для підготовки спеціальності “Прикладна математика” створена кафедра прикладної математики на чолі з професором, доктором фізико-математичних наук Є.І. Харламовою. У 1975 р кафедра ОТ була переіменована в кафедру ЕОМ, а для підготовки студентів усіх спеціальностей інституту в галузі інформаційних технологій була створена кафедра обчислювальної техніки в інженерних економічних розрахунках.',
    'CT_FACULTY_TITLE': 'Факультет обчислювальної техніки',
    'CT_FACULTY': 'У 1977 р на базі єдиного факультету “ОТ і АСУ” створюється два нових: факультет ОТ і факультет АСУ. Деканом факультету ОТ став В.І. Калашников, якого з 1981 р змінив професор кафедри ЕОМ В.А. Святний.',
    'CTI_FACULTY_TITLE': 'Факультет обчислювальної техніки і інформатики',
    'CTI_FACULTY': 'У 1992 р факультет ОТ переіменований у факультет обчислювальної техніки і інформатики, а кафедра ОТ і ІЕР перейменована у кафедру обчислювальної математики і програмування. У 1994 р на факультеті був відкритий прийом на спеціальність “Інформаційні системи в менеджменті”, замість якої за переліком 1997 в 1998 р відкрито прийом за спеціальністю “Економічна кібернетика”. У 1999 році вперше розпочато прийом на спеціальність “Системне програмування”.',
    'CST_FACULTY': 'Факультет ОТІ перейменований у факультет комп’ютерних наук і технологій.',

    // NEWS
    'NEWS_BUTTON': 'Далі',
  });
 
  $translateProvider.translations('ru', {

    // HEADERS

    'TITLE': 'Факультет компьютерных наук и технологий',
    'HISTORY': 'История',
    'NEWS': 'Новости',
    'STRUCTURE': 'Структура',
    'STUDENTS': 'Студенту',
    'ABITURIENTS': 'Абитуриенту',
    'SCIENCE': 'Наука и сотрудничество',
    'CONTACTS': 'Контакты',
    'DEAN': 'Деканат',
    'KI': 'Компьютерная инженерия',
    'KI_FACULTY': 'Кафедра компьютерной инженерии',    
    'PMI': 'Прикладная математика и информатика',
    'PMI_FACULTY': 'Кафедра прикладной математики и информатики',
    'KN': 'Компьютерные науки',
    'KN_FACULTY': 'Кафедра компьютерных наук',
    'PHILOSOPHY': 'Философия',
    'PHILOSOPHY_FACULTY': 'Кафедра философии',
    'SCHEDULE': 'Расписание занятий',
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
    'ONE_NEWS_BUTTON': 'Подробнее...',
    'ALL_NEWS': 'Все новости',
    'FOO': 'Деканат ФКНТ',

    // HISTORY
    'ET_FACULTY_TITLE': 'Электротехнический факультет',
    'ET_FACULTY': 'В 1959 году в Донецком индустриальном институте был создан электротехнический факультет, первым деканом которого стал Матвей Борисович Шумяцкий (1912-1994). По его инициативе и при его активном участии многое было сделано для создания будущего факультета вычислительной техники и информатики.',
    'FIRST_LAB_TITLE': 'Первая лабораторная работа по курсу "Математические машины и устройства"',
    'FIRST_LAB': 'Важной вехой в истории факультета и института явился 1961 год, когда для студентов всех специальностей института начал читаться курс "Математические машины и программирование", подготовку которого осуществили доцент С. Буачидзе и ассистенты В.И. Назаренко и В.А. Святный. Приобретение в этом же году вычислительной машины "Минск-12" положило начало вычислительному центру ДПИ.',
    'FIRST_SCIENCE_TITLE': 'Первая научно-исследовательская работа в области информатики',
    'FIRST_SCIENCE': 'В 1962 г. была выполнена первая научно-исследовательская работа в области информатики по созданию систем управления с применением управляющих ЭВМ.',
    'CT_CAF_TITLE': 'Кафедра вычислительной техники',
    'CT_CAF': 'В 1963 г. была создана кафедра вычислительной техники (ВТ), которую возглавил доцент Л.П. Фельдман. В 1965 г. на этой кафедре была открыта специальность "Математические счетно-решающие приборы и устройства", а в 1971 г. - "Прикладная математика".',
    'CTAI_FACULTY_TITLE': 'Факультет вычислительной техники и автоматизированных систем управления',
    'CTAI_FACULTY': 'В связи с открытием новых специальностей и быстрым увеличением численности студентов в 1972 г. электротехнический факультет был разделен на два - энергетический и факультет вычислительной техники и автоматизированных систем управления (ФВТ и АСУ). Деканом ФВТ и АСУ был избран В.А. Святный. В составе этого факультета были выпускающие кафедры: вычислительной техники, АСУ, автоматики и телемеханики. В 1974 г. для подготовки специальности "Прикладная математика" создана кафедра прикладной математики во главе с профессором, доктором физико-математических наук Е.И. Харламовой. В 1975 г. кафедра ВТ была переименована в кафедру ЭВМ, а для подготовки студентов всех специальностей института в области информационных технологий была создана кафедра вычислительной техники в инженерных экономических расчетах.',
    'CT_FACULTY_TITLE': 'Факультет вычислительной техники',
    'CT_FACULTY': 'В 1977 г. на базе единого факультета "ВТ и АСУ" создается два новых: факультет ВТ и факультет АСУ. Деканом факультета ВТ стал В.И. Калашников, которого с 1981 г. сменил профессор кафедры ЭВМ В.А. Святный.',
    'CTI_FACULTY_TITLE': 'Факультет вычислительной техники и информатики',
    'CTI_FACULTY': 'В 1992 г. факультет ВТ переименован в факультет вычислительной техники и информатики, а кафедра ВТ и ИЕР переименована в кафедру вычислительной математики и программирования. В 1994 г. на факультете был открыт прием на специальность "Информационные системы в менеджменте", вместо которой по перечню 1997 г. в 1998 г. открыт прием по специальности "Экономическая кибернетика". В 1999 году впервые начат прием на специальность "Системное программирование".',
    'CST_FACULTY': 'Факультет ВТИ переименован в факультет компьютерных наук и технологий.',

    // NEWS
    'NEWS_BUTTON': 'Дальше',
   
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

  
