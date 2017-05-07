var app = angular.module('app', ['ngRoute', 'ngSanitize', 'pascalprecht.translate', 'textAngular', 'angularFileUpload'])
  .config( ['$routeProvider', '$locationProvider', '$translateProvider', function($routeProvider, $locationProvider, $translateProvider, $routeParams) {
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
    templateUrl: 'templates/admin.html',
    controller: 'adminController'
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
  .when('/ki/',{
    controller : function(){
        window.location.replace('/ki/');
    }, 
    template : "<div></div>"
  })
  .when('/ki/history',{
    controller : function(){
        localStorage.setItem('ki-path', 'history');
        window.location.replace('/ki/');
    }, 
    template : "<div></div>"
  })
  .when('/ki/science',{
    controller : function(){
        localStorage.setItem('ki-path','science');
        window.location.replace('/ki/');
    }, 
    template : "<div></div>"
  })
  .when('/ki/professors',{
    controller : function(){
        localStorage.setItem('ki-path', 'professors');
        window.location.replace('/ki/');
    }, 
    template : "<div></div>"
  })
  .when('/ki/contacts',{
    controller : function(){
        localStorage.setItem('ki-path', 'contacts');
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
    templateUrl: 'templates/specialties.html',
    controller: 'specialitiesController'
  })
  .when('/specialties/:type', {
    templateUrl: 'templates/specialties.html',
    controller: 'specialitiesController'
  })
  .when('/specialties/:type/:item', {
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
  .when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'loginController'
  })
  .otherwise('/error');






  $translateProvider.translations('uk', {
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
    'PORTAL': 'Портал абітурієнта ДонНТУ',
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
    'LANGUAGE': 'Змінити мову',


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
    'NEWS_BUTTON': 'Детальніше',

    // DEAN'S OFFICE
    'DEAN_TITLE': 'В.о. декана',
    'DEAN_NAME': 'Ковальов Сергій Олександрович',
    'DEAN_STATUS': 'доцент, к.т.н., доцент кафедри комп’ютерної інженерії',
    'DEAN_EMAIL': 'sergiy.kovalov@donntu.edu.ua',

    'VICE_DEAN': 'Заступник декана',
    'VICE_DEAN_STATUS': 'доцент, к.т.н., доцент кафедри прикладної математики та інформатики',
    'VICE_DEAN_NAME': 'Маслова Наталія Олександрівна',
    'VICE_DEAN_EMAIL': 'nataliia.maslova@donntu.edu.ua',

    'VICE_WS_DEAN': 'Заступник декана з навчально-виховної роботи зі студентами',
    'VICE_WS_DEAN_NAME': 'Золотухіна Оксана Анатоліївна',
    'VICE_WS_DEAN_STATUS': 'старший викладач кафедри прикладної математики та інформатики',
    'VICE_WS_DEAN_EMAIL': 'oksana.zolotukhina@donntu.edu.ua',

    'DISPATCHER': 'Диспетчер',
    'DISPATCHER_NAME': 'Горбань Яна Геннадіївна',
    'DISPATCHER_EMAIL': 'yana.horban@donntu.edu.ua',

    'SECRETARY': 'Секретар-друкарка',
    'SECRETARY_NAME': 'Бурлака Ольга Анатоліївна',
    'SECRETARY_EMAIL': 'olha.burlaka@donntu.edu.ua',


    //PMI
    'HOD': 'Завідувач кафедрою',
    'PMI_HEAD' : 'Ольга Дмитрієва',
    'PMI_HEAD_STATUS': 'д.т.н., проф.',
    'PMI_HEAD_EMAIL': 'olha.dmytriieva@donntu.edu.ua',

    'SPHERES' : 'Сфери діяльності',
    'S1': 'розробка, використання і супровід алгоритмічного та програмного забезпечення інформаційних систем;',
    'S2': 'проектування і розробка сучасних прикладних пакетів, баз даних і знань;',
    'S3': 'впровадження інформаційних технологій в задачах управління та прийняття рішень.',

    'MAIN_DISCIPLINES': 'Основні дисципліни:',
    'MD1': 'мови та технології програмування;',
    'MD2': 'методології, технології та середовища проектування, моделювання, розробки та тестування програмного забезпечення.',

    //KN
    'KN_HEAD_STATUS': 'д.т.н., доц.',
    'KN_HEAD': 'Євген Федоров',
    'KN_HEAD_EMAIL': 'yevhen.fedorov@donntu.edu.ua',

    'KNS1': 'проектування і розробка інформаційних і управляючих систем;',
    'KNS2': 'проектування і розробка систем штучного інтелекту;',
    'KNS3': 'проектування і розробка веб-орієнтованих систем;',
    'KNS4': 'моделювання і комп’ютерний дизайн;',
    'KNS5': 'екологічний та економічний моніторинг.',

    'KNMD1': 'мови і технології програмування;',
    'KNMD2': 'апаратні засоби комп’ютерних систем;',
    'KNMD3': 'засоби моделювання і проектування систем різноманітної направленості і рівнів складності;',
    'KNMD4': 'методи і засоби штучного інтелекту;',
    'KNMD5': 'технології збору, обробки та зберігання даних;',
    'KNMD6': 'проектування і розробка мультимедійних систем та комп’ютерний дизайн.',

    //PHILOSOPHY
    'PH_HEAD_STATUS': 'д.богосл.н, к.філос.н., проф.',
    'PH_HEAD': 'Микола Нікульчев',
    'PH_HEAD_EMAIL': 'mykola.nikulchev@donntu.edu.ua',

    'PHS1': 'продовження навчання в магістратурі, аспірантурі та докторантурі за філософськими спеціальностями;',
    'PHS2': 'викладацька діяльність;',
    'PHS3': 'консультативна діяльність у різних галузях науки, освіти і культури.',

    'PHMD1': 'повний курс з історії філософії (вивчаються за періодами протягом всього курсу навчання);',
    'PHMD2': 'історія філософії України;',
    'PHMD3': 'історія філософії Росії;',
    'PHMD4': 'практична та теоретична філософія;',
    'PHMD5': 'логіка (традиційна, класична та некласична);',
    'PHMD6': 'історія релігій.',

    //SCHEDULE
    'DOWNLOAD': 'Завантажити',
    'PDF_ERROR': 'Файл не може відобразитися, дивіться ',

    //process
    'DAYFORM': 'Денна форма',
    'NIGHTFORM': 'Заочна форма',
    '1COURSE': 'Перший курс',
    '2COURSE': 'Другий курс',
    '3COURSE': 'Третій курс',
    '4COURSE': 'Четвертий курс',
    '5COURSE': 'Магістри 1 року, спеціалісти',
    '6COURSE': 'Магістри 2 року',

    //ORGANIZATIONS
    'SO_TITLE': 'Студентське самоврядування',
    'SO_DESCRIPTION': 'Якщо твоє життя нудне й одноманітне, тобі нудно в університеті, але ти вважаєш що здатний на більше, тоді ми допоможемо тобі. Приєднуйся до нас і додай у свою життя яскравих фарб і незабутніх вражень.',
    'SO_HEAD': 'Еля Пенар',
    'SO_HEAD_STATUS': 'Голова студентського самоврядування ДонНТУ',
    'SO_FAC_HEAD': 'Артем Любімов',
    'SO_FAC_HEAD_STATUS': 'Голова студентського самоврядування ФКНТ',
    'SR_DESCRIPTION': 'Хочеш стати крутим діджеєм або класним ведучим?<br>Чи хочеш спробувати себе журналістом?<br>Приходь до нас, молода команда студентського радіо чекає на тебе!',
    'SR_HEAD': 'Семен Лойко',
    'SR_HEAD_STATUS': 'Голова студентського радіо',

    //DOCUMENTS
    'DI1' : 'Положення про організацію освітнього процесу у ДонНТУ',
    'DI2' : 'Положення про поновлення, переводи і відрахування студентів ДонНТУ', 
    'DI3' : 'Положення про диплом з відзнакою ДонНТУ', 
    'DI4' : 'Положення про переведення на вакантні бюджетні місця ДонНТУ', 
    'DI5' : 'Положення про семестровий контроль у ДВНЗ «Донецький Національний Технічний Університет»', 
    'DI6' : 'Положення про порядок створення та організацію роботи Екзаменаційної комісії в ДонНТУ', 
    'DI7' : '“Деякі питання стипендіального забезпечення” ПОСТАНОВА від 28 грудня 2016 р. № 1050', 
    'DI8' : '“Про розміри стипендій у державних та комунальних навчальних закладах, наукових установах” ПОСТАНОВА від 28 грудня 2016 р. № 1047', 
    'DI9' : '“Деякі питання виплати соціальних стипендій студентам (курсантам) вищих навчальних закладів” ПОСТАНОВА від 28 грудня 2016 р. № 1045', 
    'DI10' : 'Квитанція на оплату навчання',  


    // CONTACTS
    'ADRESS_TITLE': 'Адреса',
    'ADRESS': 'м. Покровськ, пл. Шибанкова, 2',
    'REGYME_TITLE': 'Режим роботи підрозділів університету',
    'REGYME': ' з 8:00 по 16:30',
    'BUILDINGS': '3й корпус, ауд. 104',

    //ASPIRANTUR
    'AIT1': 'У ДВНЗ «Донецький національний технічний університет» діє аспірантура зі спеціальностей',
    'AIT2': '121 «Інженерія програмного забезпечення»',
    'AIT3': '122 «Комп’ютерні науки та інформаційні технології»',
    'AIT4': '123 «Комп’ютерна інженерія»',
    'AIT5': '(галузь знань 12 «Інформаційні технології»)',
    'AIT6': 'Також діє спеціалізована рада Д 11.052.03 із захисту кандидатських та докторських дисертацій за спеціальностями',
    'AIT7': '05.13.05 «Комп’ютерні системи та компоненти»',
    'AIT8': '01.05.02 «Математичне моделювання та обчислювальні методи»',


        //COOPERATION 
    'GAMEHUB1': 'Проект GameHub – співробітництво в області  комп’ютерної ігрової індустрії (Іспанія, Польща, Австрія) ',
    'GAMEHUB2': 'Проект GameHub ініційовано для допомоги українським студентам інженерних спеціальностей отримати знання і навички у сфері комп’ютерного дизайну та розробки комп’ютерних ігор, підвищуючи тим самим їх шанси на працевлаштування і самодостатність.',
    'GAMEHUB3': 'Проект спрямований на створення GameHub інфраструктури, що сприятиме підвищенню кваліфікації випускників університетів та розвитку цифрового виробництва за допомогою надання освітніх ресурсів, консультування факультетів університетів і центрів по безробіттю.',
    'GAMEHUB4': 'Цільова група проекту: представники вищих навчальних закладів – викладацький склад і студенти; представники центрів по безробіттю, ATO ветерани та інженери, зацікавлені працювати в сфері розробки ігор. Проект буде сприяти професійному розвитку цільової групи в цифровій індустрії, як частини інформаційно-комунікаційних технологій.',
    'GAMEHUB5': 'консорціум складається з тринадцяти партнерів',
    'GAMEHUB6': ' що володіють необхідним досвідом у сфері бізнесу та освіти.',
    
    
    'ERASMUS1': 'Участь у проекті Erasmus+ - програмі Європейського Союзу з підтримки проектів у сфері освіти, професійного навчання, роботи з молоддю.',
    'ERASMUS2': 'Проект ТЕМПУС (Польща, Франція, Німеччина)',
    'ERASMUS3': 'Метою зазначеного TEMPUS-проекту є відкриття нової спеціалізації в рамках спеціальності 123 «Комп’ютерна інженерія». Спеціалізація «Проектування мікросистем» розроблена при участі чотирьох університетів з України та університетів з Ліону (Франція), Ільменау (Німеччина), Павії (Італія) та Лодзю (Польща).',

    'SHTUTGART1': 'Науково-дослідницькі роботи з Штутгартським, Гамбурзьким, Магдебурзьким університетами (Німеччина).',    
    'SHTUTGART2': 'Стажування та отримання відповідних наукових стипендій.'  
    
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
    'PORTAL': 'Портал абитуриента ДонНТУ',
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
    'ONE_NEWS_BUTTON': 'Подробнее',
    'ALL_NEWS': 'Все новости',
    'FOO': 'Деканат ФКНТ',
    'LANGUAGE': 'Поменять язык',

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
    'NEWS_BUTTON': 'Детальнее',

    // DEAN
    'DEAN_TITLE': 'И.о. декана',
    'DEAN_NAME': 'Ковалев Сергей Александрович',
    'DEAN_STATUS': 'доцент, к.т.н., доцент кафедры компьютерной инженерии',
    'DEAN_EMAIL': 'sergiy.kovalov@donntu.edu.ua',

    'VICE_DEAN': 'Заместитель декана',
    'VICE_DEAN_NAME': 'доцент, к.т.н., доцент кафедри прикладной математики и информатики',
    'VICE_DEAN_STATUS': 'Маслова Наталья Александровна',
    'VICE_DEAN_EMAIL': 'nataliia.maslova@donntu.edu.ua',

    'VICE_WS_DEAN': 'Заместитель декана по учебно-воспитательной работе со студентами',
    'VICE_WS_DEAN_NAME': 'Золотухина Оксана Анатольевна',
    'VICE_WS_DEAN_STATUS': 'старший преподаватель кафедры прикладной математики и информатики',
    'VICE_WS_DEAN_EMAIL': 'oksana.zolotukhina@donntu.edu.ua',

    'DISPATCHER': 'Диспетчер',
    'DISPATCHER_NAME': 'Горбань Яна Геннадиевна',
    'DISPATCHER_EMAIL': 'yana.horban@donntu.edu.ua',

    'SECRETARY': 'Секретарь-машинистка',
    'SECRETARY_NAME': 'Бурлака Ольга Анатольевна',
    'SECRETARY_EMAIL': 'olha.burlaka@donntu.edu.ua',


    // PMI 
    'HOD': 'Заведующий кафедрой',
    'PMI_HEAD' : 'Ольга Дмитриева',
    'PMI_HEAD_STATUS': 'д.т.н., проф.',
    'PMI_HEAD_EMAIL': 'olha.dmytriieva@donntu.edu.ua',

    'SPHERES' : 'Сферы деятельности',
    'S1': 'разработка, использование и сопровождение алгоритмического и программного обеспечения информационных систем;',
    'S2': 'проектирование и разработка современных прикладных пакетов, баз данных и знаний;',
    'S3': 'внедрение информационных технологий в задачах управления и принятия решений.',

    'MAIN_DISCIPLINES': 'Основные дисциплины:',
    'MD1': 'языки и технологии программирования',
    'MD2': 'методологии, технологии и среды проектирования, моделирования, разработки и тестирования программного обеспечения.',
   
   //KN
    'KN_HEAD_STATUS': 'д.т.н., доц.',
    'KN_HEAD': 'Евгений Фёдоров',
    'KN_HEAD_EMAIL': 'yevhen.fedorov@donntu.edu.ua',

    'KNS1': 'проектирование и разработка информационных и управляющих систем;',
    'KNS2': 'проектирование и разработка систем искусственного интеллекта;',
    'KNS3': 'проектирование и разработка веб-ориентированных систем;',
    'KNS4': 'моделирование и компьютерный дизайн;',
    'KNS5': 'экологический и экономический мониторинг.',

    'KNMD1': 'языки и технологии программирования;',
    'KNMD2': 'аппаратные средства компьютерных систем;',
    'KNMD3': 'средства моделирования и проектирования систем различной направленности и уровней сложности;',
    'KNMD4': 'методы и средства искусственного интеллекта;',
    'KNMD5': 'технологии сбора, обрабатывания и хранения данных;',
    'KNMD6': 'проектирование и разработка мультимедийных систем и компьютерный дизайн.',

    //PHILOSOPHY
    'PH_HEAD_STATUS': 'д. богосл. н., к. филос. н., проф.',
    'PH_HEAD': 'Николай Никульчев',
    'PH_HEAD_EMAIL': 'mykola.nikulchev@donntu.edu.ua',

    'PHS1': 'продолжение обучения в магистратуре, аспирантуре и докторантуре по философским специальностям;',
    'PHS2': 'преподавательская деятельность;',
    'PHS3': 'консультативная деятельность в различных областях науки, образования и культуры.',

    'PHMD1': 'полный курс по истории философии (изучаются по периодам на протяжении всего курса обучения);',
    'PHMD2': 'история философии Украины;',
    'PHMD3': 'история Философии России;',
    'PHMD4': 'практическая и теоретическая философия;',
    'PHMD5': 'логика (традиционная, классическая и неклассическая);',
    'PHMD6': 'история религий',

    //SCHEDULE
    'DOWNLOAD': 'Загрузить',
    'PDF_ERROR': 'Файл не не может отобразиться, смотрите ',

     //process
    'DAYFORM': 'Дневная форма',
    'NIGHTFORM': 'Заочная форма',
    '1COURSE': 'Первый курс',
    '2COURSE': 'Второй курс',
    '3COURSE': 'Третий курс',
    '4COURSE': 'Четвертый курс',
    '5COURSE': 'Магистры 1 года, специалисты',
    '6COURSE': 'Магистры 2 года',

     //ORGANIZATIONS
    'SO_TITLE': 'Студенческое самоуправление',
    'SO_DESCRIPTION': 'Если твоя жизнь скучна и однообразна, тебе скучно в университете, но ты считаешь что способен на большее, тогда мы поможем тебе. Присоединяйся к нам и добавь в свою жизнь ярких красок и незабываемых впечатлений.',
    'SO_HEAD': 'Эля Пенар',
    'SO_HEAD_STATUS': 'Глава студенческого самоуправления ДонНТУ',
    'SO_FAC_HEAD': 'Артём Любимов',
    'SO_FAC_HEAD_STATUS': 'Глава студенческого самоуправления ФКНТ',
    'SR_DESCRIPTION': 'Хочешь стать крутым диджеем или классным ведущим? Хочешь попробовать себя журналистом? Приходи к нам, молодая команда студенческого радио ждет тебя!',
    'SR_HEAD': 'Семён Лойко',
    'SR_HEAD_STATUS': 'Глава студенческого радио',


    //DOCUMENTS
    // DOCUMENTS
    "DI1": "Положение об организации образовательного процесса в ДонНТУ",
    "DI2": "Положение о восстановлении, переводы и отчисления студентов ДонНТУ",
    "DI3": "Положение о дипломе с отличием ДонНТУ",
    "DI4": "Положение о переводе на вакантные бюджетные места ДонНТУ",
    "DI5": "Положение о семестровом контроле в ГВУЗ «Донецкий Национальный Технический Университет» ",
    "DI6": 'Положение о порядке создания и организации работы Экзаменационной комиссии в ДонНТУ',
    "DI7": 'Некоторые вопросы стипендиального обеспечения" ПОСТАНОВЛЕНИЕ от 28 декабря 2016 № 1050',
    "DI8": '"О размерах стипендий в государственных и коммунальных учебных заведениях, научных учреждениях" ПОСТАНОВЛЕНИЕ от 28 декабря 2016 № 1047',
    "DI9": '"Некоторые вопросы выплаты социальных стипендий студентам (курсантам) высших учебных заведений" ПОСТАНОВЛЕНИЕ от 28 декабря 2016 № 1045',
    "DI10": "Квитанция на оплату обучения",


 // CONTACTS
    'ADRESS_TITLE': 'Адрес',
    'ADRESS': 'г. Покровск, пл. Шибанкова, 2',
    'REGYME_TITLE': 'Режим работы подразделений университета',
    'REGYME': ' с 8:00 до 16:30',
    'BUILDINGS': '3й корпус, ауд. 104',


    //ASPIRANTUR
    'AIT1': 'В ГВУЗ «Донецкий национальный технический университет» действует аспирантура по специальностям',
    'AIT2': '121 «Инженерия программного обеспечения»',
    'AIT3': '122 «Компьютерные науки и информационные технологии»',
    'AIT4': '123 «Компьютерная инженерия»',
    'AIT5': '(область знаний 12 «Информационные технологии»)',
    'AIT6': 'Также действует специализированный совет Д 11.052.03 по защите кандидатских и докторских диссертаций по специальностям',
    'AIT7': '05.13.05 «Компьютерные системы и компоненты»',
    'AIT8': '01.05.02 «Математическое моделирование и вычислительные методы»',

     // COOPERATION
    "GAMEHUB1": 'Проект GameHub - сотрудничество в области компьютерной игровой индустрии (Испания, Польша, Австрия)',
    'GAMEHUB2': 'Проект GameHub инициировано для помощи украинским студентам инженерных специальностей получить знания и навыки в сфере компьютерного дизайна и разработки компьютерных игр, повышая тем самым их шансы на трудоустройство и самодостаточность.',
    'GAMEHUB3': 'Проект направлен на создание GameHub инфраструктуры, что будет способствовать повышению квалификации выпускников университетов и развития цифрового производства посредством предоставления образовательных ресурсов, консультирование факультетов университетов и центров по безработице. ',
    'GAMEHUB4': 'Целевая группа проекта: представители высших учебных заведений - преподавательский состав и студенты; представители центров по безработице, ATO ветераны и инженеры, заинтересованы работать в сфере разработки игр. Проект будет способствовать профессиональному развитию целевой группы в цифровой индустрии, как части информационно-коммуникационных технологий. ',
    'GAMEHUB5': 'консорциум состоит из тринадцати партнеров',
    'GAMEHUB6': 'обладающих необходимым опытом в сфере бизнеса и образования. ',
    
    
    'ERASMUS1': 'Участие в проекте Erasmus + - программе Европейского Союза по поддержке проектов в сфере образования, профессионального обучения, работы с молодежью. ',
    'ERASMUS2': 'Проект ТЕМПУС (Польша, Франция, Германия)',
    'ERASMUS3': 'Целью данного TEMPUS-проекта является открытие новой специализации в рамках специальности 123 «Компьютерная инженерия». Специализация «Проектирование микросистем» разработана при участии четырех университетов из Украины и университетов из Лиона (Франция), Ильменау (Германия), Павии (Италия) и Лодзь (Польша). ',

    'SHTUTGART1': 'Научно-исследовательские работы по Штутгартским, Гамбургским, Магдебургского университета (Германия). ',
    'SHTUTGART2': 'Стажировка и получения соответствующих научных стипендий.' 
  });

$translateProvider.translations('en', {

    // HEADERS

    'TITLE': 'Faculty of Computer Sciences and Technologies',
    'HISTORY': 'History',
    'NEWS': 'News',
    'STRUCTURE': 'Structure',
    'STUDENTS': 'For Student',
    'ABITURIENTS': 'For Applicant',
    'SCIENCE': 'Science and Cooperation',
    'CONTACTS': 'Contacts',
    'DEAN': 'Dean\'s Office',
    'KI': 'Computer Engineering',
    'KI_FACULTY': 'Department of Computer Engineering',    
    'PMI': 'Applied Mathematics and Informatics',
    'PMI_FACULTY': 'Department of Applied Mathematics and Informatics',
    'KN': 'Computer Sciences',
    'KN_FACULTY': 'Department of Computer Sciences',
    'PHILOSOPHY': 'Philosophy',
    'PHILOSOPHY_FACULTY': 'Department of Philosophy',
    'SCHEDULE': 'Schedule',
    'PLANS': 'Work Plans',
    'CONSULTATIONS': 'Consultations Schedule',
    'GRAPHICS': 'Schedule of educational process',
    'ORGANIZATIONS': 'Student Organizations',
    'DOCUMENTS': 'Documents',
    'PORTAL': 'Applicant Portal of DonNTU',
    'SPECIALTIES': 'Specialties',
    'ASPIRANTUR_TITLE': 'Postgraduate Studies',
    'INTERNATIONAL': 'International Cooperation',
    'BACHELOR': 'This level of education allows students to receive basic higher education and successfully develop their careers',
    'BACHELOR_TITLE': 'Bachelor\'s Degree',
    'MASTER': 'The level of education, in which the student has the opportunity not only to become a first-class specialist, but also to engage in science and teaching activities',
    'MASTER_TITLE': 'Master\'s Degree',
    'ASPIRANTUR': 'Postgraduate studies is a choice of people who never stop! There is no limit to perfection',
    'LEVELS_TITLE': 'Education levels',
    'LEVELS': 'Levels of education that can be achieved by students studying at the Faculty of Computer Sciences and Technologies',
    'ONE_NEWS_BUTTON': 'Read More',
    'ALL_NEWS': 'All News',
    'FOO': 'Deas\'s office of FCST',

    // HISTORY
    'ET_FACULTY_TITLE': 'Electrotechnical faculty',
    'ET_FACULTY': 'In 1959, the Electrotechnical Faculty was established at the Donetsk Industrial Institute, the first dean of which was Matvey Borisovich Shumyatsky (1912-1994). On his initiative and with his active participation, much has been done to create the future of the Faculty of Computer Science and Informatics.',
    'FIRST_LAB_TITLE': 'The first laboratory work on the course "Mathematical Machines and Devices"',
    'FIRST_LAB': 'An important milestone in the history of the faculty and institute was 1961, when the course "Mathematical Machines and Programming" began to be read for students of all specialties of the Institute, which was prepared by assistant professor Sergey Buachidze and assistants Viktor Nazarenko and Vladimir Svyatny. The acquisition in the same year of the computer "Minsk-12" marked the beginning of the computer center of DPI.',
    'FIRST_SCIENCE_TITLE': 'The first research work in the field of informatics',
    'FIRST_SCIENCE': 'In 1962, the first research work was carried out in the field of computer science to create control systems with the use of control computers.',
    'CT_CAF_TITLE': 'Department of Computing Machinery',
    'CT_CAF': 'In 1963, the Department of Computing Machinery was created, headed by Associate Professor Lev Petrovich Feldman. In 1965 the specialty "Mathematical computing instruments and devices" was opened in this department, and in 1971 - "Applied Mathematics".',
    'CTAI_FACULTY_TITLE': 'Faculty of Computer Science and Automated Control Systems',
    'CTAI_FACULTY': 'Due to the opening of new specialties and the rapid increase in the number of students in 1972, the electrical engineering department was divided into two - Faculty of Energy and Faculty of Computing Machinery and Automated Control Systems. Vladimir Svyatny was elected as a Dean. In the structure of this faculty there were following departments: computer engineering, automated control systems, automatics and telemechanics. In 1974, for the preparation of the specialty "Applied Mathematics", the Department of Applied Mathematics was created, headed by Professor, Doctor of Physical and Mathematical Sciences Elena Kharlamova. In 1975 the Department of Computing Machinery was renamed into the Department of Electronic Computers, and for the preparation of students of all specialties of the institute in the field of information technology a Department of Computing Machinery in Engineering Economic Calculations was created.',
    'CT_FACULTY_TITLE': 'Faculty of Computer Science',
    'CT_FACULTY': 'In 1977, on the basis of the unified faculty "Computing Machinery and Automated Control Systems" two new ones were created: the Faculty of Computer Science and the Faculty of Automated Control Systems. The dean of the Faculty of Computer Science became Victor Kalashnikov, who since 1981 was replaced by the professor of the Department of Electronic Computers Vladimir Svyatny.',
    'CTI_FACULTY_TITLE': 'Faculty of Computer Science and Informatics',
    'CTI_FACULTY': 'In 1992, Faculty of Computer Science was renamed into the Faculty of Computer Science and Informatics, and the Department of Computing Machinery in Engineering Economic Calculations was renamed into the Department of Computational Mathematics and Programming. In 1994, the faculty opened an admission to the specialty "Information systems in management", instead of which, according to the list of 1997 in 1998 an admission was opened on the specialty "Economic Cybernetics". In 1999, for the first time, the admission to the specialty "System Programming" was started.',
    'CST_FACULTY': 'Faculty of Computer Science and Informatics was renamed into the Faculty of Computer Sciences and Technologies.',

    // NEWS
    'NEWS_BUTTON': 'Read More',

    // DEAN
    'DEAN_TITLE': 'Acting Dean',
    'DEAN_NAME': 'Sergey Kovalev',
    'DEAN_STATUS': 'Docent, Candidate of Engineering Sciences, Associate Professor at the Department of Computer Engineering',
    'DEAN_EMAIL': 'sergiy.kovalov@donntu.edu.ua',

    'VICE_DEAN': 'Vice Dean',
    'VICE_DEAN_NAME': 'Docent, Candidate of Engineering Sciences, Associate Professor at the Department of Applied Mathematics and Informatics',
    'VICE_DEAN_STATUS': 'Natalia Maslova',
    'VICE_DEAN_EMAIL': 'nataliia.maslova@donntu.edu.ua',

    'VICE_WS_DEAN': 'Vice Dean for educational work with students',
    'VICE_WS_DEAN_NAME': 'Oksana Zolotukhina',
    'VICE_WS_DEAN_STATUS': 'Senior Lecturer at the Department of Applied Mathematics and Informatics',
    'VICE_WS_DEAN_EMAIL': 'oksana.zolotukhina@donntu.edu.ua',

    'DISPATCHER': 'Dispatcher',
    'DISPATCHER_NAME': 'Yana Gorban',
    'DISPATCHER_EMAIL': 'yana.horban@donntu.edu.ua',

    'SECRETARY': 'Secretary',
    'SECRETARY_NAME': 'Olga Burlaka',
    'SECRETARY_EMAIL': 'olha.burlaka@donntu.edu.ua',


    // PMI 
    'HOD': 'Заведующий кафедрой',
    'PMI_HEAD' : 'Ольга Дмитриева',
    'PMI_HEAD_STATUS': 'д.т.н., проф.',
    'PMI_HEAD_EMAIL': 'olha.dmytriieva@donntu.edu.ua',

    'SPHERES' : 'Сферы деятельности',
    'S1': 'разработка, использование и сопровождение алгоритмического и программного обеспечения информационных систем;',
    'S2': 'проектирование и разработка современных прикладных пакетов, баз данных и знаний;',
    'S3': 'внедрение информационных технологий в задачах управления и принятия решений.',

    'MAIN_DISCIPLINES': 'Основные дисциплины:',
    'MD1': 'языки и технологии программирования',
    'MD2': 'методологии, технологии и среды проектирования, моделирования, разработки и тестирования программного обеспечения.',
   
   //KN
    'KN_HEAD_STATUS': 'д.т.н., доц.',
    'KN_HEAD': 'Евгений Фёдоров',
    'KN_HEAD_EMAIL': 'yevhen.fedorov@donntu.edu.ua',

    'KNS1': 'проектирование и разработка информационных и управляющих систем;',
    'KNS2': 'проектирование и разработка систем искусственного интеллекта;',
    'KNS3': 'проектирование и разработка веб-ориентированных систем;',
    'KNS4': 'моделирование и компьютерный дизайн;',
    'KNS5': 'экологический и экономический мониторинг.',

    'KNMD1': 'языки и технологии программирования;',
    'KNMD2': 'аппаратные средства компьютерных систем;',
    'KNMD3': 'средства моделирования и проектирования систем различной направленности и уровней сложности;',
    'KNMD4': 'методы и средства искусственного интеллекта;',
    'KNMD5': 'технологии сбора, обрабатывания и хранения данных;',
    'KNMD6': 'проектирование и разработка мультимедийных систем и компьютерный дизайн.',

    //PHILOSOPHY
    'PH_HEAD_STATUS': 'д. богосл. н., к. филос. н., проф.',
    'PH_HEAD': 'Николай Никульчев',
    'PH_HEAD_EMAIL': 'mykola.nikulchev@donntu.edu.ua',

    'PHS1': 'продолжение обучения в магистратуре, аспирантуре и докторантуре по философским специальностям;',
    'PHS2': 'преподавательская деятельность;',
    'PHS3': 'консультативная деятельность в различных областях науки, образования и культуры.',

    'PHMD1': 'полный курс по истории философии (изучаются по периодам на протяжении всего курса обучения);',
    'PHMD2': 'история философии Украины;',
    'PHMD3': 'история Философии России;',
    'PHMD4': 'практическая и теоретическая философия;',
    'PHMD5': 'логика (традиционная, классическая и неклассическая);',
    'PHMD6': 'история религий',

    //SCHEDULE
    'DOWNLOAD': 'Download',
    'PDF_ERROR': 'File can not be displayed, see ',

     //process
    'DAYFORM': 'Дневная форма',
    'NIGHTFORM': 'Заочная форма',
    '1COURSE': 'Первый курс',
    '2COURSE': 'Второй курс',
    '3COURSE': 'Третий курс',
    '4COURSE': 'Четвертый курс',
    '5COURSE': 'Магистры 1 года, специалисты',
    '6COURSE': 'Магистры 2 года',

     //ORGANIZATIONS
    'SO_TITLE': 'Студенческое самоуправление',
    'SO_DESCRIPTION': 'Если твоя жизнь скучна и однообразна, тебе скучно в университете, но ты считаешь что способен на большее, тогда мы поможем тебе. Присоединяйся к нам и добавь в свою жизнь ярких красок и незабываемых впечатлений.',
    'SO_HEAD': 'Эля Пенар',
    'SO_HEAD_STATUS': 'Глава студенческого самоуправления ДонНТУ',
    'SO_FAC_HEAD': 'Артём Любимов',
    'SO_FAC_HEAD_STATUS': 'Глава студенческого самоуправления ФКНТ',
    'SR_DESCRIPTION': 'Хочешь стать крутым диджеем или классным ведущим? Хочешь попробовать себя журналистом? Приходи к нам, молодая команда студенческого радио ждет тебя!',
    'SR_HEAD': 'Семён Лойко',
    'SR_HEAD_STATUS': 'Глава студенческого радио',


    //DOCUMENTS
    // DOCUMENTS
    "DI1": "Положение об организации образовательного процесса в ДонНТУ",
    "DI2": "Положение о восстановлении, переводы и отчисления студентов ДонНТУ",
    "DI3": "Положение о дипломе с отличием ДонНТУ",
    "DI4": "Положение о переводе на вакантные бюджетные места ДонНТУ",
    "DI5": "Положение о семестровом контроле в ГВУЗ «Донецкий Национальный Технический Университет» ",
    "DI6": 'Положение о порядке создания и организации работы Экзаменационной комиссии в ДонНТУ',
    "DI7": 'Некоторые вопросы стипендиального обеспечения" ПОСТАНОВЛЕНИЕ от 28 декабря 2016 № 1050',
    "DI8": '"О размерах стипендий в государственных и коммунальных учебных заведениях, научных учреждениях" ПОСТАНОВЛЕНИЕ от 28 декабря 2016 № 1047',
    "DI9": '"Некоторые вопросы выплаты социальных стипендий студентам (курсантам) высших учебных заведений" ПОСТАНОВЛЕНИЕ от 28 декабря 2016 № 1045',
    "DI10": "Квитанция на оплату обучения",


 // CONTACTS
    'ADRESS_TITLE': 'Address',
    'ADRESS': 'Pokrovsk, Shibankovа Square, 2',
    'REGYME_TITLE': 'University departments working hours',
    'REGYME': 'from 8:00 to 16:30',
    'BUILDINGS': '3rd building, room 104',


    //ASPIRANTUR
    'AIT1': 'В ГВУЗ «Донецкий национальный технический университет» действует аспирантура по специальностям',
    'AIT2': '121 «Инженерия программного обеспечения»',
    'AIT3': '122 «Компьютерные науки и информационные технологии»',
    'AIT4': '123 «Компьютерная инженерия»',
    'AIT5': '(область знаний 12 «Информационные технологии»)',
    'AIT6': 'Также действует специализированный совет Д 11.052.03 по защите кандидатских и докторских диссертаций по специальностям',
    'AIT7': '05.13.05 «Компьютерные системы и компоненты»',
    'AIT8': '01.05.02 «Математическое моделирование и вычислительные методы»',

     // COOPERATION
    "GAMEHUB1": 'Проект GameHub - сотрудничество в области компьютерной игровой индустрии (Испания, Польша, Австрия)',
    'GAMEHUB2': 'Проект GameHub инициировано для помощи украинским студентам инженерных специальностей получить знания и навыки в сфере компьютерного дизайна и разработки компьютерных игр, повышая тем самым их шансы на трудоустройство и самодостаточность.',
    'GAMEHUB3': 'Проект направлен на создание GameHub инфраструктуры, что будет способствовать повышению квалификации выпускников университетов и развития цифрового производства посредством предоставления образовательных ресурсов, консультирование факультетов университетов и центров по безработице. ',
    'GAMEHUB4': 'Целевая группа проекта: представители высших учебных заведений - преподавательский состав и студенты; представители центров по безработице, ATO ветераны и инженеры, заинтересованы работать в сфере разработки игр. Проект будет способствовать профессиональному развитию целевой группы в цифровой индустрии, как части информационно-коммуникационных технологий. ',
    'GAMEHUB5': 'консорциум состоит из тринадцати партнеров',
    'GAMEHUB6': 'обладающих необходимым опытом в сфере бизнеса и образования. ',
    
    
    'ERASMUS1': 'Участие в проекте Erasmus + - программе Европейского Союза по поддержке проектов в сфере образования, профессионального обучения, работы с молодежью. ',
    'ERASMUS2': 'Проект ТЕМПУС (Польша, Франция, Германия)',
    'ERASMUS3': 'Целью данного TEMPUS-проекта является открытие новой специализации в рамках специальности 123 «Компьютерная инженерия». Специализация «Проектирование микросистем» разработана при участии четырех университетов из Украины и университетов из Лиона (Франция), Ильменау (Германия), Павии (Италия) и Лодзь (Польша). ',

    'SHTUTGART1': 'Научно-исследовательские работы по Штутгартским, Гамбургским, Магдебургского университета (Германия). ',
    'SHTUTGART2': 'Стажировка и получения соответствующих научных стипендий.' 
  });

  $translateProvider.preferredLanguage(localStorage.getItem('fknt_language') ? localStorage.getItem('fknt_language') : 'uk');


    // use the HTML5 History API
    $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
    }); 
}]);

app.run(function($rootScope, $location, $anchorScroll, $translate, $routeParams) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
   // if($location.hash()) $anchorScroll();  
  });

  $rootScope.$on('$routeChangeStart', function (event, newRoute, oldRoute) {
    console.log('hoy');
    console.log($routeParams);
    if ($routeParams.path) {
      //event.preventDefault();
    }
  });

  $rootScope.language = localStorage.getItem('fknt_language') ? localStorage.getItem('fknt_language') : 'uk';
  
  if (sessionStorage.getItem('user')) {
    $rootScope.logged = true;
    $rootScope.user = sessionStorage.getItem('user');
  }
});

  
