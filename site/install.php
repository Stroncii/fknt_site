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
    $password=md5(htmlspecialchars(strip_tags($data['password'])));
 
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
                title_uk=:title_uk, title_ru=:title_ru, title_en=:title_en, full_text_uk=:full_text_uk, full_text_ru=:full_text_ru, full_text_en=:full_text_en, short_text_uk=:short_text_uk, short_text_ru=:short_text_ru, short_text_en=:short_text_en";
    
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
function create_group($data,$db,$table){
  $query = "INSERT INTO 
                " . $table . "
            SET 
                group_title=:group_title, pdf_url=:pdf_url, department_id=:department_id";
    
    // prepare query
    $stmt = $db->prepare($query);

    // posted values
    $group_title=htmlspecialchars(strip_tags($data['group_title']));
    $pdf_url=htmlspecialchars(strip_tags($data['pdf_url']));
    $department_id=htmlspecialchars(strip_tags($data['department_id']));
 
    // bind values
    $stmt->bindParam(":group_title", $group_title);
    $stmt->bindParam(":pdf_url", $pdf_url);
    $stmt->bindParam(":department_id", $department_id);

    if($stmt->execute()){
        return true;
    }else{
        echo "<pre>";
            print_r($stmt->errorInfo());
        echo "</pre>";
        return false;
    }
}
function create_image($data,$db){
  $query = "INSERT INTO 
                " . 'images' . "
            SET 
                news_id=:news_id";
    
    // prepare query
    $stmt = $db->prepare($query);

    // posted values
    $news_id=htmlspecialchars(strip_tags($data['news_id']));
 
    // bind values
    $stmt->bindParam(":news_id", $news_id);

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

$query = "DROP TABLE IF EXISTS `departments`; CREATE TABLE IF NOT EXISTS `departments` (
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
if(!create_department(array('name_uk'=>'Сесія','name_ru'=>'Сессия','name_en'=>'Session'),$db)){
  $success = false;
}

$query = "DROP TABLE IF EXISTS `plans`; CREATE TABLE IF NOT EXISTS `plans` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pdf_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `department_id` int(10) unsigned NOT NULL,
  `position` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;";

if(!execute_query($query,$db)){
  $success = false;
}
$query = "DROP TABLE IF EXISTS `images`; CREATE TABLE IF NOT EXISTS `images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `news_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;";

if(!execute_query($query,$db)){
  $success = false;
}


if(!create_group(array('group_title'=>'КИ-13а','pdf_url'=>'assets/pdf/plans/ki13a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИ-13б','pdf_url'=>'assets/pdf/plans/ki13b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИ-14а','pdf_url'=>'assets/pdf/plans/ki14a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИ-14б','pdf_url'=>'assets/pdf/plans/ki14b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИ-15','pdf_url'=>'assets/pdf/plans/ki15.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИ-16а','pdf_url'=>'assets/pdf/plans/ki16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИ-16б','pdf_url'=>'assets/pdf/plans/ki16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИм-16а','pdf_url'=>'assets/pdf/plans/kim16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИм-16б','pdf_url'=>'assets/pdf/plans/kim16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИс-16а','pdf_url'=>'assets/pdf/plans/kis16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИс-16б','pdf_url'=>'assets/pdf/plans/kis16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КСм-15','pdf_url'=>'assets/pdf/plans/ksm15.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'СПм-15','pdf_url'=>'assets/pdf/plans/spm15.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'МИКм-16а','pdf_url'=>'assets/pdf/plans/mikm16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'МИКм-16б','pdf_url'=>'assets/pdf/plans/mikm16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИз-15','pdf_url'=>'assets/pdf/plans/kiz15.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИз-16а','pdf_url'=>'assets/pdf/plans/kiz16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИз-16б','pdf_url'=>'assets/pdf/plans/kiz16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИзм-16а','pdf_url'=>'assets/pdf/plans/kizm16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИзм-16б','pdf_url'=>'assets/pdf/plans/kizm16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИзп-16','pdf_url'=>'assets/pdf/plans/kizp16.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИзс16а','pdf_url'=>'assets/pdf/plans/kizs16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КИзс16б','pdf_url'=>'assets/pdf/plans/kizs16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КСз-12','pdf_url'=>'assets/pdf/plans/ksz12.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КСз-13','pdf_url'=>'assets/pdf/plans/ksz13.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'МИКзм-16а','pdf_url'=>'assets/pdf/plans/mikzm16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'МИКзм-16б','pdf_url'=>'assets/pdf/plans/mikzm16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}

if(!create_group(array('group_title'=>'КН-15','pdf_url'=>'assets/pdf/plans/kn15.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'СШИм-15','pdf_url'=>'assets/pdf/plans/sshim15.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'ИУСм-15','pdf_url'=>'assets/pdf/plans/iusm15.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КН-14','pdf_url'=>'assets/pdf/plans/kn14.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'ИУСзск-14','pdf_url'=>'assets/pdf/plans/iuszsk14.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КН-13а','pdf_url'=>'assets/pdf/plans/kn13a.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КН-13б','pdf_url'=>'assets/pdf/plans/kn13b.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КНм-16','pdf_url'=>'assets/pdf/plans/knm16.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КНс-16','pdf_url'=>'assets/pdf/plans/kns16.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КНзс-16','pdf_url'=>'assets/pdf/plans/knzs16.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КНзм-16','pdf_url'=>'assets/pdf/plans/knzm16.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КНз-16','pdf_url'=>'assets/pdf/plans/knz16.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'КН-16','pdf_url'=>'assets/pdf/plans/kn16.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'ИУСзск-15 1 курс','pdf_url'=>'assets/pdf/plans/iuszsk15-1.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'ИУСзск-15 2 курс','pdf_url'=>'assets/pdf/plans/iuszsk15-2.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}

if(!create_group(array('group_title'=>'ИПЗм-15','pdf_url'=>'assets/pdf/plans/ipzm15.pdf','department_id'=>3),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'ПИ-15 ИПЗа','pdf_url'=>'assets/pdf/plans/pi15ipza.pdf','department_id'=>3),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'ПИ-15 ИПЗб','pdf_url'=>'assets/pdf/plans/pi15ipzb.pdf','department_id'=>3),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'ПИ-14','pdf_url'=>'assets/pdf/plans/pi14.pdf','department_id'=>3),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'ПЗС-13','pdf_url'=>'assets/pdf/plans/pzs13.pdf','department_id'=>3),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title'=>'ИПЗ-13','pdf_url'=>'assets/pdf/plans/ipz13.pdf','department_id'=>3),$db,'plans')){
  $success = false;
}

$query = "DROP TABLE IF EXISTS schedules; CREATE TABLE IF NOT EXISTS `schedules` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pdf_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `department_id` int(10) unsigned NOT NULL,
  `position` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;";

if(!execute_query($query,$db)){
  $success = false;
}

if(!create_group(array('group_title'=>'КІ-16а','pdf_url'=>'assets/pdf/schedule/ki16a.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'КІ-15','pdf_url'=>'assets/pdf/schedule/ki15.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'КІ-14а','pdf_url'=>'assets/pdf/schedule/ki14a.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'КІ-14б','pdf_url'=>'assets/pdf/schedule/ki14b.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'КІ-13а','pdf_url'=>'assets/pdf/schedule/ki13a.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'КІ-13б','pdf_url'=>'assets/pdf/schedule/ki13b.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'КІм-16а','pdf_url'=>'assets/pdf/schedule/kim16a.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'МІКм-16а','pdf_url'=>'assets/pdf/schedule/mikm16a.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}


if(!create_group(array('group_title'=>'КН-16','pdf_url'=>'assets/pdf/schedule/kn16.pdf','department_id'=>2),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'КН-15','pdf_url'=>'assets/pdf/schedule/kn15.pdf','department_id'=>2),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'КН-14','pdf_url'=>'assets/pdf/schedule/kn14.pdf','department_id'=>2),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'КН-13а','pdf_url'=>'assets/pdf/schedule/kn13a.pdf','department_id'=>2),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'КН-13б','pdf_url'=>'assets/pdf/schedule/kn13b.pdf','department_id'=>2),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'КНм-16','pdf_url'=>'assets/pdf/schedule/knm16.pdf','department_id'=>2),$db,'schedules')){
  $success = false;
}

if(!create_group(array('group_title'=>'ИПЗ-16','pdf_url'=>'assets/pdf/schedule/ipz16.pdf','department_id'=>3),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'ПИ-15','pdf_url'=>'assets/pdf/schedule/pi15.pdf','department_id'=>3),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'ПИ-14','pdf_url'=>'assets/pdf/schedule/pi14.pdf','department_id'=>3),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'ИПЗ-13','pdf_url'=>'assets/pdf/schedule/ipz13.pdf','department_id'=>3),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'ПЗС-13','pdf_url'=>'assets/pdf/schedule/pzs13.pdf','department_id'=>3),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'ИПЗм-16','pdf_url'=>'assets/pdf/schedule/ipzm16.pdf','department_id'=>3),$db,'schedules')){
  $success = false;
}

if(!create_group(array('group_title'=>'ФИЛ-16','pdf_url'=>'assets/pdf/schedule/fil16.pdf','department_id'=>4),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'ФИР-15','pdf_url'=>'assets/pdf/schedule/fir15.pdf','department_id'=>4),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'РЕЛм-16','pdf_url'=>'assets/pdf/schedule/relm16.pdf','department_id'=>4),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'Денна форма','pdf_url'=>'assets/pdf/schedule/session-main.pdf','department_id'=>6),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'Заочна форма','pdf_url'=>'assets/pdf/schedule/session-remote.pdf','department_id'=>6),$db,'schedules')){
  $success = false;
}

if(!create_group(array('group_title'=>'Денна форма','pdf_url'=>'assets/pdf/schedule/teacher-schedule.pdf','department_id'=>5),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title'=>'Сесія','pdf_url'=>'assets/pdf/schedule/teacher-session.pdf','department_id'=>5),$db,'schedules')){
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
	'full_text_en'=>'<p>The competition was attended by 28 students from 14 cities of Ukraine. Donetsk National Technical University was represented by Galina Neshchadina, a student of the Faculty of Computer Sciences and Technologies.</p><p>On April 12, the participants arrived, registered and settled: rooms were provided in student dormitories or a hotel. The competition was held in two stages: on 13 and 14 of April. At the first stage all of the students took part in the competition - a written stage was held. The next day, according to the results of the written part, the finalists of the competition were determined who then competed in the second oral part. The most knowledgeable and talented competitors took prize-winning places. </p><p>Besides the official part guests visited Kharkov Polytechnical Museum NTU &quot;KhPI&quot; and learned a lot about one of the oldest technical universities in Ukraine. </p><p>The name of DonNTU came up during the awards ceremony of the competition!</p>',
	'short_text_uk'=>'<p>В олімпіаді прийняли участь 28 студентів із 14 міст України. Донецький національний технічний університет представила Галина Нещадіна, студентка факультету комп’ютерних наук і технологій.</p>',
	'short_text_ru'=>'<p>В олимпиаде приняли участие 28 студентов из 14 городов Украины. Донецкий национальный технический университет представила Галина Нещадина, студентка факультета компьютерных наук и технологий.</p>',
	'short_text_en'=>'<p>The competition was attended by 28 students from 14 cities of Ukraine. Donetsk National Technical University was represented by Galina Neshchadina, a student of the Faculty of Computer Sciences and Technologies.</p>',
	),$db)){

	$success = false;
}
if(!create_image(array('news_id'=>1),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>1),$db)){
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
	),$db)){

	$success = false;
}
if(!create_image(array('news_id'=>2),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>2),$db)){
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
	),$db)){

	$success = false;
}
if(!create_image(array('news_id'=>3),$db)){
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
	),$db)){

	$success = false;
}
if(!create_image(array('news_id'=>4),$db)){
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
	),$db)){

	$success = false;
}
if(!create_image(array('news_id'=>5),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>5),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>5),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>5),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>5),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>5),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>5),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>5),$db)){
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
	),$db)){

	$success = false;
}
if(!create_image(array('news_id'=>6),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>6),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>6),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>6),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>6),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>6),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>6),$db)){
  $success = false;
}
if(!create_news(array( 'title_uk'=>'День відкритих дверей','title_ru'=>'День открытых дверей','title_en'=>'Open Doors Day', 
  'full_text_uk'=>'<p>25 березня в ДонНТУ пройшов день відкритих дверей. Університет з неймовірною щирістю зустрів майбутніх випускників, їх батьків та гостей. Незважаючи на похмуру і холодну погоду, у нас було по-гостинному тепло та затишно.</p><p>З 11-ої години ранку в холі головного корпусу працювали  опергрупи всіх факультетів, які з задоволенням представляли відвідувачам свої проекти. Студенти факультету КНТ презентували гостям працюючу модель 3D-принтеру. Відвідувачі на власні очі змогли побачити, як працює такий пристрій, що викликало неабиякий інтерес кожного.</p><p>О 13.00 всіх було запрошено до аудиторії 2.204, де майбутнім абітурієнтам розповіли про ВНЗ та його спеціальності. Представник приймальної комісії надала потрібну для вступу інформацію, провела інструктаж щодо вступної кампанії 2017. Сьогоднішні студенти висловлювали свої враження про навчання та студентське життя в стінах університету, розповіли про заходи, які відбуваються протягом навчального року. </p><p>Після цього всі запрошені розійшлися по окремих аудиторіях, де кожен факультет представив свої спеціальності. Завідувачі кафедр розповіли гостям про особливості факультету, основні спеціальності та специфіку їх роботи. Особливу увагу приділили можливостям стажування за кордоном, поділилися інформацією щодо програм обміну студентами та перспектив на майбутнє. Після цього школярі змогли задати запитання, які їх цікавили та поспілкуватися зі студентами, які навчаються у ДонНТУ.</p><p>Факультет КНТ зацікавив багатьох школярів. Сподіваємося, що у вересні наш навчальний заклад відкриє двері багатьом талановитим студентам та майбутнім висококваліфікованим спеціалістам. Чекаємо на вас!</p>',
	'full_text_ru'=>'<p>25 марта в ДонНТУ прошел день открытых дверей. Университет с невероятной искренностью встретил будущих выпускников, их родителей и гостей. Несмотря на пасмурную и холодную погоду, у нас было по-гостеприимному тепло и уютно.</p><p>С 11 утра в холле главного корпуса работали опергруппы всех факультетов, с удовольствием представляли посетителям свои проекты. Студенты факультета КНТ представили гостям работающую модель 3D-принтера. Посетители воочию смогли увидеть, как работает такое устройство, которое вызвало большой интерес каждого.</p><p>В 13.00 всех пригласили в аудиторию 2.204, где будущим абитуриентам рассказали о вузе и его специальности. Представитель приемной комиссии предоставила необходимую для вступления информацию, провела инструктаж по вступительной кампании 2017. Сегодняшние студенты высказывали свои впечатления об учебе и студенческой жизни в стенах университета, рассказали о мероприятиях, которые проходят в течение учебного года. </p><p>После этого все приглашенные разошлись по отдельным аудиториям, где каждый факультет представил свои специальности. Заведующие кафедр рассказали гостям об особенностях факультета, основных специальностях и о специфике их работы. Особое внимание уделили возможностям стажировки за рубежом, поделились информацией о программах обмена студентами и перспективами на будущее. После этого школьники смогли задать интересующие их вопросы и пообщаться со студентами, которые учатся в ДонНТУ.</p><p>Факультет КНТ заинтересовал многих школьников. Надеемся, что в сентябре наше учебное заведение откроет двери многим талантливым студентам и будущим высококвалифицированным специалистам. Ждем вас!</p>',
	'full_text_en'=>'<p>March 25 in DonNTU was the day of open doors. University with incredible sincerity met future graduates, their parents and guests. Despite cloudy and cold weather, in our university it was warm and cozy.</p><p>From 11 a.m. in the lobby of the main building there were task forces from with all faculties, who were happy to show their projects. Students of the CST faculty presented to visitors a working model of a 3D-printer. Visitors were able to see with their own eyes how such a device, which caused considerable interest from everyone, works.</p><p>At 13.00 everyone was invited to the room 2.204, where future applicants were told about the university and its specialties. The representative of admission provided future applicants with all the necessary information, held a briefing about the opening of the campaign in 2017. Today\'s students expressed their impressions about studying and student life at the University, spoke about the events that occur during the school year. </p><p>After that, all the invited guests went to a separate classroom where each Department presented their specialty. Heads of departments told the guests about the peculiarities of the faculty, the main specialties and specifics of their work. Special attention was paid to opportunities of internships abroad, shared information about programs of exchange of students and future prospects. After that, students were able to ask questions and socialize with students who are studying in DonNTU.</p><p>The CST faculty interested many students. We hope that in September our University will open doors for many talented students and future highly qualified specialists. We are waiting for you!</p>',
	'short_text_uk'=>'<p>25 березня в ДонНТУ пройшов день відкритих дверей. Університет з неймовірною щирістю зустрів майбутніх випускників, їх батьків та гостей. Незважаючи на похмуру і холодну погоду, у нас було по-гостинному тепло та затишно.</p>',
	'short_text_ru'=>'<p>25 марта в ДонНТУ прошел день открытых дверей. Университет с невероятной искренностью встретил будущих выпускников, их родителей и гостей. Несмотря на пасмурную и холодную погоду, у нас было по-гостеприимному тепло и уютно.</p>',
	'short_text_en'=>'<p>25 березня в ДонНТУ пройшов день відкритих дверей. Університет з неймовірною щирістю зустрів майбутніх випускників, їх батьків та гостей. Незважаючи на похмуру і холодну погоду, у нас було по-гостинному тепло та затишно.</p>',
	),$db)){

	$success = false;
}
if(!create_image(array('news_id'=>7),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>7),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>7),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>7),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>7),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>7),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>7),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>7),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>7),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>7),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>7),$db)){
  $success = false;
}
if(!create_news(array( 'title_uk'=>'Міжнародна олімпіада «The ACM-ICPC International Collegiate Programming Contest 2017»','title_ru'=>'Міжнародна олімпіада «The ACM-ICPC International Collegiate Programming Contest 2017»','title_en'=>'Міжнародна олімпіада «The ACM-ICPC International Collegiate Programming Contest 2017»', 
  'full_text_uk'=>'<p>25 березня 2017 року в ДВНЗ «Донецький національний технічний університет» пройшов 1-й етап міжнародної олімпіади «The ACM-ICPC International Collegiate Programming Contest 2017». Змагання проводяться під егідою Асоціації обчислювальної техніки (ACM) за участі університета Бейлора (<a href=\"https://icpc.baylor.edu\">https://icpc.baylor.edu</a>).</p><p>Головною особливістю змагань є формат проведення. Команди отримують від 8 до 15 завдань, пишуть рішення обраною мовою програмування і надсилають їх на тестовий сервер. Програми тестуються на вхідних тестах, що є невідомими учасникам. Якщо програма видала неправильну відповідь або не вклалася в обмеження за часом / пам\'яттю, то команда отримує повідомлення про це і може послати виправлену версію. Завдання вважається вирішеним, якщо програма видала правильні відповіді на всіх тестах. Перемагає команда, яка вирішила правильно найбільше число завдань.</p><p>В 2017 році в 1-му етапі олімпіади в ДВНЗ «ДонНТУ» прийняли участь сім команд, кожна з яких складалася з трьох студентів факультету комп’ютерних наук і технологій. За результатами змагань команда DonNTU_CSTF_United у складі Мінь Ань - Нгуєн, Ярослава Сафронова та Андрія Кузьменко (тренер – Оксана Золотухіна) посіла перше місце серед команд Донецької області. Колектив викладачів та студентів факультету комп’ютерних наук і технологій щиро вітає команду DonNTU_CSTF_United з перемогою та бажає успіхів у подальших виступах на наступних етапах олімпіади.</p><p style=\" text-align:right;\"><i>Відповідальний за проведення олімпіади у ДВНЗ «ДонНТУ»</i><br><i>доц. кафедри комп’ютерної інженерії Цололо С. О.</i></p>',
  'full_text_ru'=>'<p>25 березня 2017 року в ДВНЗ «Донецький національний технічний університет» пройшов 1-й етап міжнародної олімпіади «The ACM-ICPC International Collegiate Programming Contest 2017». Змагання проводяться під егідою Асоціації обчислювальної техніки (ACM) за участі університета Бейлора (<a href=\"https://icpc.baylor.edu\">https://icpc.baylor.edu</a>).</p><p>Головною особливістю змагань є формат проведення. Команди отримують від 8 до 15 завдань, пишуть рішення обраною мовою програмування і надсилають їх на тестовий сервер. Програми тестуються на вхідних тестах, що є невідомими учасникам. Якщо програма видала неправильну відповідь або не вклалася в обмеження за часом / пам\'яттю, то команда отримує повідомлення про це і може послати виправлену версію. Завдання вважається вирішеним, якщо програма видала правильні відповіді на всіх тестах. Перемагає команда, яка вирішила правильно найбільше число завдань.</p><p>В 2017 році в 1-му етапі олімпіади в ДВНЗ «ДонНТУ» прийняли участь сім команд, кожна з яких складалася з трьох студентів факультету комп’ютерних наук і технологій. За результатами змагань команда DonNTU_CSTF_United у складі Мінь Ань - Нгуєн, Ярослава Сафронова та Андрія Кузьменко (тренер – Оксана Золотухіна) посіла перше місце серед команд Донецької області. Колектив викладачів та студентів факультету комп’ютерних наук і технологій щиро вітає команду DonNTU_CSTF_United з перемогою та бажає успіхів у подальших виступах на наступних етапах олімпіади.</p><p style=\" text-align:right;\"><i>Відповідальний за проведення олімпіади у ДВНЗ «ДонНТУ»</i><br><i>доц. кафедри комп’ютерної інженерії Цололо С. О.</i></p>',
  'full_text_en'=>'<p>25 березня 2017 року в ДВНЗ «Донецький національний технічний університет» пройшов 1-й етап міжнародної олімпіади «The ACM-ICPC International Collegiate Programming Contest 2017». Змагання проводяться під егідою Асоціації обчислювальної техніки (ACM) за участі університета Бейлора (<a href=\"https://icpc.baylor.edu\">https://icpc.baylor.edu</a>).</p><p>Головною особливістю змагань є формат проведення. Команди отримують від 8 до 15 завдань, пишуть рішення обраною мовою програмування і надсилають їх на тестовий сервер. Програми тестуються на вхідних тестах, що є невідомими учасникам. Якщо програма видала неправильну відповідь або не вклалася в обмеження за часом / пам\'яттю, то команда отримує повідомлення про це і може послати виправлену версію. Завдання вважається вирішеним, якщо програма видала правильні відповіді на всіх тестах. Перемагає команда, яка вирішила правильно найбільше число завдань.</p><p>В 2017 році в 1-му етапі олімпіади в ДВНЗ «ДонНТУ» прийняли участь сім команд, кожна з яких складалася з трьох студентів факультету комп’ютерних наук і технологій. За результатами змагань команда DonNTU_CSTF_United у складі Мінь Ань - Нгуєн, Ярослава Сафронова та Андрія Кузьменко (тренер – Оксана Золотухіна) посіла перше місце серед команд Донецької області. Колектив викладачів та студентів факультету комп’ютерних наук і технологій щиро вітає команду DonNTU_CSTF_United з перемогою та бажає успіхів у подальших виступах на наступних етапах олімпіади.</p><p style=\" text-align:right;\"><i>Відповідальний за проведення олімпіади у ДВНЗ «ДонНТУ»</i><br><i>доц. кафедри комп’ютерної інженерії Цололо С. О.</i></p>',
  'short_text_uk'=>'<p>25 березня 2017 року в ДВНЗ «Донецький національний технічний університет» пройшов 1-й етап міжнародної олімпіади «The ACM-ICPC International Collegiate Programming Contest 2017». Змагання проводяться під егідою Асоціації обчислювальної техніки (ACM) за участі університета Бейлора (<a href=\"https://icpc.baylor.edu\">https://icpc.baylor.edu</a>).</p>',
  'short_text_ru'=>'<p>25 березня 2017 року в ДВНЗ «Донецький національний технічний університет» пройшов 1-й етап міжнародної олімпіади «The ACM-ICPC International Collegiate Programming Contest 2017». Змагання проводяться під егідою Асоціації обчислювальної техніки (ACM) за участі університета Бейлора (<a href=\"https://icpc.baylor.edu\">https://icpc.baylor.edu</a>).</p>',
  'short_text_en'=>'<p>25 березня 2017 року в ДВНЗ «Донецький національний технічний університет» пройшов 1-й етап міжнародної олімпіади «The ACM-ICPC International Collegiate Programming Contest 2017». Змагання проводяться під егідою Асоціації обчислювальної техніки (ACM) за участі університета Бейлора (<a href=\"https://icpc.baylor.edu\">https://icpc.baylor.edu</a>).</p>',
  ),$db)){

  $success = false;
}
if(!create_image(array('news_id'=>8),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>8),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>8),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>8),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>8),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>8),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>8),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>8),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>8),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>8),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>8),$db)){
  $success = false;
}

if(!create_news(array( 'title_uk'=>'Студент ФКНТ став одним зі 100 переможців конкурсу «Авіатор 2017»','title_ru'=>'Студент ДонНТУ став одним зі 100 переможців конкурсу «Авіатор 2017»','title_en'=>'Студент ДонНТУ став одним зі 100 переможців конкурсу «Авіатор 2017»', 
  'full_text_uk'=>'<p>Дванадцятого квітня, у всесвітній День авіації та космонавтики, благодійний Фонд Бориса Колеснікова підвів підсумки освітнього проекту «Авіатор 2017» і оголосив імена переможців.</p><p>Конкурс покликаний підтримати студентів технічних спеціальностей з усієї України та заохотити кращих з них поїздками на міжнародні профільні виставки до Франції та Великобританії.</p><p>Студенти Донецького національного технічного університету  також брали активну участь у конкурсі. Двоє з них – Максим Лебединський (ФКІТАЕР) і Андрій Бардаков (ФКНТ) дійшли навіть до п’ятого етапу та їздили до Харкова, де проходив захист їх власних проектів перед компетентним журі.</p><p>За результатами очного туру, Андрій Бардаков, ст. гр. КІ-14б, увійшов до числа ста переможців.</p><p>«Представлений мною проект полягав у поданні концепції мікропроцесорної системи управління сегментами крила зі змінним профілем. Захищати його було нескладно. Набагато складніше було його створити. Певних складнощів додало також обмеження за часом, що виділявся на доповідь (всього 5 хвилин). Що ж до конкуренції, я її не відчував, оскільки ми не чули доповідей інших учасників. Так, дещо страшно було виступати перед журі, до складу якого входили представники авіації, конструкторських бюро, однак, все вдалося. Також хочу висловити величезну подяку Василю Петровичу Блощицькому, без якого моя участь у конкурсі була б неможливою», – ділиться враженнями Андрій.</p><p>Уже в червні щасливчики відправляться до Франції, де проведуть чотири незабутні дні: на них очікує відвідування Ле Бурже, спілкування з однолітками з інших країн і кращими фахівцями світової авіаційної спільноти.</p>',
  'full_text_ru'=>'<p>Дванадцятого квітня, у всесвітній День авіації та космонавтики, благодійний Фонд Бориса Колеснікова підвів підсумки освітнього проекту «Авіатор 2017» і оголосив імена переможців.</p><p>Конкурс покликаний підтримати студентів технічних спеціальностей з усієї України та заохотити кращих з них поїздками на міжнародні профільні виставки до Франції та Великобританії.</p><p>Студенти Донецького національного технічного університету  також брали активну участь у конкурсі. Двоє з них – Максим Лебединський (ФКІТАЕР) і Андрій Бардаков (ФКНТ) дійшли навіть до п’ятого етапу та їздили до Харкова, де проходив захист їх власних проектів перед компетентним журі.</p><p>За результатами очного туру, Андрій Бардаков, ст. гр. КІ-14б, увійшов до числа ста переможців.</p><p>«Представлений мною проект полягав у поданні концепції мікропроцесорної системи управління сегментами крила зі змінним профілем. Захищати його було нескладно. Набагато складніше було його створити. Певних складнощів додало також обмеження за часом, що виділявся на доповідь (всього 5 хвилин). Що ж до конкуренції, я її не відчував, оскільки ми не чули доповідей інших учасників. Так, дещо страшно було виступати перед журі, до складу якого входили представники авіації, конструкторських бюро, однак, все вдалося. Також хочу висловити величезну подяку Василю Петровичу Блощицькому, без якого моя участь у конкурсі була б неможливою», – ділиться враженнями Андрій.</p><p>Уже в червні щасливчики відправляться до Франції, де проведуть чотири незабутні дні: на них очікує відвідування Ле Бурже, спілкування з однолітками з інших країн і кращими фахівцями світової авіаційної спільноти.</p>',
  'full_text_en'=>'<p>Дванадцятого квітня, у всесвітній День авіації та космонавтики, благодійний Фонд Бориса Колеснікова підвів підсумки освітнього проекту «Авіатор 2017» і оголосив імена переможців.</p><p>Конкурс покликаний підтримати студентів технічних спеціальностей з усієї України та заохотити кращих з них поїздками на міжнародні профільні виставки до Франції та Великобританії.</p><p>Студенти Донецького національного технічного університету  також брали активну участь у конкурсі. Двоє з них – Максим Лебединський (ФКІТАЕР) і Андрій Бардаков (ФКНТ) дійшли навіть до п’ятого етапу та їздили до Харкова, де проходив захист їх власних проектів перед компетентним журі.</p><p>За результатами очного туру, Андрій Бардаков, ст. гр. КІ-14б, увійшов до числа ста переможців.</p><p>«Представлений мною проект полягав у поданні концепції мікропроцесорної системи управління сегментами крила зі змінним профілем. Захищати його було нескладно. Набагато складніше було його створити. Певних складнощів додало також обмеження за часом, що виділявся на доповідь (всього 5 хвилин). Що ж до конкуренції, я її не відчував, оскільки ми не чули доповідей інших учасників. Так, дещо страшно було виступати перед журі, до складу якого входили представники авіації, конструкторських бюро, однак, все вдалося. Також хочу висловити величезну подяку Василю Петровичу Блощицькому, без якого моя участь у конкурсі була б неможливою», – ділиться враженнями Андрій.</p><p>Уже в червні щасливчики відправляться до Франції, де проведуть чотири незабутні дні: на них очікує відвідування Ле Бурже, спілкування з однолітками з інших країн і кращими фахівцями світової авіаційної спільноти.</p>',
  'short_text_uk'=>'<p>Дванадцятого квітня, у всесвітній День авіації та космонавтики, благодійний Фонд Бориса Колеснікова підвів підсумки освітнього проекту «Авіатор 2017» і оголосив імена переможців. За результатами очного туру, Андрій Бардаков, студент групи КІ-14б, увійшов до числа ста переможців.</p>',
  'short_text_ru'=>'<p>Дванадцятого квітня, у всесвітній День авіації та космонавтики, благодійний Фонд Бориса Колеснікова підвів підсумки освітнього проекту «Авіатор 2017» і оголосив імена переможців. За результатами очного туру, Андрій Бардаков, студент групи КІ-14б, увійшов до числа ста переможців.</p>',
  'short_text_en'=>'<p>Дванадцятого квітня, у всесвітній День авіації та космонавтики, благодійний Фонд Бориса Колеснікова підвів підсумки освітнього проекту «Авіатор 2017» і оголосив імена переможців. За результатами очного туру, Андрій Бардаков, студент групи КІ-14б, увійшов до числа ста переможців.</p>',
  ),$db)){

  $success = false;
}

if(!create_image(array('news_id'=>9),$db)){
  $success = false;
}
if(!create_news(array( 'title_uk'=>'','title_ru'=>'','title_en'=>'', 
  'full_text_uk'=>'<p>Факультет комп’ютерних наук і технологій, кафедра прикладної математики та інформатики Донецького національного технічного університету з великим сумом повідомляє, що 17 квітня 2017 року на 94-му році життя після тривалої хвороби помер видатний вчений в галузі комп’ютерних систем і комп’ютерного моделювання, ветеран Великої Вітчизняної війни, доктор технічних наук, професор, Лауреат Державної премії України в галузі науки і техніки ФЕЛЬДМАН Лев Петрович.</p><p>Лев Петрович пройшов славний життєвий шлях. Він народився 5 листопада 1923 року в місті Керенську Пензенської області. У липні 1941 року вступив добровольцем до лав Радянської армії і пройшов всю війну у військах протиповітряної оборони. У 1946 році Лев Петрович вступає на механіко-математичний факультет Московського Державного університету, який з відзнакою закінчує в 1951 році. Десять років після університету Лев Петрович пропрацював в Новочеркаському політехнічному інституті на кафедрі теоретичної механіки. Тут в листопаді 1960 року Фельдман Л.П. захистив кандидатську дисертацію.</p><p>У 1963 році Лев Петрович в році перейшов працювати в Донецький політехнічний інститут. Тут Лев Петрович став засновником і рушійною силою комп’ютерного вектору розвитку Донбасу. Під його керівництвом і за його безпосередньої участі в Донецькому політехнічному інституті було створено кафедри електронних обчислювальних машин, прикладної математики та інформатики, обчислювальних методів і програмування, які повністю забезпечили потреби народного господарства Донбасу в фахівцях комп’ютерного напрямку.</p><p>Лев Петрович в 1974 році захистив докторську дисертацію, в 2009 році отримав Державну премію України в галузі науки і техніки. Він є автором понад 200 наукових праць і 6 монографій. Під його науковому керівництві захищені 15 кандидатських і 4 докторських дисертації.</p><p>Колективи факультету комп’ютерних наук і технологій, кафедри прикладної математики та інформатики сумують у зв’язку зі смертю Фельдмана Л.П. і висловлюють глибокі співчуття рідним і близьким покійного. Світла пам’ять про Льва Петровича назавжди залишиться в серцях всіх, хто його знав.</p>',
  'full_text_ru'=>'<p>Факультет комп’ютерних наук і технологій, кафедра прикладної математики та інформатики Донецького національного технічного університету з великим сумом повідомляє, що 17 квітня 2017 року на 94-му році життя після тривалої хвороби помер видатний вчений в галузі комп’ютерних систем і комп’ютерного моделювання, ветеран Великої Вітчизняної війни, доктор технічних наук, професор, Лауреат Державної премії України в галузі науки і техніки ФЕЛЬДМАН Лев Петрович.</p><p>Лев Петрович пройшов славний життєвий шлях. Він народився 5 листопада 1923 року в місті Керенську Пензенської області. У липні 1941 року вступив добровольцем до лав Радянської армії і пройшов всю війну у військах протиповітряної оборони. У 1946 році Лев Петрович вступає на механіко-математичний факультет Московського Державного університету, який з відзнакою закінчує в 1951 році. Десять років після університету Лев Петрович пропрацював в Новочеркаському політехнічному інституті на кафедрі теоретичної механіки. Тут в листопаді 1960 року Фельдман Л.П. захистив кандидатську дисертацію.</p><p>У 1963 році Лев Петрович в році перейшов працювати в Донецький політехнічний інститут. Тут Лев Петрович став засновником і рушійною силою комп’ютерного вектору розвитку Донбасу. Під його керівництвом і за його безпосередньої участі в Донецькому політехнічному інституті було створено кафедри електронних обчислювальних машин, прикладної математики та інформатики, обчислювальних методів і програмування, які повністю забезпечили потреби народного господарства Донбасу в фахівцях комп’ютерного напрямку.</p><p>Лев Петрович в 1974 році захистив докторську дисертацію, в 2009 році отримав Державну премію України в галузі науки і техніки. Він є автором понад 200 наукових праць і 6 монографій. Під його науковому керівництві захищені 15 кандидатських і 4 докторських дисертації.</p><p>Колективи факультету комп’ютерних наук і технологій, кафедри прикладної математики та інформатики сумують у зв’язку зі смертю Фельдмана Л.П. і висловлюють глибокі співчуття рідним і близьким покійного. Світла пам’ять про Льва Петровича назавжди залишиться в серцях всіх, хто його знав.</p>',
  'full_text_en'=>'<p>Факультет комп’ютерних наук і технологій, кафедра прикладної математики та інформатики Донецького національного технічного університету з великим сумом повідомляє, що 17 квітня 2017 року на 94-му році життя після тривалої хвороби помер видатний вчений в галузі комп’ютерних систем і комп’ютерного моделювання, ветеран Великої Вітчизняної війни, доктор технічних наук, професор, Лауреат Державної премії України в галузі науки і техніки ФЕЛЬДМАН Лев Петрович.</p><p>Лев Петрович пройшов славний життєвий шлях. Він народився 5 листопада 1923 року в місті Керенську Пензенської області. У липні 1941 року вступив добровольцем до лав Радянської армії і пройшов всю війну у військах протиповітряної оборони. У 1946 році Лев Петрович вступає на механіко-математичний факультет Московського Державного університету, який з відзнакою закінчує в 1951 році. Десять років після університету Лев Петрович пропрацював в Новочеркаському політехнічному інституті на кафедрі теоретичної механіки. Тут в листопаді 1960 року Фельдман Л.П. захистив кандидатську дисертацію.</p><p>У 1963 році Лев Петрович в році перейшов працювати в Донецький політехнічний інститут. Тут Лев Петрович став засновником і рушійною силою комп’ютерного вектору розвитку Донбасу. Під його керівництвом і за його безпосередньої участі в Донецькому політехнічному інституті було створено кафедри електронних обчислювальних машин, прикладної математики та інформатики, обчислювальних методів і програмування, які повністю забезпечили потреби народного господарства Донбасу в фахівцях комп’ютерного напрямку.</p><p>Лев Петрович в 1974 році захистив докторську дисертацію, в 2009 році отримав Державну премію України в галузі науки і техніки. Він є автором понад 200 наукових праць і 6 монографій. Під його науковому керівництві захищені 15 кандидатських і 4 докторських дисертації.</p><p>Колективи факультету комп’ютерних наук і технологій, кафедри прикладної математики та інформатики сумують у зв’язку зі смертю Фельдмана Л.П. і висловлюють глибокі співчуття рідним і близьким покійного. Світла пам’ять про Льва Петровича назавжди залишиться в серцях всіх, хто його знав.</p>',
  'short_text_uk'=>'<p>Факультет комп’ютерних наук і технологій, кафедра прикладної математики та інформатики Донецького національного технічного університету з великим сумом повідомляє, що 17 квітня 2017 року на 94-му році життя після тривалої хвороби помер видатний вчений в галузі комп’ютерних систем і комп’ютерного моделювання, ветеран Великої Вітчизняної війни, доктор технічних наук, професор, Лауреат Державної премії України в галузі науки і техніки ФЕЛЬДМАН Лев Петрович.</p>',
  'short_text_ru'=>'<p>Факультет комп’ютерних наук і технологій, кафедра прикладної математики та інформатики Донецького національного технічного університету з великим сумом повідомляє, що 17 квітня 2017 року на 94-му році життя після тривалої хвороби помер видатний вчений в галузі комп’ютерних систем і комп’ютерного моделювання, ветеран Великої Вітчизняної війни, доктор технічних наук, професор, Лауреат Державної премії України в галузі науки і техніки ФЕЛЬДМАН Лев Петрович.</p>',
  'short_text_en'=>'<p>Факультет комп’ютерних наук і технологій, кафедра прикладної математики та інформатики Донецького національного технічного університету з великим сумом повідомляє, що 17 квітня 2017 року на 94-му році життя після тривалої хвороби помер видатний вчений в галузі комп’ютерних систем і комп’ютерного моделювання, ветеран Великої Вітчизняної війни, доктор технічних наук, професор, Лауреат Державної премії України в галузі науки і техніки ФЕЛЬДМАН Лев Петрович.</p>',
  ),$db)){

  $success = false;
}
if(!create_image(array('news_id'=>10),$db)){
  $success = false;
}
if(!create_news(array( 'title_uk'=>'День науки','title_ru'=>'День науки','title_en'=>'День науки', 
  'full_text_uk'=>'<p>День науки</p>',
  'full_text_ru'=>'<p>День науки</p>',
  'full_text_en'=>'<p>День науки</p>',
  'short_text_uk'=>'<p>День науки</p>',
  'short_text_ru'=>'<p>День науки</p>',
  'short_text_en'=>'<p>День науки</p>',
  'images_nums'=>'1',
  ),$db)){

  $success = false;
}
if(!create_image(array('news_id'=>11),$db)){
  $success = false;
}
/*
if(!create_news(array( 'title_uk'=>'','title_ru'=>'','title_en'=>'', 
  'full_text_uk'=>'<p></p>',
  'full_text_ru'=>'<p></p>',
  'full_text_en'=>'<p></p>',
  'short_text_uk'=>'<p></p>',
  'short_text_ru'=>'<p></p>',
  'short_text_en'=>'<p></p>',
  'images_nums'=>'1,2,3,4,5,6,7',
  ),$db)){

  $success = false;
}
*/

if($success){
	echo "<p>Your database was successfully installed!</p>";
}
else{
	echo "Something's wrong";
}



?>

