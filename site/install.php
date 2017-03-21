<?php

require_once("config/database.php"); 
echo "Installation. ";
function execute_query($some_query, $database) {
    // prepare query
    $stmt = $database->prepare($some_query);

    if($stmt->execute()){
        return true;
    }else{
        echo "<pre>";
            print_r($stmt->errorInfo());
        echo "</pre>";
 
        return false;
    }
}
function create_user($data,$db){
	$query = "INSERT INTO 
                " . 'users' . "
            SET 
                username=:username, email=:email, level=:level, password=:password";
    
    // prepare query
    $stmt = $db->prepare($query);

    // posted values
    $username=htmlspecialchars(strip_tags($data['username']));
    $email=htmlspecialchars(strip_tags($data['email']));
    $level=htmlspecialchars(strip_tags($data['level']));
    $password=md5(htmlspecialchars(strip_tags($data['password'])), PASSWORD_DEFAULT);
 
    // bind values
    $stmt->bindParam(":username", $username);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":level", $level);
    $stmt->bindParam(":password", $password);

    if($stmt->execute()){
        return true;
    }else{
        echo "<pre>";
            print_r($stmt->errorInfo());
        echo "</pre>";
        return false;
    }
}
function create_news($data,$db){
	$query = "INSERT INTO 
                " . 'news' . "
            SET 
                title_uk=:title_uk, title_ru=:title_ru, title_en=:title_en, full_text_uk=:full_text_uk, full_text_ru=:full_text_ru, full_text_en=:full_text_en, short_text_uk=:short_text_uk, short_text_ru=:short_text_ru, short_text_en=:short_text_en, images_nums=:images_nums";
    
    // prepare query
    $stmt = $db->prepare($query);

    // posted values
    $title_uk=($data['title_uk']);
    $title_ru=(($data['title_ru']));
    $title_en=(($data['title_en']));
    $full_text_uk=(($data['full_text_uk']));
    $full_text_ru=(($data['full_text_ru']));
    $full_text_en=(($data['full_text_en']));
    $short_text_uk=(($data['short_text_uk']));
    $short_text_ru=(($data['short_text_ru']));
    $short_text_en=(($data['short_text_en']));
    $images_nums=(($data['images_nums']));
 
    // bind values
    $stmt->bindParam(":title_uk", $title_uk);
    $stmt->bindParam(":title_ru", $title_ru);
    $stmt->bindParam(":title_en", $title_en);
    $stmt->bindParam(":full_text_uk", $full_text_uk);
    $stmt->bindParam(":full_text_ru", $full_text_ru);
    $stmt->bindParam(":full_text_en", $full_text_en);
    $stmt->bindParam(":short_text_uk", $short_text_uk);
    $stmt->bindParam(":short_text_ru", $short_text_ru);
    $stmt->bindParam(":short_text_en", $short_text_en);
    $stmt->bindParam(":images_nums", $images_nums);

    if($stmt->execute()){
        return true;
    }else{
        echo "<pre>";
            print_r($stmt->errorInfo());
        echo "</pre>";
        return false;
    }
}
function create_department($data,$db){
  $query = "INSERT INTO 
                " . 'departments' . "
            SET 
                name_uk=:name_uk, name_ru=:name_ru, name_en=:name_en";
    
    // prepare query
    $stmt = $db->prepare($query);

    // posted values
    $name_uk=htmlspecialchars(strip_tags($data['name_uk']));
    $name_ru=htmlspecialchars(strip_tags($data['name_ru']));
    $name_en=htmlspecialchars(strip_tags($data['name_en']));
 
    // bind values
    $stmt->bindParam(":name_uk", $name_uk);
    $stmt->bindParam(":name_ru", $name_ru);
    $stmt->bindParam(":name_en", $name_en);

    if($stmt->execute()){
        return true;
    }else{
        echo "<pre>";
            print_r($stmt->errorInfo());
        echo "</pre>";
        return false;
    }
}
function create_group($data,$table,$db){
  $query = "INSERT INTO 
                " . $table . "
            SET 
                name_uk=:name_uk, name_ru=:name_ru, name_en=:name_en";
    
    // prepare query
    $stmt = $db->prepare($query);

    // posted values
    $name_uk=htmlspecialchars(strip_tags($data['name_uk']));
    $name_ru=htmlspecialchars(strip_tags($data['name_ru']));
    $name_en=htmlspecialchars(strip_tags($data['name_en']));
 
    // bind values
    $stmt->bindParam(":name_uk", $name_uk);
    $stmt->bindParam(":name_ru", $name_ru);
    $stmt->bindParam(":name_en", $name_en);

    if($stmt->execute()){
        return true;
    }else{
        echo "<pre>";
            print_r($stmt->errorInfo());
        echo "</pre>";
        return false;
    }
}
$success = true;
$database = new Database();
$db = $database->getConnection();

/*$query = "SET FOREIGN_KEY_CHECKS = 0; 
SET @tables = NULL;
SELECT GROUP_CONCAT(table_schema, '.', table_name) INTO @tables
  FROM information_schema.tables 
  WHERE table_schema = 'knt';

SET @tables = CONCAT('DROP TABLE ', @tables);
PREPARE stmt FROM @tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
SET FOREIGN_KEY_CHECKS = 1; ";

if(!execute_query($query,$db)){
	$success = false;
}*/

$query = "DROP TABLE IF EXISTS users; CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `level` int(10) unsigned NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;";

if(!execute_query($query,$db)){
	$success = false;
}

if(!create_user(array('username'=>'administrator','email'=>'daniella.brovkina@donntu.edu.ua','level'=>'0','password'=>'fKnT74-AdmiN09'),$db,'users')){
	$success = false;
}

$query = "DROP TABLE IF EXISTS departments; CREATE TABLE IF NOT EXISTS `departments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name_uk` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name_ru` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name_en` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;";

if(!execute_query($query,$db)){
  $success = false;
}

if(!create_department(array('name_uk'=>'Комп\'ютерна iнженерiя','name_ru'=>'Компьютерная инженерия','name_en'=>'Computer engineering'),$db)){
  $success = false;
}
if(!create_department(array('name_uk'=>'Комп\'ютерні науки','name_ru'=>'Компьютерные науки','name_en'=>'Computer sciences'),$db)){
  $success = false;
}
if(!create_department(array('name_uk'=>'Прикладна математика та інформатика','name_ru'=>'Прикладная математика и информатика','name_en'=>'Applied Mathematics and Informatics'),$db)){
  $success = false;
}
if(!create_department(array('name_uk'=>'Філософія','name_ru'=>'Философия','name_en'=>'Philosophy'),$db)){
  $success = false;
}
if(!create_department(array('name_uk'=>'Викладачі','name_ru'=>'Преподаватели','name_en'=>'Teachers'),$db)){
  $success = false;
}



$query = "DROP TABLE IF EXISTS news; CREATE TABLE IF NOT EXISTS `news` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title_uk` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title_ru` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title_en` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `full_text_uk` text COLLATE utf8_unicode_ci NOT NULL,
  `full_text_ru` text COLLATE utf8_unicode_ci NOT NULL,
  `full_text_en` text COLLATE utf8_unicode_ci NOT NULL,
  `short_text_uk` text COLLATE utf8_unicode_ci NOT NULL,
  `short_text_ru` text COLLATE utf8_unicode_ci NOT NULL,
  `short_text_en` text COLLATE utf8_unicode_ci NOT NULL,
  `images_nums` text COLLATE utf8_unicode_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;";

if(!execute_query($query,$db)){
	$success = false;
}

if(!create_news(array(
	'title_uk'=>'Участь в олімпіаді з німецької мови',
	'title_ru'=>'Участие в олимпиаде по немецкому языку',
	'title_en'=>'Participation in the German language competition',
	'full_text_uk'=>'<p>В олімпіаді прийняли участь 28 студентів із 14 міст України. Донецький національний технічний університет представила Галина Нещадіна, студентка факультету комп’ютерних наук і технологій.</p><p>12 квітня відбувалися заїзд, реєстрація та поселення учасників: надавалися кімнати у студентських гуртожитках або готелі. Олімпіада проводилась в два етапи: 13 та 14 квітня. В першому етапі в конкурсі взяли участь усі студенти – відбувся письмовий етап. Наступного дня за результатами письмових робіт були визначені фіналісти олімпіади, які в другому етапі змагалися в усній частині. Найбільш обізнані та талановиті посіли призові місця. </p><p>Окрім офіційної частини гості Харкова відвідали Політехнічний музей НТУ «ХПІ» та дізналися багато нового про один з найстаріших технічних вишів України. </p><p>До речі, назва ДонНТУ пролунала під час церемонії нагородження фіналістів олімпіади!</p>',
	'full_text_ru'=>'<p>В олимпиаде приняли участие 28 студентов из 14 городов Украины. Донецкий национальный технический университет представила Галина Нещадина, студентка факультета компьютерных наук и технологий.</p><p>12 апреля происходили заезд, регистрация и поселение участников: предоставлялись комнаты в студенческих общежитиях или отеле. Олимпиада проводилась в два этапа: 13 и 14 апреля. На первом этапе в конкурсе приняли участие все студенты – проводился письменный этап. На следующий день по результатам письменных работ были определены финалисты олимпиады, которые во втором этапе соревновались в устной части. Наиболее осведомленные и талантливые заняли призовые места. </p><p>Кроме официальной части гости Харькова посетили Политехнический музей НТУ «ХПИ» и узнали много нового об одном из старейших технических вузов Украины. </p><p>Кстати, название ДонНТУ прозвучало во время церемонии награждения финалистов олимпиады!</p>',
	'full_text_en'=>'<p>The competition was attended by 28 students from 14 cities of Ukraine. Donetsk National Technical University was represented by Galina Neshchadina, a student of the Faculty of Computer Sciences and Technologies.</p><p>On April 12, the participants arrived, registered and settled: rooms were provided in student dormitories or a hotel. The competition was held in two stages: on 13 and 14 of April. At the first stage all of the students took part in the competition - a written stage was held. The next day, according to the results of the written part, the finalists of the competition were determined who then competed in the second oral part. The most knowledgeable and talented competitors took prize-winning places. </p><p>Besides the official part guests visited Kharkov Polytechnical Museum NTU "KhPI" and learned a lot about one of the oldest technical universities in Ukraine. </p><p>The name of DonNTU came up during the awards ceremony of the competition!</p>',
	'short_text_uk'=>'<p>В олімпіаді прийняли участь 28 студентів із 14 міст України. Донецький національний технічний університет представила Галина Нещадіна, студентка факультету комп’ютерних наук і технологій.</p>',
	'short_text_ru'=>'<p>В олимпиаде приняли участие 28 студентов из 14 городов Украины. Донецкий национальный технический университет представила Галина Нещадина, студентка факультета компьютерных наук и технологий.</p>',
	'short_text_en'=>'<p>The competition was attended by 28 students from 14 cities of Ukraine. Donetsk National Technical University was represented by Galina Neshchadina, a student of the Faculty of Computer Sciences and Technologies.</p>',
	'images_nums'=>'1,2',
	),$db)){

	$success = false;
}
if(!create_news(array(
	'title_uk'=>'Олімпіада з комп\'ютерної інженерії',
	'title_ru'=>'Олимпиада по компьютерной инженерии',
	'title_en'=>'Computer engineering competition',
	'full_text_uk'=>'<p>З 15 по 18 березня на базі Кременчуцького національного університету імені Михайла Остроградського відбувся II тур Всеукраїнської студентської олімпіади за напрямом підготовки «Комп’ютерна інженерія» для спеціальності «Комп’ютерні системи та мережі».</p><p> В олімпіаді взяли участь 34 студента із 12 вищих навчальних закладів України. Наш університет представляли студенти факультету комп’ютерних наук і технологій: Артем Любимов та Ігор Філатов під керівництвом к.т.н., доцента кафедри комп’ютерної інженерії Ковальова С.О. </p><p> За словами учасників від нашого університету, зустріли їх дуже добре, для проживання всім учасникам надали кімнати гуртожитку по 3-4 людини в кімнаті. Сама ж олімпіада проходила 16 березня та тривала чотири години. До речі, незадовго до її початку відбулося загальне зібрання учасників у актовій залі, в ході якого керівництво привітало усіх з прибуттям і побажало успіхів у виконанні завдань. </p><p> За результатами олімпіади наші студенти посіли 7 та 14 місця, що є добрим результатом. А головне – вони набули досвіду і готові передати його наступним учасникам, які, сподіваємось, привезуть призові місця наступного року. Побажаємо успіхів нашим студентам!</p>',
	'full_text_ru'=>'<p>С 15 по 18 марта на базе Кременчугского национального университета имени Михаила Остроградского состоялся II тур Всеукраинской студенческой олимпиады по направлению «Компьютерная инженерия» для специальности «Компьютерные системы и сети». </p> <p> В олимпиаде приняли участие 34 студента из 12 высших учебных заведений Украины. Наш университет представляли студенты факультета компьютерных наук и технологий Артем Любимов и Игорь Филатов под руководством к.т.н., доцента кафедры компьютерной инженерии Ковалева С.А. </p> <p> По словам участников от нашего университета, встретили их очень хорошо, для проживания всех участников предоставили комнаты общежития по 3-4 человека в комнате. Сама же олимпиада проходила 16 марта и длилась четыре часа. Незадолго до ее начала прошло общее собрание участников в актовом зале, в ходе которого руководство поздравило всех с прибытием и пожелало успехов в выполнении заданий. </p> <p> По результатам олимпиады наши студенты заняли 7 и 14 места, что является хорошим результатом. А главное - они приобрели опыт и готовы передать его следующим участникам, которые, надеемся, привезут призовые места в следующем году. Пожелаем успехов нашим студентам!</p>',
	'full_text_en'=>'<p>From March 15 to 18, the II round of the All-Ukrainian student\'s competition in сomputer engineering for the specialty &quot;Computer systems and networks&quot; was held at the Kremenchug National University named after Mikhail Ostrogradsky. </p> <p> 34 students from 12 higher educational institutions of Ukraine took part in the competition. Our university was represented by students of the Faculty of Computer Sciences and Technologies Artem Lyubimov and Igor Filatov under the guidance of Candidate of Engineering Sciences, Associate Professor of Computer Engineering Department S.A. Kovalev</p> <p> According to participants from our university, they were met very well, for accommodation of all participants hostel rooms for 3-4 people in the room were provided. The competition was held on March 16 and lasted four hours. Shortly before it began, a general meeting of participants was held in the assembly hall, during which the management of the competition congratulated everyone on their arrival and wished them success in carrying out their assignments. </p> <p> According to the results of the competition, our students took 7th and 14th places, which is a good result. And most importantly, they have gained experience and are ready to transfer it to the next participants, who hopefully will bring prizes next year. We wish success to our students!</p>',
	'short_text_uk'=>'<p>З 15 по 18 березня на базі Кременчуцького національного університету імені Михайла Остроградського відбувся II тур Всеукраїнської студентської олімпіади за напрямом підготовки «Комп’ютернаінженерія» для спеціальності «Комп’ютерні системи та мережі».</p>',
	'short_text_ru'=>'<p>С 15 по 18 марта на базе Кременчугского национального университета имени Михаила Остроградского состоялся II тур Всеукраинской студенческой олимпиады по направлению «Компьютерная инженерия» для специальности «Компьютерные системы и сети».</p>',
	'short_text_en'=>'<p>From March 15 to 18, the II round of the All-Ukrainian student\'s competition in сomputer engineering for the specialty &quot;Computer systems and networks&quot; was held at the Kremenchug National University named after Mikhail Ostrogradsky.</p>',
	'images_nums'=>'1,2',
	),$db)){

	$success = false;
}

if(!create_news(array(
	'title_uk'=>'Про участь в олімпіаді',
	'title_ru'=>'Про участие в олимпиаде',
	'title_en'=>'Competition participation',
	'full_text_uk'=>'<p>19 квітня 2016 року команда факультету комп\'ютерних наук і технологій ДонНТУ DonNTU_CUBE у складі Костянтина Ольмезова, Івана Верещаги та Артема Любимова (тренер – Оксана Золотухіна) посіла перше місце серед команд Східного регіону (Донецька, Луганська, Харківська області) в 1-му етапі Всеукраїнської студентської олімпіади з програмування, що є частиною міжнародних змагань «The ACM-ICPC International Collegiate Programming Contest». Наразі три команди, які приймали участь в попередньому етапі олімпіади, готуються до участі в наступному етапі. Щиро бажаємо успіхів і чекаємо на перемогу!</p>',
	'full_text_ru'=>'<p>19 апреля 2016 команда факультета компьютерных наук и технологий ДонНТУ DonNTU_CUBE в составе Константина Ольмезова, Ивана Верещаги и Артема Любимова (тренер - Оксана Золотухина) заняла первое место среди команд Восточного региона (Донецкая, Луганская, Харьковская области) в 1-м этапе Всеукраинской студенческой олимпиады по программированию, которая является частью международных соревнований «The ACM-ICPC International Collegiate Programming Contest». Три команды, которые принимали участие в предыдущем этапе олимпиады, готовятся к участию в следующем этапе. Искренне желаем успехов и ждем победы!</p>',
	'full_text_en'=>'<p>On April 19, 2016 a team of the Faculty of Computer Sciences and Technologies of DonNTU called DonNTU_CUBE consisting of Konstantin Olmezov, Ivan Vereshchaga and Artem Lyubimov (coach Oksana Zolotukhina) took the first place among the teams of the Eastern region (Donetsk, Luhansk, Kharkov regions) in the 1st stage of the All-Ukrainian Student competition in programming, which is part of the international competitions &quot;The ACM-ICPC International Collegiate Programming Contest&quot;. Three teams that participated in the previous stage of the competition are preparing to participate in the next stage. Sincerely we wish successto our team and we wait for the victory!</p>',
	'short_text_uk'=>'<p>19 квітня 2016 року команда факультету комп\'ютерних наук і технологій ДонНТУ DonNTU_CUBE у складі Костянтина Ольмезова, Івана Верещаги та Артема Любимова (тренер – Оксана Золотухіна) посіла перше місце серед команд Східного регіону.</p>',
	'short_text_ru'=>'<p>19 апреля 2016 команда факультета компьютерных наук и технологий ДонНТУ DonNTU_CUBE в составе Константина Ольмезова, Ивана Верещаги и Артема Любимова (тренер - Оксана Золотухина) заняла первое место среди команд Восточного региона.</p>',
	'short_text_en'=>'<p>On April 19, 2016 a team of the Faculty of Computer Sciences and Technologies of DonNTU called DonNTU_CUBE consisting of Konstantin Olmezov, Ivan Vereshchaga and Artem Lyubimov (coach Oksana Zolotukhina) took the first place among the teams of the Eastern region.</p>',
	'images_nums'=>'1',
	),$db)){

	$success = false;
}

if(!create_news(array(
	'title_uk'=>'Про опонування дисертації',
	'title_ru'=>'Об оппонировании диссертации',
	'title_en'=>'On the Opposition of a Dissertation',
	'full_text_uk'=>'<p>28 квітня 2016 року відбулось засідання спеціалізованої вченої ради К 73.052.04 Черкаського державного технологічного університету, на якій було розглянуто дисертаційну роботу Чикунова Павла Олександровича на здобуття вченого ступеня кандидата технічних наук. Опонентом роботи виступив д.т.н., доцент, зав. кафедри комп\'ютерних наук ДВНЗ &quot;Донецький національний технічний університет&quot; Федоров Євген Євгенович.</p>',
	'full_text_ru'=>'<p>28 апреля 2016 состоялось заседание диссертационного совета К 73.052.04 Черкасского государственного технологического университета, на котором была рассмотрена диссертационная работа Чикунова Павла Александровича на соискание ученой степени кандидата технических наук. Оппонентом работы выступил д.т.н., доцент, зав. кафедры компьютерных наук ДВНЗ &quot;Донецкий национальный технический университет&quot; Федоров Евгений Евгеньевич.</p>',
	'full_text_en'=>'<p>On April 28, 2016 the meeting of the Dissertation Council K 73.052.04 of the Cherkassy State Technological University took place, where the thesis of Pavel Aleksandrovich Chikunov for the degree of Candidate of Engineering Sciences was examined. The opponent of the work was Doctor of Engineering Sciences, Associate Professor, Head of the Department of Computer Sciences, SHEE &quot;Donetsk National Technical University&quot; Evgeny Evgenyevich Fedorov.</p>',
	'short_text_uk'=>'<p>28 квітня 2016 року відбулось засідання спеціалізованої вченої ради К 73.052.04 Черкаського державного технологічного університету, на якій було розглянуто дисертаційну роботу Чикунова Павла Олександровича.</p>',
	'short_text_ru'=>'<p>28 апреля 2016 состоялось заседание диссертационного совета К 73.052.04 Черкасского государственного технологического университета, на котором была рассмотрена диссертационная работа Чикунова Павла Александровича.</p>',
	'short_text_en'=>'<p>On April 28, 2016 the meeting of the Dissertation Council K 73.052.04 of the Cherkassy State Technological University took place, where the thesis of Pavel Aleksandrovich Chikunov.</p>',
	'images_nums'=>'1',
	),$db)){

	$success = false;
}

if(!create_news(array(
	'title_uk'=>'Захист бакалаврських робіт 8 червня',
	'title_ru'=>'Защита бакалаврских работ 8 июня',
	'title_en'=>'Defense of undergraduate works on June 8th',
	'full_text_uk'=>'<p>8 червня відбувся захист кваліфікаційних робіт бакалаврів в групі КІ-12. У цей день захищались 5 студентів: Васильченко С.В., Волга А.О., Гайдук К.С., Грабчук С.П., Емексузян А.В.</p><p>Захист робіт розпочався о 13:00. Членами комісії були: декан факультету Мірошкін Олександр Миколайович, завідувач кафедри КІ Святний Володимир Андрійович, ст. викл. каф. КІ Шевченко Ольга Георгіївна, доцент каф. КІ Шамаєв Віталій Віталійович, доцент каф. КІ Самощенко Олександр Викторович, доцент каф. КІ Цололо Сергій Олексійович, доцент каф. КІ Ковальов Сергій Олександрович. </p><p>Першою захищалась Волга Анна Олександрівна, темою її роботи була &quot;Комп\'ютерне розпізнавання новоутворень в легенях за допомогою програмного аналізу результатів рентгену&quot;. </p><p>Наступним захищався Гайдук Кирило Сергійович, тема роботи була &quot;Розробка додатка відновлення доступу до зашифрованих даних в ОС Windows&quot;.</p><p>Наступним захищався Грабчук Сергій Павлович, тема роботи була &quot;Розробка додатка-довідника за курсом «Комп\'ютерна логіка» для ОС Android&quot;.</p><p>Наступним захищався Емексузян Арам Володимирович, тема роботи була &quot;Розробка додатка вибіркової архівації з аналізом вмісту даних&quot;.</p><p>Наступним захищався Васильченко Сергій Володимирович, тема роботи була &quot;Розробка комп’ютерної системи керування термодинамічним режимом двигуна внутрішнього згоряння на базі мікроконтролера AtmelATmega32u4&quot;.</p><p>Усі студенти вдало захистили свої роботи та отримали високі оцінки від членів комісії та отримали дипломи міжнародного зразка.</p>',
	'full_text_ru'=>'<p>8 июня состоялась защита квалификационных работ бакалавров в группе КИ-12. В этот день защищались 5 студентов: Васильченко С.В., Волга А.А., Гайдук К.С., Грабчук С.П., Емексузян А.В. </p> <p> Защита работ началась в 13:00. Членами комиссии были: декан факультета Мирошкин Александр Николаевич, заведующий кафедрой КИ Святный Владимир Андреевич, ст. преп. каф. КИ Шевченко Ольга Георгиевна, доцент каф. КИ Шамаев Виталий Витальевич, доцент каф. КИ Самощенко Александр Викторович, доцент каф. КИ Цололо Сергей Алексеевич, доцент каф. КИ Ковалёв Сергей Александрович. </p> <p> Первым защищалась Волга Анна Александровна, темой её работы была &quot;Компьютерное распознавание новообразований в легких с помощью программного анализа результатов рентгена&quot;. </p><p> Следующим защищался Гайдук Кирилл Сергеевич, тема работы была &quot;Разработка приложения восстановления доступа к зашифрованным данным в Windows&quot;. </p> <p> Следующим защищался Грабчук Сергей Павлович, тема работы была &quot;Разработка приложения-справочника по курсу «Компьютерная логика» для ОС Android&quot;. </p> <p> Следующим защищался Емексузян Арам Владимирович, тема работы была &quot;Разработка приложения выборочной архивации с анализом содержания данных &quot;. </p> <p> Следующим защищался Васильченко Сергей Владимирович, тема работы была &quot;Разработка компьютерной системы управления термодинамическим режимом двигателя внутреннего сгорания на базе микроконтроллера AtmelATmega32u4&quot;. </p> <p>Все студенты успешно защитили свои работы и получили высокие оценки от членов комиссии и получили дипломы международного образца.</p>',
	'full_text_en'=>'<p>On June 8, the defense of the qualification works of bachelors in the KI-12 group was held. On this day, five students defended their works: S.V. Vasilchenko, A.A. Volga, K.S. Gaiduk, S.P. Grabchuk, A.V. Emeksuzyan.</p> <p> Defense of the works began at 13:00. The members of the commission were: Dean of the Faculty Alexander Nikolaevich Miroshkin, Head of the CE Department Vladimir Andreevich Svyatny, senior lecturer of of the CE Department Olga Georgievna Shevchenko, Associate Professor of the CE Department Vitaliy Vitaliyevich Shamayev, Associate Professor of the CE Department Alexander Viktorovich Samoshchenko, Associate Professor of the CE Department Sergey Alekseevich Tsololo, Associate Professor of the CE Department Sergey Alexandrovich Kovalev. </p> <p>The first to defend her work was Anna Alexandrovna Volga, the topic of her work was &quot;Computer recognition of neoplasms in lungs using software analysis of X-ray results&quot;. </p> <p> The next one was defense by Kirill Sergeevich Gaiduk, the topic of the work was &quot;Developing an application to restore access to encrypted data in Windows&quot;. </p> <p>Sergey Pavlovich Grabchuk defended his work next, the topic of the work was &quot;Development of the application-guidebook for the course «Computer logic» for the Android OS&quot;. </p> <p> The next to defend was Aram Vladimirovich Emeksuzyan, the topic of the work was &quot;Development of the application of selective archiving with the analysis of the data content&quot;. </p> <p>  Sergey Vladimirovich Vasilchenko defended his work next, the topic of the work was &quot;Development of a computer system for controlling the thermodynamic mode of an internal combustion engine based on the AtmelATmega32u4 microcontroller&quot;. </p> <p> All the students successfully defended their works and received high marks from commission members and received international diplomas.</p>',
	'short_text_uk'=>'<p>8 червня відбувся захист кваліфікаційних робіт бакалаврів в групі КІ-12. У цей день захищались 5 студентів: Васильченко С.В., Волга А.О., Гайдук К.С., Грабчук С.П., Емексузян А.В.</p>',
	'short_text_ru'=>'<p>8 июня состоялась защита квалификационных работ бакалавров в группе КИ-12. В этот день защищались 5 студентов: Васильченко С.В., Волга А.А., Гайдук К.С., Грабчук С.П., Емексузян А.В.</p>',
	'short_text_en'=>'<p>On June 8, the defense of the qualification works of bachelors in the KI-12 group was held. On this day, five students defended their works: S.V. Vasilchenko, A.A. Volga, K.S. Gaiduk, S.P. Grabchuk, A.V. Emeksuzyan.</p>',
	'images_nums'=>'1,2,3,4,5,6,7,8',
	),$db)){

	$success = false;
}

if(!create_news(array(
	'title_uk'=>'Захист бакалаврських робіт 10 червня',
	'title_ru'=>'Защита бакалаврских работ 10 июня',
	'title_en'=>'Defense of undergraduate works on June 10th',
	'full_text_uk'=>'<p>10 червня відбувся захист кваліфікаційних робіт бакалаврів в групі КІ-12. У цей день захищались 8 студентів:  Коваленко О.М., Лаврищев О.В., Любимов А.С., Нестеров А.В., Осадчук О.М.,  Філатов І.А.,  Шендрик М.В.,  Щипанов М.В.</p><p> Захист робіт розпочався о 13:00. Членами комісії були: декан факультету Мірошкін Олександр Миколайович, завідувач кафедри КІ Святний Володимир Андрійович, ст. викл. каф. КІ Шевченко Ольга Георгіївна, доцент каф. КІ Шамаєв Віталій Віталійович, доцент каф. КІ Самощенко Олксандр Викторович, доцент каф. КІ Цололо Сергій Олексійович, доцент каф. КІ Ковальов Сергій Олександрович.</p><p>Першою захищалась Коваленко Олена Михайлівна, темою її роботи була &quot;Комп\'ютерне розпізнавання новоутворень головного мозку за допомогою програмного аналізу результатів МРТ&quot;. </p><p>Наступним захищався Лаврищев Олександр Владиславович, тема роботи була &quot;Розробка додатку для мікроконтролера метеостанції&quot;.</p><p>Наступним захищався Любимов Артем Сергійович, тема роботи була &quot;Розробка навчального паралельного MIMD-кластера&quot;.</p><p>Наступним захищався Нестеров Антон Володимирович, тема роботи була &quot;Розробка веб-додатка обліку об\'єктів зовнішньої реклами&quot;.</p><p>Наступним захищався Осадчук Олексій Миколайович, тема роботи була &quot;Розробка редактора даних конфігурації завантаження ОС&quot;.</p><p>Наступним захищався Філатов Ігор Анатолійович, тема роботи була &quot;Розробка додатка-довідника мережевого адміністратора для ОС Android&quot;.</p><p>Наступним захищався Шендрик Максим Вікторович, тема роботи була &quot;Розробка кросплатформенного додатка створення кросвордів на Java FX&quot;.</p><p>Останнім захищався Щипанов Максим Віталійович, тема роботи була &quot;Розробка програмного модулю первинної обробки даних для комп’ютерної інформаційної системи&quot;.</p><p>Усі студенти вдало захистили свої роботи та отримали високі оцінки від членів комісії та отримали дипломи міжнародного зразка.</p><p>Після цього офіційна частина закінчилась та кафедрі було вручено подарунок від групи.</p>',
	'full_text_ru'=>'<p>10 июня состоялась защита квалификационных работ бакалавров в группе КИ-12. В этот день защищались 8 студентов: Коваленко А. Н., Лаврищев О.В., Любимов А.С., Нестеров А.В., Осадчук А.М., Филатов И.А., Шендрик М.В., Щипанов М.В. </p> <p>Защита работ началась в 13:00. Членами комиссии были: декан факультета Мирошкин Александр Николаевич, заведующий кафедрой КИ Святный Владимир Андреевич, ст. преп. каф. КИ Шевченко Ольга Георгиевна, доцент каф. КИ Шамаев Виталий Витальевич, доцент каф. КИ Самощенко Александр Викторович, доцент каф. КИ Цололо Сергей Алексеевич, доцент каф. КИ Ковалёв Сергей Александрович.</p> <p> Первой защищалась Коваленко Елена Михайловна, темой ее работы была &quot;Компьютерное распознавание новообразований головного мозга с помощью программного анализа результатов МРТ&quot;. </p> <p> Следующим защищался Лаврищев Александр Владиславович, тема работы была &quot;Разработка приложения для микроконтроллера метеостанции&quot;. </p> <p> Следующим защищался Любимов Артем Сергеевич, тема работы была & quot; Разработка учебного параллельного MIMD-кластера & quot; . </ p> <p> Следующим защищался Нестеров Антон Владимирович, тема работы была &quot;Разработка веб-приложения учета объектов наружной рекламы&quot;. </p> <p> Следующим защищался Осадчук Алексей Николаевич, тема работы была &quot;Разработка редактора данных конфигурации загрузки ОС&quot;. </p> <p> Следующим защищался Филатов Игорь Анатольевич, тема работы была &quot;Разработка приложения-справочника сетевого администратора для ОС Android&quot;. </p> <p> Следующим защищался Шендрик Максим Викторович, тема работы была &quot;Разработка кроссплатформенного приложения создания кроссвордов на Java FX&quot;. </p> <p> Последним защищался Щипанов Максим Витальевич, тема работы была &quot;Разработка программного модуля первичной обработки данных для компьютерной информационной системы&quot;. </p> <p> Все студенты успешно защитили свои работы и получили высокие оценки от членов комиссии и получили дипломы международного образца. </p> <p>После этого официальная часть закончилась и кафедре был вручен подарок от группы.</p>',
	'full_text_en'=>'<p>On June 10, the defense of the qualification works of bachelors in the KI-12 group was held. On this day, eight students defended their works: A.N. Kovalenko, O.V. Lavrishcheva, A.S. Lyubimov, A.V. Nesterov, O.M. Osadchyk, I.A. Filatov, M.V. Shendryk, M.V. Shchypanov.</p><p> Defense of the works began at 13:00. The members of the commission were: Dean of the Faculty Alexander Nikolaevich Miroshkin, Head of the CE Department Vladimir Andreevich Svyatny, senior lecturer of of the CE Department Olga Georgievna Shevchenko, Associate Professor of the CE Department Vitaliy Vitaliyevich Shamayev, Associate Professor of the CE Department Alexander Viktorovich Samoshchenko, Associate Professor of the CE Department Sergey Alekseevich Tsololo, Associate Professor of the CE Department Sergey Alexandrovich Kovalev.</p><p>The first to defend her work was Elena Kovalenko, the topic of her work was &quot;Computer-aided detection of tumors of the brain by means of the analysis of the results of MRI&quot;. </p> <p>Next one to defend his work was Alexander Lavrishchev, the topic of the work was &quot;Development of applications for weather station microcontroller&quot;. </p> <p> Next one to defend his work was Artem Lyubimov, the topic of the work was &quot;Development of training parallel MIMD-cluster &quot;. </p> <p> Next one to defend his work was Anton Nesterov, the topic of the work was &quot;Web application development for the outdoor advertising registering&quot;. </p> <p> Next one to defend his work was Alexey Osadchyk, the topic of the work was &quot;Development of editor for configuration of OS boot data&quot;. </p> <p> Next one to defend his work was Igor Filatov, the topic of the work was &quot;Development of application-guidebook for network administrator for OS Android&quot;. </p> <p> Next one to defend his work was Maxim Shendryk, the topic was &quot;Development cross-platfom application for creating crosswords puzzles using Java FX &quot;. </p> <p> Last one to defend his work was Maxim Schypanov, the topic was &quot;Development of software module for primary data processing for computer information system&quot;.</p><p>All the students successfully defended their works and received high marks from commission members and received international diplomas.</p><p>After this official part ended and the department was given a gift from the group.</p>',
	'short_text_uk'=>'<p>10 червня відбувся захист кваліфікаційних робіт бакалаврів в групі КІ-12. У цей день захищались 8 студентів:  Коваленко О.М., Лаврищев О.В., Любимов А.С., Нестеров А.В., Осадчук О.М.,  Філатов І.А.,  Шендрик М.В.,  Щипанов М.В.</p>',
	'short_text_ru'=>'<p>10 июня состоялась защита квалификационных работ бакалавров в группе КИ-12. В этот день защищались 8 студентов: Коваленко А. Н., Лаврищев О.В., Любимов А.С., Нестеров А.В., Осадчук А.М., Филатов И.А., Шендрик М.В., Щипанов М.В.</p>',
	'short_text_en'=>'<p>On June 10, the defense of the qualification works of bachelors in the KI-12 group was held. On this day, eight students defended their works: A.N. Kovalenko, O.V. Lavrishcheva, A.S. Lyubimov, A.V. Nesterov, O.M. Osadchyk, I.A. Filatov, M.V. Shendryk, M.V. Shchypanov.</p>',
	'images_nums'=>'1,2,3,4,5,6,7',
	),$db)){

	$success = false;
}

if(!create_news(array( 'title_uk'=>'ШАНОВНІ АБІТУРІЄНТИ ТА БАТЬКИ!','title_ru'=>'УВАЖАЕМЫЕ АБИТУРИЕНТЫ И РОДИТЕЛИ!','title_en'=>'DEAR ENROLLEES AND PARENTS!', 'full_text_uk'=>'<p>ДВНЗ &quot;Донецький національний технічний університет&quot; (м.&nbsp;Покровськ) ЗАПРОШУЄ вас відвідати ДЕНЬ ВІДКРИТИХ ДВЕРЕЙ, який відбудеться 25 БЕРЕЗНЯ 2017&nbsp;р. о 13.00. У програмі: </p><ul><li>роз\'яснення щодо вступної кампанії-2017;</li><li>презентація Університету (Університет очима студентів, можливості, які відкриває ДонНТУ та ін.); </li><li>презентація заходів під назвою &quot;Сучасна наука в дії&quot;; </li><li>підведення підсумків та нагородження учасників Всеукраїнської олімпіади&nbsp;-&nbsp;2017. </li></ul></p><p>АДРЕСА ПРОВЕДЕННЯ І КОНТАКТИ: м.&nbsp;Покровськ (Красноармійськ), пл.&nbsp;Шибанкова,&nbsp;2, тел.: (06239)2-51-99, 066-185-74-31, 093-049-69-89</p><p>Зустрічаємо в холі 1-го корпусу. </p><p>ЧЕКАЄМО НА ВАС!</p>',
	'full_text_ru'=>'<p>ГВУЗ &quot;Донецкий национальный технический университет&quot; (г.&nbsp;Покровск) ПРИГЛАШАЕТ вас посетить ДЕНЬ ОТКРЫТЫХ ДВЕРЕЙ, который будет проводиться 25 МАРТА 2017&nbsp;г. в 13.00. В программе: </p><ul><li>разъяснения по вступительной кампании-2017;</li><li>презентация Университета (Университет глазами студентов, возможности, которые открывает ДонНТУ и др.); </li><li>презентация мероприятий под названием &quot;Современная наука в действии&quot; </li><li>подведение итогов и награждение участников Всеукраинской олимпиады - 2017. </li></ul></p><p>АДРЕС ПРОВЕДЕНИЯ И КОНТАКТЫ: г.&nbsp;Покровск (Красноармейск), пл.&nbsp;Шибанкова,&nbsp;2, тел.: (06239)2-51-99, 066-185-74-31, 093-049-69-89</p><p>Встречаем в холле 1-го корпуса. </p><p>ЖДЕМ ВАС!</p>',
	'full_text_en'=>'<p>ДВНЗ &quot;Донецький національний технічний університет&quot; (м.&nbsp;Покровськ) ЗАПРОШУЄ вас відвідати ДЕНЬ ВІДКРИТИХ ДВЕРЕЙ, який відбудеться 25 БЕРЕЗНЯ 2017&nbsp;р. о 13.00. У програмі: </p><ul><li>роз\'яснення щодо вступної кампанії-2017;</li><li>презентація Університету (Університет очима студентів, можливості, які відкриває ДонНТУ та ін.); </li><li>презентація заходів під назвою &quot;Сучасна наука в дії&quot;; </li><li>підведення підсумків та нагородження учасників Всеукраїнської олімпіади - 2017. </li></ul></p><p>АДРЕСА ПРОВЕДЕННЯ І КОНТАКТИ: м.&nbsp;Покровськ (Красноармійськ), пл.&nbsp;Шибанкова,&nbsp;2, тел.: (06239)2-51-99, 066-185-74-31, 093-049-69-89</p><p>Зустрічаємо в холі 1-го корпусу. </p><p>ЧЕКАЄМО НА ВАС!</p>',
	'short_text_uk'=>'<p>ДВНЗ &quot;Донецький національний технічний університет&quot; (м.&nbsp;Покровськ) ЗАПРОШУЄ вас відвідати ДЕНЬ ВІДКРИТИХ ДВЕРЕЙ, який відбудеться 25 БЕРЕЗНЯ 2017&nbsp;р. о 13.00. У програмі: </p><ul><li>роз\'яснення щодо вступної кампанії-2017;</li><li>презентація Університету (Університет очима студентів, можливості, які відкриває ДонНТУ та ін.); </li><li>презентація заходів під назвою &quot;Сучасна наука в дії&quot;; </li><li>підведення підсумків та нагородження учасників Всеукраїнської олімпіади&nbsp;-&nbsp;2017. </li></ul></p><p>АДРЕСА ПРОВЕДЕННЯ І КОНТАКТИ: м.&nbsp;Покровськ (Красноармійськ), пл.&nbsp;Шибанкова,&nbsp;2, тел.: (06239)2-51-99, 066-185-74-31, 093-049-69-89</p><p>Зустрічаємо в холі 1-го корпусу. </p><p>ЧЕКАЄМО НА ВАС!</p>',
	'short_text_ru'=>'<p>ГВУЗ &quot;Донецкий национальный технический университет&quot; (г.&nbsp;Покровск) ПРИГЛАШАЕТ вас посетить ДЕНЬ ОТКРЫТЫХ ДВЕРЕЙ, который будет проводиться 25 МАРТА 2017&nbsp;г. в 13.00. В программе: </p><ul><li>разъяснения по вступительной кампании-2017;</li><li>презентация Университета (Университет глазами студентов, возможности, которые открывает ДонНТУ и др.); </li><li>презентация мероприятий под названием &quot;Современная наука в действии&quot; </li><li>подведение итогов и награждение участников Всеукраинской олимпиады&nbsp;-&nbsp;2017. </li></ul></p><p>АДРЕС ПРОВЕДЕНИЯ И КОНТАКТЫ: г.&nbsp;Покровск (Красноармейск), пл.&nbsp;Шибанкова,&nbsp;2, тел.: (06239)2-51-99, 066-185-74-31, 093-049-69-89</p><p>Встречаем в холле 1-го корпуса. </p><p>ЖДЕМ ВАС!</p>',
	'short_text_en'=>'<p>SHEE &quot;Donetsk National Technical University&quot; (Pokrovsk) INVITES you to THE OPEN DAY that will be held on 25th of March, 2017 at 13.00. The program includes: </p><ul><li>clarification on the admission campaign-2017;</li><li>University presentation (University in students\' eyes, the possibilities offered by the of DonNTU and others); </li><li>presentation of activities titled &quot;Modern science in action&quot; </li><li>summarizing and awarding participants of All-Ukrainian competition&nbsp;-&nbsp;2017. </li></ul></p><p>ADDRESS AND CONTACTS: Pokrovsk (Krasnoarmeysk), Shybankova Square,&nbsp;2, phone: (06239)2-51-99, 066-185-74-31, 093-049-69-89</p><p>We meet you in the lobby of the 1st Corps. </p><p>WE ARE WAITING FOR YOU!</p>',
	'images_nums'=>'1',
	),$db)){

	$success = false;
}


if($success){
	echo "<p>Your database was successfully installed!</p>";
}
else{
	echo "Something's wrong";
}



?>

