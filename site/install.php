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
                group_title_uk=:group_title_uk, group_title_ru=:group_title_ru, group_title_en=:group_title_en, pdf_name=:pdf_name, department_id=:department_id";
    
    // prepare query
    $stmt = $db->prepare($query);

    // posted values
    $group_title_uk=htmlspecialchars(strip_tags($data['group_title_uk']));
    $group_title_ru=htmlspecialchars(strip_tags($data['group_title_ru']));
    $group_title_en=htmlspecialchars(strip_tags($data['group_title_en']));
    $pdf_name=htmlspecialchars(strip_tags($data['pdf_name']));
    $department_id=htmlspecialchars(strip_tags($data['department_id']));
 
    // bind values
    $stmt->bindParam(":group_title_uk", $group_title_uk);
    $stmt->bindParam(":group_title_ru", $group_title_ru);
    $stmt->bindParam(":group_title_en", $group_title_en);
    $stmt->bindParam(":pdf_name", $pdf_name);
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
  `group_title_uk` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `group_title_ru` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `group_title_en` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pdf_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
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


if(!create_group(array('group_title_uk'=>'КІ-13а','group_title_ru'=>'КИ-13а','group_title_en'=>'KI-13а','pdf_name'=>'ki13a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІ-13б','group_title_ru'=>'КИ-13б','group_title_en'=>'KI-13b','pdf_name'=>'ki13b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІ-14а','group_title_ru'=>'КИ-14а','group_title_en'=>'KI-14а','pdf_name'=>'ki14a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІ-14б','group_title_ru'=>'КИ-14б','group_title_en'=>'KI-14b','pdf_name'=>'ki14b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІ-15','group_title_ru'=>'КИ-15','group_title_en'=>'KI-15','pdf_name'=>'ki15.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІ-16а','group_title_ru'=>'КИ-16а','group_title_en'=>'KI-16а','pdf_name'=>'ki16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІ-16б','group_title_ru'=>'КИ-16б','group_title_en'=>'KI-16b','pdf_name'=>'ki16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІм-16а','group_title_ru'=>'КИм-16а','group_title_en'=>'KIm-16a','pdf_name'=>'kim16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІм-16б','group_title_ru'=>'КИм-16б','group_title_en'=>'KIm-16b','pdf_name'=>'kim16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІс-16а','group_title_ru'=>'КИс-16а','group_title_en'=>'KIs-16a','pdf_name'=>'kis16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІс-16б','group_title_ru'=>'КИс-16б','group_title_en'=>'KIs-16b','pdf_name'=>'kis16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КСм-15','group_title_ru'=>'КСм-15','group_title_en'=>'KSm-15','pdf_name'=>'ksm15.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'СПм-15','group_title_ru'=>'СПм-15','group_title_en'=>'SPm-15','pdf_name'=>'spm15.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'МІКм-16а','group_title_ru'=>'МИКм-16а','group_title_en'=>'MIKm-16a','pdf_name'=>'mikm16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'МІКм-16б','group_title_ru'=>'МИКм-16б','group_title_en'=>'MIKm-16b','pdf_name'=>'mikm16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІз-15','group_title_ru'=>'КИз-15','group_title_en'=>'KIz-15','pdf_name'=>'kiz15.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІз-16а','group_title_ru'=>'КИз-16а','group_title_en'=>'KIz-16а','pdf_name'=>'kiz16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІз-16б','group_title_ru'=>'КИз-16б','group_title_en'=>'KIz-16б','pdf_name'=>'kiz16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІзм-16а','group_title_ru'=>'КИзм-16а','group_title_en'=>'KIzm-16а','pdf_name'=>'kizm16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІзм-16б','group_title_ru'=>'КИзм-16б','group_title_en'=>'KIzm-16б','pdf_name'=>'kizm16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІзп-16','group_title_ru'=>'КИзп-16','group_title_en'=>'KIzp-16','pdf_name'=>'kizp16.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІзс16а','group_title_ru'=>'КИзс16а','group_title_en'=>'KIzs16a','pdf_name'=>'kizs16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІзс16б','group_title_ru'=>'КИзс16б','group_title_en'=>'KIzs16b','pdf_name'=>'kizs16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КСз-12','group_title_ru'=>'КСз-12','group_title_en'=>'KSz-12','pdf_name'=>'ksz12.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КСз-13','group_title_ru'=>'КСз-13','group_title_en'=>'KSz-13','pdf_name'=>'ksz13.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'МІКзм-16а','group_title_ru'=>'МИКзм-16а','group_title_en'=>'MIKzm-16a','pdf_name'=>'mikzm16a.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'МІКзм-16б','group_title_ru'=>'МИКзм-16б','group_title_en'=>'MIKzm-16b','pdf_name'=>'mikzm16b.pdf','department_id'=>1),$db,'plans')){
  $success = false;
}

if(!create_group(array('group_title_uk'=>'КН-15','group_title_ru'=>'КН-15','group_title_en'=>'KN-15','pdf_name'=>'kn15.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'СШІм-15','group_title_ru'=>'СШИм-15','group_title_en'=>'SSHIm-15','pdf_name'=>'sshim15.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ІУСм-15','group_title_ru'=>'ИУСм-15','group_title_en'=>'IUSm-15','pdf_name'=>'iusm15.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КН-14','group_title_ru'=>'КН-14','group_title_en'=>'KN-14','pdf_name'=>'kn14.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ІУСзск-14','group_title_ru'=>'ИУСзск-14','group_title_en'=>'IUSzsk-14','pdf_name'=>'iuszsk14.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КН-13а','group_title_ru'=>'КН-13а','group_title_en'=>'KN-13a','pdf_name'=>'kn13a.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КН-13б','group_title_ru'=>'КН-13б','group_title_en'=>'KN-13b','pdf_name'=>'kn13b.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КНм-16','group_title_ru'=>'КНм-16','group_title_en'=>'KNm-16','pdf_name'=>'knm16.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КНс-16','group_title_ru'=>'КНс-16','group_title_en'=>'KNs-16','pdf_name'=>'kns16.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КНзс-16','group_title_ru'=>'КНзс-16','group_title_en'=>'KNzs-16','pdf_name'=>'knzs16.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КНзм-16','group_title_ru'=>'КНзм-16','group_title_en'=>'KNzm-16','pdf_name'=>'knzm16.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КНз-16','group_title_ru'=>'КНз-16','group_title_en'=>'KNz-16','pdf_name'=>'knz16.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КН-16','group_title_ru'=>'КН-16','group_title_en'=>'KN-16','pdf_name'=>'kn16.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ІУСзск-15 1 курс','group_title_en'=>'IUSzsk-15 1 year','group_title_ru'=>'ИУСзск-15 1 курс','pdf_name'=>'iuszsk15-1.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ІУСзск-15 2 курс','group_title_en'=>'IUSzsk-15 2 year','group_title_ru'=>'ИУСзск-15 2 курс','pdf_name'=>'iuszsk15-2.pdf','department_id'=>2),$db,'plans')){
  $success = false;
}

if(!create_group(array('group_title_uk'=>'ІПЗм-15','group_title_ru'=>'ИПЗм-15','group_title_en'=>'IPZm-15','pdf_name'=>'ipzm15.pdf','department_id'=>3),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ПІ-15 ИПЗа','group_title_ru'=>'ПИ-15 ИПЗа','group_title_en'=>'PI-15 IPZa','pdf_name'=>'pi15ipza.pdf','department_id'=>3),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ПІ-15 ИПЗб','group_title_ru'=>'ПИ-15 ИПЗб','group_title_en'=>'PI-15 IPZb','pdf_name'=>'pi15ipzb.pdf','department_id'=>3),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ПІ-14','group_title_ru'=>'ПИ-14','group_title_en'=>'PI-14','pdf_name'=>'pi14.pdf','department_id'=>3),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ПЗС-13','group_title_ru'=>'ПЗС-13','group_title_en'=>'PZS-13','pdf_name'=>'pzs13.pdf','department_id'=>3),$db,'plans')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ІПЗ-13','group_title_ru'=>'ИПЗ-13','group_title_en'=>'IPZ-13','pdf_name'=>'ipz13.pdf','department_id'=>3),$db,'plans')){
  $success = false;
}

$query = "DROP TABLE IF EXISTS schedules; CREATE TABLE IF NOT EXISTS `schedules` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_title_uk` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `group_title_ru` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `group_title_en` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pdf_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `department_id` int(10) unsigned NOT NULL,
  `position` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;";

if(!execute_query($query,$db)){
  $success = false;
}

if(!create_group(array('group_title_uk'=>'КІ-16а','group_title_ru'=>'КИ-16а','group_title_en'=>'KI-16a','pdf_name'=>'ki16a.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІ-15','group_title_ru'=>'КИ-15','group_title_en'=>'KI-15','pdf_name'=>'ki15.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІ-14а','group_title_ru'=>'КИ-14а','group_title_en'=>'KI-14a','pdf_name'=>'ki14a.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІ-14б','group_title_ru'=>'КИ-14б','group_title_en'=>'KI-14b','pdf_name'=>'ki14b.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІ-13а','group_title_ru'=>'КИ-13а','group_title_en'=>'KI-13a','pdf_name'=>'ki13a.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІ-13б','group_title_ru'=>'КИ-13б','group_title_en'=>'KI-13b','pdf_name'=>'ki13b.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КІм-16а','group_title_ru'=>'КИм-16а','group_title_en'=>'KIm-16a','pdf_name'=>'kim16a.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'МІКм-16а','group_title_ru'=>'МИКм-16а','group_title_en'=>'MIKm-16a','pdf_name'=>'mikm16a.pdf','department_id'=>1),$db,'schedules')){
  $success = false;
}


if(!create_group(array('group_title_uk'=>'КН-16','group_title_ru'=>'КН-16','group_title_en'=>'KN-16','pdf_name'=>'kn16.pdf','department_id'=>2),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КН-15','group_title_ru'=>'КН-15','group_title_en'=>'KN-15','pdf_name'=>'kn15.pdf','department_id'=>2),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КН-14','group_title_ru'=>'КН-14','group_title_en'=>'KN-14','pdf_name'=>'kn14.pdf','department_id'=>2),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КН-13а','group_title_ru'=>'КН-13а','group_title_en'=>'KN-13a','pdf_name'=>'kn13a.pdf','department_id'=>2),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КН-13б','group_title_ru'=>'КН-13б','group_title_en'=>'KN-13b','pdf_name'=>'kn13b.pdf','department_id'=>2),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'КНм-16','group_title_ru'=>'КНм-16','group_title_en'=>'KNm-16','pdf_name'=>'knm16.pdf','department_id'=>2),$db,'schedules')){
  $success = false;
}

if(!create_group(array('group_title_uk'=>'ІПЗ-16','group_title_ru'=>'ИПЗ-16','group_title_en'=>'IPZ-16','pdf_name'=>'ipz16.pdf','department_id'=>3),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ПІ-15','group_title_ru'=>'ПИ-15','group_title_en'=>'PI-15','pdf_name'=>'pi15.pdf','department_id'=>3),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ПІ-14','group_title_ru'=>'ПИ-14','group_title_en'=>'PI-14','pdf_name'=>'pi14.pdf','department_id'=>3),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ІПЗ-13','group_title_ru'=>'ИПЗ-13','group_title_en'=>'IPZ-13','pdf_name'=>'ipz13.pdf','department_id'=>3),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ПЗС-13','group_title_ru'=>'ПЗС-13','group_title_en'=>'PZS-13','pdf_name'=>'pzs13.pdf','department_id'=>3),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ІПЗм-16','group_title_ru'=>'ИПЗм-16','group_title_en'=>'IPZm-16','pdf_name'=>'ipzm16.pdf','department_id'=>3),$db,'schedules')){
  $success = false;
}

if(!create_group(array('group_title_uk'=>'ФІЛ-16','group_title_ru'=>'ФИЛ-16','group_title_en'=>'FIL-16','pdf_name'=>'fil16.pdf','department_id'=>4),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'ФІР-15','group_title_ru'=>'ФИР-15','group_title_en'=>'FIR-15','pdf_name'=>'fir15.pdf','department_id'=>4),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'РЕЛм-16','group_title_ru'=>'РЕЛм-16','group_title_en'=>'RELm-16','pdf_name'=>'relm16.pdf','department_id'=>4),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'Денна форма','group_title_ru'=>'Дневная форма','group_title_en'=>'Full-time','pdf_name'=>'session-main.pdf','department_id'=>6),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'Заочна форма','group_title_ru'=>'Заочная форма','group_title_en'=>'Extramural','pdf_name'=>'session-remote.pdf','department_id'=>6),$db,'schedules')){
  $success = false;
}

if(!create_group(array('group_title_uk'=>'Денна форма','group_title_ru'=>'Денна форма','group_title_en'=>'Full-time','pdf_name'=>'teacher-schedule.pdf','department_id'=>5),$db,'schedules')){
  $success = false;
}
if(!create_group(array('group_title_uk'=>'Сесія','group_title_ru'=>'Сессия','group_title_en'=>'Session','pdf_name'=>'teacher-session.pdf','department_id'=>5),$db,'schedules')){
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
	'full_text_en'=>'<p>March 25 in DonNTU was the day of open doors. University with incredible sincerity met future graduates, their parents and guests. Despite cloudy and cold weather, in our university it was warm and cozy.</p><p>From 11 a.m. in the lobby of the main building there were task forces from with all faculties, who were happy to show their projects. Students of the CST faculty presented to visitors a working model of a 3D-printer. Visitors were able to see with their own eyes how such a device, which caused considerable interest from everyone, works.</p><p>At 13.00 everyone was invited to the room 2.204, where future applicants were told about the university and its specialties. The representative of admission committee provided future applicants with all the necessary information, held a briefing about the opening of the campaign in 2017. Current students expressed their feelings about studying and student life at the University, spoke about the events that occur during the academic year. </p><p>After that, all the invited guests went to a separate classrooms where each Department presented their specialties. Heads of departments told the guests about the peculiarities of the faculty, the main specialties and specifics of their work. Special attention was paid to opportunities of internships abroad, information about exchange programs for students and future prospects. After that, students were able to ask questions and socialize with students who are studying in DonNTU.</p><p>The CST faculty interested many students. We hope that in September our University will open doors for many talented students and future highly qualified specialists. We are waiting for you!</p>',
	'short_text_uk'=>'<p>25 березня в ДонНТУ пройшов день відкритих дверей. Університет з неймовірною щирістю зустрів майбутніх випускників, їх батьків та гостей. Незважаючи на похмуру і холодну погоду, у нас було по-гостинному тепло та затишно.</p>',
	'short_text_ru'=>'<p>25 марта в ДонНТУ прошел день открытых дверей. Университет с невероятной искренностью встретил будущих выпускников, их родителей и гостей. Несмотря на пасмурную и холодную погоду, у нас было по-гостеприимному тепло и уютно.</p>',
	'short_text_en'=>'<p>March 25 in DonNTU was the day of open doors. University with incredible sincerity met future graduates, their parents and guests. Despite cloudy and cold weather, in our university it was warm and cozy.</p>',
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
if(!create_news(array( 'title_uk'=>'Міжнародна олімпіада «The ACM-ICPC International Collegiate Programming Contest 2017»','title_ru'=>'Международная олимпиада «The ACM-ICPC International Collegiate Programming Contest 2017»','title_en'=>'International competition «The ACM-ICPC International Collegiate Programming Contest 2017»', 
  'full_text_uk'=>'<p>25 березня 2017 року в ДВНЗ «Донецький національний технічний університет» пройшов 1-й етап міжнародної олімпіади «The ACM-ICPC International Collegiate Programming Contest 2017». Змагання проводяться під егідою Асоціації обчислювальної техніки (ACM) за участі університета Бейлора (<a href=\"https://icpc.baylor.edu\">https://icpc.baylor.edu</a>).</p><p>Головною особливістю змагань є формат проведення. Команди отримують від 8 до 15 завдань, пишуть рішення обраною мовою програмування і надсилають їх на тестовий сервер. Програми тестуються на вхідних тестах, що є невідомими учасникам. Якщо програма видала неправильну відповідь або не вклалася в обмеження за часом / пам\'яттю, то команда отримує повідомлення про це і може послати виправлену версію. Завдання вважається вирішеним, якщо програма видала правильні відповіді на всіх тестах. Перемагає команда, яка вирішила правильно найбільше число завдань.</p><p>В 2017 році в 1-му етапі олімпіади в ДВНЗ «ДонНТУ» прийняли участь сім команд, кожна з яких складалася з трьох студентів факультету комп’ютерних наук і технологій. За результатами змагань команда DonNTU_CSTF_United у складі Мінь Ань - Нгуєн, Ярослава Сафронова та Андрія Кузьменко (тренер – Оксана Золотухіна) посіла перше місце серед команд Донецької області. Колектив викладачів та студентів факультету комп’ютерних наук і технологій щиро вітає команду DonNTU_CSTF_United з перемогою та бажає успіхів у подальших виступах на наступних етапах олімпіади.</p><p style=\" text-align:right;\"><i>Відповідальний за проведення олімпіади у ДВНЗ «ДонНТУ»</i><br><i>доц. кафедри комп’ютерної інженерії Цололо С. О.</i></p>',
  'full_text_ru'=>'<p>5 марта 2017 в ГВУЗ «Донецкий национальный технический университет» прошел 1-й этап международной олимпиады «The ACM-ICPC International Collegiate Programming Contest 2017». Соревнования проводятся под эгидой Ассоциации вычислительной техники (ACM) при участии университета Бэйлора (<a href=\"https://icpc.baylor.edu\">https://icpc.baylor.edu</a>).</p><p>Главной особенностью соревнований является формат проведения. Команды получают от 8 до 15 задач, пишут решения на выбранном языке программирования и отправляют их на тестовый сервер. Программы тестируются на входных тестах, неизвестны участникам. Если программа выдала неправильный ответ или не уложилась в ограничения по времени / памяти, то команда получает сообщение об этом и может послать исправленную версию. Задача считается решенной, если программа выдала правильные ответы на всех тестах. Побеждает команда, которая решила правильно наибольшее число задач.</p><p>В 2017 году в 1-м этапе олимпиады в ГВУЗ «ДонНТУ» приняли участие семь команд, каждая из которых состояла из трех студентов факультета компьютерных наук и технологий. По результатам соревнований команда DonNTU_CSTF_United в составе Минь Ань - Нгуен, Ярослава Сафронова и Андрея Кузьменко (тренер - Оксана Золотухина) заняла первое место среди команд Донецкой области. Коллектив преподавателей и студентов факультета компьютерных наук и технологий поздравляет команду DonNTU_CSTF_United с победой и желает успехов в дальнейших выступлениях на следующих этапах олимпиады.</p><p style=\" text-align:right;\"><i>Ответственный за проведение олимпиады в ГВУЗ «ДонНТУ»</i><br><i>доц. кафедры компьютерной инженерии Цололо С. А.</i></p>',
  'full_text_en'=>'<p>1st stage of international competitions \"The ACM-ICPC International Collegiate Programming Contest 2017\" was held on March 25th, 2017 in SHEE \"Donetsk National Technical University\". Competitions are held under the auspices of the Association of Computing Technology (ACM) with participation of Baylor University (<a href=\"https://icpc.baylor.edu\">https://icpc.baylor.edu</a>).</p><p>The main feature is the format of the competition. Teams receive 8 to 15 tasks, write solutions in chosen programming language and send them to the test server. Applications are tested on input tests that are unknown to the participants. If the program gave the wrong answer or did not meet the time / memory limits, the command receives a message about this and can send the corrected version. The task is considered solved if the program has correctly answered all the tests. The team that has solved the greatest number of problems wins.</p><p>In 2017, seven teams took part in the first stage of the competition in DonNTU. Each of them consisted of three students of the Faculty of Computer Sciences and Technologies. According to the results of the competition, the team DonNTU_CSTF_United consisting of Minh Anh-Nguyen, Yaroslav Safronov and Andrey Kuzmenko (coach - Oksana Zolotukhina) took first place among the teams of the Donetsk region. The staff of teachers and students of the Faculty of Computer Sciences and Technologies congratulates the team DonNTU_CSTF_United on the victory and wishes successes at the next stages of the competition.</p><p style=\" text-align:right;\"><i>Responsible for conducting the competitions at DonNTU</i><br><i>Associate professor at Department of Computer Engineering Sergii Tsololo</i></p>',
  'short_text_uk'=>'<p>25 березня 2017 року в ДВНЗ «Донецький національний технічний університет» пройшов 1-й етап міжнародної олімпіади «The ACM-ICPC International Collegiate Programming Contest 2017». Змагання проводяться під егідою Асоціації обчислювальної техніки (ACM) за участі університета Бейлора (<a href=\"https://icpc.baylor.edu\">https://icpc.baylor.edu</a>).</p>',
  'short_text_ru'=>'<p>25 марта 2017 в ГВУЗ «Донецкий национальный технический университет» прошел 1-й этап международной олимпиады «The ACM-ICPC International Collegiate Programming Contest 2017». Соревнования проводятся под эгидой Ассоциации вычислительной техники (ACM) при участии университета Бэйлора (<a href=\"https://icpc.baylor.edu\">https://icpc.baylor.edu</a>).</p>',
  'short_text_en'=>'<p>1st stage of international competitions \"The ACM-ICPC International Collegiate Programming Contest 2017\" was held on March 25th, 2017 in SHEE \"Donetsk National Technical University\". Competitions are held under the auspices of the Association of Computing Technology (ACM) with participation of Baylor University (<a href=\"https://icpc.baylor.edu\">https://icpc.baylor.edu</a>).</p>',
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

if(!create_news(array( 'title_uk'=>'Студент ФКНТ став одним зі 100 переможців конкурсу «Авіатор 2017»','title_ru'=>'Студент ФКНТ стал одним из 100 победителей конкурса «Авиатор 2017»','title_en'=>'Student of FCST became one of 100 winners of competition «Aviator 2017»', 
  'full_text_uk'=>'<p>Дванадцятого квітня, у всесвітній День авіації та космонавтики, благодійний Фонд Бориса Колеснікова підвів підсумки освітнього проекту «Авіатор 2017» і оголосив імена переможців.</p><p>Конкурс покликаний підтримати студентів технічних спеціальностей з усієї України та заохотити кращих з них поїздками на міжнародні профільні виставки до Франції та Великобританії.</p><p>Студенти Донецького національного технічного університету  також брали активну участь у конкурсі. Двоє з них – Максим Лебединський (ФКІТАЕР) і Андрій Бардаков (ФКНТ) дійшли навіть до п’ятого етапу та їздили до Харкова, де проходив захист їх власних проектів перед компетентним журі.</p><p>За результатами очного туру, Андрій Бардаков, ст. гр. КІ-14б, увійшов до числа ста переможців.</p><p>«Представлений мною проект полягав у поданні концепції мікропроцесорної системи управління сегментами крила зі змінним профілем. Захищати його було нескладно. Набагато складніше було його створити. Певних складнощів додало також обмеження за часом, що виділявся на доповідь (всього 5 хвилин). Що ж до конкуренції, я її не відчував, оскільки ми не чули доповідей інших учасників. Так, дещо страшно було виступати перед журі, до складу якого входили представники авіації, конструкторських бюро, однак, все вдалося. Також хочу висловити величезну подяку Василю Петровичу Блощицькому, без якого моя участь у конкурсі була б неможливою», – ділиться враженнями Андрій.</p><p>Уже в червні щасливчики відправляться до Франції, де проведуть чотири незабутні дні: на них очікує відвідування Ле Бурже, спілкування з однолітками з інших країн і кращими фахівцями світової авіаційної спільноти.</p>',
  'full_text_ru'=>'<p>Двенадцатого апреля, во всемирный День авиации и космонавтики, благотворительный Фонд Бориса Колесникова подвел итоги образовательного проекта «Авиатор 2017» и объявил имена победителей.</p><p>Конкурс призван поддержать студентов технических специальностей со всей Украины и поощрить лучших из них поездками на международные профильные выставки во Францию и Великобританию.</p><p>Студенты Донецкого национального технического университета также принимали активное участие в конкурсе. Двое из них - Максим Лебединский (ФКИТАЕР) и Андрей Бардаков (ФКНТ) дошли даже до пятого этапа и ездили в Харьков, где проходила защита их собственных проектов перед компетентным жюри.</p><p>По результатам очного тура, Андрей Бардаков, ст. гр. КИ-14б, вошел в число ста победителей.</p><p>«Представленный мной проект заключался в представлении концепции микропроцессорной системы управления сегментами крыла с переменным профилем. Защищать его было несложно. Гораздо сложнее было его создать. Определенных сложностей добавило также ограничение по времени, выделяемом на доклад (всего 5 минут). Что касается конкуренции, я ее не чувствовал, поскольку мы не слышали докладов других участников. Так, несколько страшно было выступать перед жюри, в состав которого входили представители авиации, конструкторских бюро, однако, все удалось. Также хочу выразить огромную благодарность Василию Петровичу Блощицкому, без которого мое участие в конкурсе было бы невозможным», - делится впечатлениями Андрей.</p><p>Уже в июне счастливчики отправятся во Францию, где проведут четыре незабываемых дня: их ожидает посещение Ле Бурже, общения со сверстниками из других стран и лучшими специалистами мирового авиационного сообщества.</p>',
  'full_text_en'=>'<p>On April 12, in the World Day of Aviation and Cosmonautics, the charitable foundation of Boris Kolesnikov summed up the educational project \"Aviator 2017\" and announced the names of the winners.</p><p>The contest is intended to support students of technical specialties from all over Ukraine and encourage the best of them to travel to international profile exhibitions in France and the UK.</p><p>Students of the Donetsk National Technical University also took an active part in the competition. Two of them - Maxim Lebedinsky (FKITAER) and Andrei Bardakov (FCST) even got to the fifth stage and went to Kharkov, where they defended their own projects in front of the competent jury.</p><p>By the results of the on-site tour, Andrei Bardakov, a student of the KI-14b group, was among the hundred winners.</p><p>\"The project I presented was to introduce the concept of a microprocessor control system for wing segments with a variable profile. It was not difficult to defend it. It was much more difficult to create it. Certain limitations were also added by the time limit allocated to the report (only 5 minutes). As for the competition, I did not feel it, because we did not hear the reports of other participants. So, it was somewhat frightening to speak in front of the jury, which included representatives of aviation, design bureaus, however, everything was successful. I also want to express my deep gratitude to Vasily Petrovich Bloshchitsky, without whom my participation in the contest would be impossible\", - Andrii shares his impressions.</p><p>In June, the lucky ones will go to France, where they will spend four unforgettable days: they will visit Le Bourget, talk with peers from other countries and the best experts of the world aviation community.</p>',
  'short_text_uk'=>'<p>Дванадцятого квітня, у всесвітній День авіації та космонавтики, благодійний Фонд Бориса Колеснікова підвів підсумки освітнього проекту «Авіатор 2017» і оголосив імена переможців. За результатами очного туру, Андрій Бардаков, студент групи КІ-14б, увійшов до числа ста переможців.</p>',
  'short_text_ru'=>'<p>Двенадцатого апреля, во всемирный День авиации и космонавтики, благотворительный Фонд Бориса Колесникова подвел итоги образовательного проекта «Авиатор 2017» и объявил имена победителей. По результатам очного тура, Андрей Бардаков, ст. гр. КИ-14б, вошел в число ста победителей.</p>',
  'short_text_en'=>'<p>On April 12, in the World Day of Aviation and Cosmonautics, the charitable foundation of Boris Kolesnikov summed up the educational project \"Aviator 2017\" and announced the names of the winners. By the results of the on-site tour, Andrei Bardakov, a student of the KI-14b group, was among the hundred winners.</p>',
  ),$db)){

  $success = false;
}

if(!create_image(array('news_id'=>9),$db)){
  $success = false;
}
if(!create_news(array( 'title_uk'=>'Пам’яті ФЕЛЬДМАНА Льва Петровича','title_ru'=>'Памяти ФЕЛЬДМАНА Льва Петровича','title_en'=>'In memory of Lev Petrovich FELDMAN', 
  'full_text_uk'=>'<p>Факультет комп’ютерних наук і технологій, кафедра прикладної математики та інформатики Донецького національного технічного університету з великим сумом повідомляє, що 17 квітня 2017 року на 94-му році життя після тривалої хвороби помер видатний вчений в галузі комп’ютерних систем і комп’ютерного моделювання, ветеран Великої Вітчизняної війни, доктор технічних наук, професор, Лауреат Державної премії України в галузі науки і техніки ФЕЛЬДМАН Лев Петрович.</p><p>Лев Петрович пройшов славний життєвий шлях. Він народився 5 листопада 1923 року в місті Керенську Пензенської області. У липні 1941 року вступив добровольцем до лав Радянської армії і пройшов всю війну у військах протиповітряної оборони. У 1946 році Лев Петрович вступає на механіко-математичний факультет Московського Державного університету, який з відзнакою закінчує в 1951 році. Десять років після університету Лев Петрович пропрацював в Новочеркаському політехнічному інституті на кафедрі теоретичної механіки. Тут в листопаді 1960 року Фельдман Л.П. захистив кандидатську дисертацію.</p><p>У 1963 році Лев Петрович перейшов працювати в Донецький політехнічний інститут. Тут Лев Петрович став засновником і рушійною силою комп’ютерного вектору розвитку Донбасу. Під його керівництвом і за його безпосередньої участі в Донецькому політехнічному інституті було створено кафедри електронних обчислювальних машин, прикладної математики та інформатики, обчислювальних методів і програмування, які повністю забезпечили потреби народного господарства Донбасу в фахівцях комп’ютерного напрямку.</p><p>Лев Петрович в 1974 році захистив докторську дисертацію, в 2009 році отримав Державну премію України в галузі науки і техніки. Він є автором понад 200 наукових праць і 6 монографій. Під його науковому керівництві захищені 15 кандидатських і 4 докторських дисертації.</p><p>Колективи факультету комп’ютерних наук і технологій, кафедри прикладної математики та інформатики сумують у зв’язку зі смертю Фельдмана Л.П. і висловлюють глибокі співчуття рідним і близьким покійного. Світла пам’ять про Льва Петровича назавжди залишиться в серцях всіх, хто його знав.</p>',
  'full_text_ru'=>'<p>Факультет компьютерных наук и технологий, кафедра прикладной математики и информатики Донецкого национального технического университета с прискорбием сообщает, что 17 апреля 2017 года на 94-м году жизни после продолжительной болезни скончался выдающийся ученый в области компьютерных систем и компьютерного моделирования, ветеран Великой Отечественной войны, доктор технических наук, профессор, Лауреат Государственной премии Украины в области науки и техники Фельдман Лев Петрович.</p><p>Лев Петрович прошел славный жизненный путь. Он родился 5 ноября 1923 года в городе Керенске Пензенской области. В июле 1941 года вступил добровольцем в ряды Советской армии и прошел всю войну в войсках противовоздушной обороны. В 1946 году Лев Петрович вступает на механико-математический факультет Московского Государственного университета, который с отличием заканчивает в 1951 году. Десять лет после университета Лев Петрович проработал в Новочеркасском политехническом институте на кафедре теоретической механики. Здесь в ноябре 1960 года Фельдман Л.П. защитил кандидатскую диссертацию.</p><p>В 1963 году Лев Петрович перешел работать в Донецкий политехнический институт. Здесь Лев Петрович стал основателем и движущей силой компьютерного вектора развития Донбасса. Под его руководством и при его непосредственном участии в Донецком политехническом институте были созданы кафедры электронных вычислительных машин, прикладной математики и информатики, вычислительных методов и программирования, которые полностью обеспечили потребности народного хозяйства Донбасса в специалистах компьютерного направления.</p><p>Лев Петрович в 1974 году защитил докторскую диссертацию, в 2009 году получил Государственную премию Украины в области науки и техники. Он является автором более 200 научных работ и 6 монографий. Под его научным руководством защищены 15 кандидатских и 4 докторских диссертации.</p><p>Коллективы факультета компьютерных наук и технологий, кафедры прикладной математики и информатики скорбят в связи со смертью Фельдмана Л.П. и выражают глубокие соболезнования родным и близким покойного. Светлая память о Льве Петровиче навсегда останется в сердцах всех, кто его знал.</p>',
  'full_text_en'=>'<p>The Faculty of Computer Science and Technology, the Department of Applied Mathematics and Informatics of Donetsk National Technical University sadly reports that on April 17, 2017, an outstanding scientist in the field of computer systems and computer modeling, a veteran of the Great Patriotic War, doctor of Technical Sciences, Professor, Laureate of the State Prize of Ukraine in the field of science and technology Lev Petrovich Feldman died on the 94th year of life after a long illness.</p><p>Lev Petrovich passed a glorious life. He was born on November 5, 1923 in the city of Kerensk, Penza region. In July 1941, joined a volunteer in the ranks of the Soviet Army and went through the whole war in the air defense forces. In 1946, Lev Petrovich entered the Mechanics and Mathematics Faculty of Moscow State University, graduating with honors in 1951. Ten years after the university, Lev Petrovich worked at the Novocherkassk Polytechnic Institute at the Department of Theoretical Mechanics. Here in November 1960 Lev Petrovich Feldman defended his thesis.</p><p>In 1963, Lev Petrovich moved to work at the Donetsk Polytechnic Institute. Here, Lev Petrovich became the founder and driving force of the computer vector of the development of the Donbass. Under his leadership and with his direct participation in the Donetsk Polytechnic Institute, the departments of electronic computers, applied mathematics and computer science, computational methods and programming were created, which fully provided the needs of the national economy of Donbass in computer specialists.</p><p>Lev Petrovich defended his doctoral dissertation in 1974, in 2009 he received the State Prize of Ukraine in the field of science and technology. He is the author of more than 200 scientific papers and 6 monographs. Under his scientific guidance, 15 candidate and 4 doctoral dissertations were defended.</p><p>Collectives of the Faculty of Computer Science and Technology, the Department of Applied Mathematics and Informatics mourn in connection with the death of Lev Petrovich Feldman and express deep condolences to his relatives and friends. A bright memory of Lev Petrovich will always remain in the hearts of everyone who knew him.</p>',
  'short_text_uk'=>'<p>Факультет комп’ютерних наук і технологій, кафедра прикладної математики та інформатики Донецького національного технічного університету з великим сумом повідомляє, що 17 квітня 2017 року на 94-му році життя після тривалої хвороби помер видатний вчений в галузі комп’ютерних систем і комп’ютерного моделювання, ветеран Великої Вітчизняної війни, доктор технічних наук, професор, Лауреат Державної премії України в галузі науки і техніки ФЕЛЬДМАН Лев Петрович.</p>',
  'short_text_ru'=>'<p>Факультет компьютерных наук и технологий, кафедра прикладной математики и информатики Донецкого национального технического университета с прискорбием сообщает, что 17 апреля 2017 года на 94-м году жизни после продолжительной болезни скончался выдающийся ученый в области компьютерных систем и компьютерного моделирования, ветеран Великой Отечественной войны, доктор технических наук, профессор, Лауреат Государственной премии Украины в области науки и техники Фельдман Лев Петрович.</p>',
  'short_text_en'=>'<p>The Faculty of Computer Science and Technology, the Department of Applied Mathematics and Informatics of Donetsk National Technical University sadly reports that on April 17, 2017, an outstanding scientist in the field of computer systems and computer modeling, a veteran of the Great Patriotic War, doctor of Technical Sciences, Professor, Laureate of the State Prize of Ukraine in the field of science and technology Lev Petrovich Feldman died on the 94th year of life after a long illness.</p>',
  ),$db)){

  $success = false;
}
if(!create_image(array('news_id'=>10),$db)){
  $success = false;
}
if(!create_news(array( 'title_uk'=>'ІІ-й етап всеукраїнської олімпіади за напрямом «Комп’ютерна інженерія»','title_ru'=>'ІІ-й етап всеукраїнської олімпіади за напрямом «Комп’ютерна інженерія»','title_en'=>'ІІ-й етап всеукраїнської олімпіади за напрямом «Комп’ютерна інженерія»', 
  'full_text_uk'=>'<p>11-12 квітня 2017 року в ДВНЗ «Кременчуцький національний університет ім. М. Остроградського» пройшов ІІ-й етап всеукраїнської олімпіади за напрямом «Комп’ютерна інженерія» зі спеціальності «Комп’ютерні системи та мережі». Представниками ДонНТУ на цій олімпіаді були студенти груп КІ-13 ФКНТ Гринюк Богдан та Грищенков Дмитро.</p><p>Олімпіада відбулася 11 квітня. На офіційному відкритті організатори привітали всіх учасників,  розповіли про порядок проведення олімпіади та побажали усім студентам успіхів. Після 4 годин олімпіади, для всіх учасників була організована екскурсія по Кременчуку. Наступного дня відбулося нагородження переможців та закриття олімпіади.</p><p>За результатами олімпіади студенти ДонНТУ зайняли 6 та 21 місця. В ході олімпіади вони набули необхідного досвіду та з радістю передадуть його наступним учасникам, які поїдуть до Кременчука в наступному році. Побажаємо успіхів нашим студентам!</p>',
  'full_text_ru'=>'<p>11-12 апреля 2017 года в ДВНЗ «Кременчугский национальный университет им. М. Остроградского» прошел II-й этап всеукраинской олимпиады по направлению «Компьютерная инженерия» по специальности «Компьютерные системы и сети». Представителями ДонНТУ на этой олимпиаде были студенты групп КИ-13 ФКНТ Гринюк Богдан и Грищенков Дмитрий.</p><p>Олимпиада состоялась 11 апреля. На официальном открытии организаторы поздравили всех участников, рассказали о порядке проведения олимпиады и пожелали всем студентам успехов. После 4 часов олимпиады для всех участников была организована экскурсия по Кременчугу. На следующий день состоялось награждение победителей и закрытие олимпиады.</p><p>По результатам олимпиады студенты ДонНТУ заняли 6 и 21 места. В ходе олимпиады они приобрели необходимый опыт и с радостью передадут его следующим участникам, которые поедут в Кременчуг в следующем году. Пожелаем успехов нашим студентам!</p',
  'full_text_en'=>'<p>April 11-12, 2017 in the Kremenchug National University named after M. Ostrogradsky the II stage of the all-Ukrainian Competition in the direction of \"Computer Engineering\" specializing in \"Computer systems and networks\" took place. Representatives of DonNTU in this Competition were students of groups KI-13 FCST Bogdan Grinyuk and Dmitry Grishchenkov.</p><p>The Competition was held on April 11. At the official opening, the organizers congratulated all the participants, told about the procedure of the Competition and wished all the students success. After 4 hours of competition an excursion to Kremenchug was organized for all participants. The next day the winners were awarded and the Competition was closed.</p><p>According to the results of the Competition, DonNTU students took 6th and 21st places. During the Competition they acquired the necessary experience and would happily transfer it to the next participants who will travel to Kremenchug next year. We wish success to our students!</p',
  'short_text_uk'=>'<p>11-12 квітня 2017 року в ДВНЗ «Кременчуцький національний університет ім. М. Остроградського» пройшов ІІ-й етап всеукраїнської олімпіади за напрямом «Комп’ютерна інженерія» зі спеціальності «Комп’ютерні системи та мережі». Представниками ДонНТУ на цій олімпіаді були студенти груп КІ-13 ФКНТ Гринюк Богдан та Грищенков Дмитро.</p>',
  'short_text_ru'=>'<p>11-12 апреля 2017 года в ДВНЗ «Кременчугский национальный университет им. М. Остроградского» прошел II-й этап всеукраинской олимпиады по направлению «Компьютерная инженерия» по специальности «Компьютерные системы и сети». Представителями ДонНТУ на этой олимпиаде были студенты групп КИ-13 ФКНТ Гринюк Богдан и Грищенков Дмитрий.</p>',
  'short_text_en'=>'<p>April 11-12, 2017 in the Kremenchug National University named after M. Ostrogradsky the II stage of the all-Ukrainian Competition in the direction of \"Computer Engineering\" specializing in \"Computer systems and networks\" took place. Representatives of DonNTU in this Competition were students of groups KI-13 FCST Bogdan Grinyuk and Dmitry Grishchenkov.</p>',
  ),$db)){

  $success = false;
}
if(!create_image(array('news_id'=>11),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>11),$db)){
  $success = false;
}
if(!create_news(array( 'title_uk'=>'День науки','title_ru'=>'День науки','title_en'=>'Science Day', 
  'full_text_uk'=>'<p>25.04.2017 пройшов День науки факультету комп\'ютерних наук і технологій. О 13.00 у ВНЗ третього навчальний корпусу відбулося пленарне засідання, після чого студенти розійшлися по своїх кафедрах для виступів зі своїми докладами.</p><p>Багато студентів і викладачів факультету долучилися до цього заходу. Пленарне засідання розпочалося вступним словом декана ФКНТ Ковальова Сергія Олександровича, який розповів про цей захід та його мету. </p><p>Першою представила кафедру прикладної математики і інформатики Дмитрієва О.А. Вона повідомила основні напрямки роботи кафедри, розповіла про розробки і дослідження студентів в галузі науки. Також Ольга Анатоліївна ознайомила присутніх з проектом GameHub, його структурою та метою. Оскільки після засідання кафедр відбулося відкриття цього проекту в університеті, всіх бажаючих було запрошено взяти участь в тренінгах, присвячених цій події.</p><p>Завідувач кафедри комп’ютерних наук Федоров Є.Є. розповів про течії роботи, з якими працює кафедра. Велику увагу приділив методам роботи штучного інтелекту та його аналізу. Ознайомив з тим, що саме було зроблено в рамках такого проекту, і як студенти працюють в цій сфері.</p><p>Нікульчев М.О. представив кафедру філософії - мабуть, саму незвичну кафедру факультету. Студенти ознайомилися із задачами та науковими напрямками цієї спеціальності. Микола Олександрович також розповів про участь студентів та магістрантів факультету у нещодавній міжнародній конференції у Львові.</p><p>Про кафедру комп’ютерної інженерії розповів завідувач Святний В.А. Особливу увагу було приділено науковим аспектам співпраці нашого університету з Німеччиною та отриманню стипендій та грантів за кордоном. Присутніх познайомили з розробкою методів інженерії та їх вживання на практиці.</p><p>Золотухіна О.А. презентувала саме результати студентів ФКНТ всіх спеціальностей в різних галузях. Розповіла про ідеї, як саме можна впровадитися в галузь науки, як взяти участь в заходах, які направлені саме на студентську громаду (олімпіади, наукові конференції, форуми, тренінги тощо).</p><p>Після пленарного засідання всі присутні заходу розійшлися по своїх кафедрах, де мали можливість представити свої доповіді та роботи.</p><p>Дякуємо всім студентам та викладачам, які взяли участь в такій важливій події для факультету. Бажаємо студентам та магістрантам подальшого творчого натхнення для майбутніх наукових розробок.</p>',
  'full_text_ru'=>'<p>25.04.2017 прошел День науки факультета компьютерных наук и технологий. В 13.00 в БНЗ третьего учебного корпуса состоялось пленарное заседание, после чего студенты разошлись по своим кафедрам для выступлений со своими докладами.</p><p>Многие студенты и преподаватели факультета присоединились к этому мероприятию. Пленарное заседание началось вступительным словом декана ФКНТ Ковалева Сергея Александровича, который рассказал об этом мероприятии и его цели. </p><p>Первой представила кафедру прикладной математики и информатики Дмитриева О.А. Она сообщила основные направления работы кафедры, рассказала о разработке и исследованиях студентов в области науки. Также Ольга Анатольевна ознакомила присутствующих с проектом GameHub, его структуре и целях. Поскольку после заседания кафедр состоялось открытие этого проекта в университете, все желающие были приглашены принять участие в тренингах, посвященных этому событию.</p><p>Заведующий кафедрой компьютерных наук Федоров Е.Е. рассказал о направлениях работы, с которыми работает кафедра. Большое внимание уделил методам работы искусственного интеллекта и его анализа. Ознакомил с тем, что именно было сделано в рамках такого проекта, и как студенты работают в этой сфере.</p><p>Никульчев Н.А. представил кафедру философии - пожалуй, самую необычную кафедру факультета. Студенты ознакомились с задачами и научными направлениями этой специальности. Николай Александрович также рассказал об участии студентов и магистрантов факультета в недавней международной конференции во Львове.</p><p>О кафедре компьютерной инженерии рассказал заведующий Святный В.А. Особое внимание было уделено научным аспектам сотрудничества нашего университета с Германией и получению стипендий и грантов за рубежом. Присутствующих ознакомили с разработкой методов инженерии и их применение на практике.</p><p>Золотухина О.А. представила результаты именно студентов ФКНТ всех специальностей в различных отраслях. Рассказала об идеях, как можно внедриться в отрасль науки, как принять участие в мероприятиях, направленных именно на студенческую общину (олимпиады, научные конференции, форумы, тренинги и т.д.).</p><p>После пленарного заседания все присутствующие мероприятия разошлись по своим кафедрам, где имели возможность представить свои доклады и работы.</p><p>Спасибо всем студентам и преподавателям, которые приняли участие в таком важном событии для факультета. Желаем студентам и магистрантам дальнейшего творческого вдохновения для будущих научных разработок.</p>',
  'full_text_en'=>'<p>April 25, 2017 the Day of Science of the Faculty of Computer Science and Technology took place. At 13.00, in a large inclined hall of the third academic building, a plenary session took place, after which the students returned to their departments for presentations with their reports.</p><p>Many students and faculty members joined this event. The plenary session began with an introductory speech by the dean of the FCST, Sergei Alexandrovich Kovalev, who talked about this event and its objectives. </p><p>First Olga Dmitrieva introduced the Department of Applied Mathematics and Informatics. She reported the main directions of the department\'s work, told about the development and research of students in the field of science. Also Olga Anatolyevna introduced the GameHub project, its structure and goals. Since after the meeting of the departments the opening of this project was held at the university, everyone was invited to take part in trainings dedicated to this event.</p><p>Head of the Department of Computer Science Yevgeny Fedorov spoke about the directions of work with which the department works. He paid a lot of attention to the methods of work with artificial intelligence and its analysis. He also introduced those present to what was done in such a project, and how students work in this field.</p><p>Nikolai Nikulchev introduced the Department of Philosophy - perhaps the most unusual department of the faculty. The students got acquainted with the tasks and scientific directions of this specialty. Nikolay Alexandrovich also spoke about the participation of students and undergraduates of the faculty in the recent international conference in Lviv.</p><p>The head of the department Vladimir Svyatny told us about the department of computer engineering. Particular attention was paid to the scientific aspects of cooperation between our university and Germany and the receipt of scholarships and grants abroad. The attendees were introduced to the development of engineering methods and their application in practice.</p><p>Oksana Zolotukhina presented the results of the FCST students of all specialties in various fields. She told about ideas, how to get involved in the field of science, how to take part in activities aimed specifically at the student community (competitions, scientific conferences, forums, trainings, etc.).</p><p>After the plenary all the attendees returned to their departments for presentations with their reports and works.</p><p>Thank you to all the students and teachers who took part in such an important event for the faculty. We wish students and undergraduates further creative inspiration for future scientific developments</p>',
  'short_text_uk'=>'<p>25.04.2017 пройшов День науки факультету комп\'ютерних наук і технологій. О 13.00 у ВНЗ третього навчальний корпусу відбулося пленарне засідання, після чого студенти розійшлися по своїх кафедрах для виступів зі своїми докладами.</p><p>Багато студентів і викладачів факультету долучилися до цього заходу. Пленарне засідання розпочалося вступним словом декана ФКНТ Ковальова Сергія Олександровича, який розповів про цей захід та його мету. </p>',
  'short_text_ru'=>'<p>25.04.2017 прошел День науки факультета компьютерных наук и технологий. В 13.00 в БНЗ третьего учебного корпуса состоялось пленарное заседание, после чего студенты разошлись по своим кафедрам для выступлений со своими докладами.</p><p>Многие студенты и преподаватели факультета присоединились к этому мероприятию. Пленарное заседание началось вступительным словом декана ФКНТ Ковалева Сергея Александровича, который рассказал об этом мероприятии и его цели. </p>',
  'short_text_en'=>'<p>April 25, 2017 the Day of Science of the Faculty of Computer Science and Technology took place. At 13.00, in a large inclined hall of the third academic building, a plenary session took place, after which the students returned to their departments for presentations with their reports.</p><p>Many students and faculty members joined this event. The plenary session began with an introductory speech by the dean of the FCST, Sergei Alexandrovich Kovalev, who talked about this event and its objectives. </p>',
  ),$db)){

  $success = false;
}
if(!create_image(array('news_id'=>12),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>12),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>12),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>12),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>12),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>12),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>12),$db)){
  $success = false;
}


if(!create_news(array( 'title_uk'=>'Українсько-німецьке співробітництво: підготовка в ДонНТУ фахівців за програмою подвійних дипломів з комп’ютерної інженерії','title_ru'=>'Украинско-немецкое сотрудничество: подготовка в ДонНТУ специалистов по программе двойных дипломов по компьютерной инженерии','title_en'=>'Ukrainian-German cooperation: training in DonNTU of specialists within double degree program in computer engineering', 
  'full_text_uk'=>'<p>24 квітня ДонНТУ відвідала поважна комісія  DAAD у складі керівника відділу проектів співпраці у Європі, Південному Кавказі та Центральній Азії Німецької служби академічних обмінів у Бонні, доктора Рандольфа Обершмідта, професора, доктора Франка Гольчевського (Університет, м. Гамбург) та професора, доктора Клауса Раля (Технічний університет Гамбург-Гарбург). Метою візиту було оцінювання перспектив впровадження українсько-німецької програми подвійних дипломів за напрямом підготовки «комп’ютерна інженерія». Такий проект було ініційовано трьома українськими вишами: Донецьким національним технічним університетом, Київським політехнічним інститутом та Харківською політехнікою.</p><p>Гостей привітали ректор Я. Ляшок та проректор з міжнародних зв’язків І. Швець. Член комісії ознайомилися із станом професійної і мовної підготовки майбутніх фахівців з комп’ютерної інженерії, лабораторною базою Університету. Гості визнали, що кафедра комп’ютерної  інженерії має тривалий досвід партнерських відносин з університетами Магдебурга і Штутгарта, засновником та багаторічним науковим керівником якого є професор Володимир Андрійович Святний, завідувач кафедри комп’ютерної інженерії.</p><p>Завдяки багаторічній співпраці професора В. Святного кафедра отримала міжнародне визнання. На кафедрі значна частина фахових дисциплін викладається  німецькою мовою. Випускники і студенти  кафедри проводять наукові дослідження та успішно захищають магістерські та дисертаційні роботи, працюють у вишах та на підприємствах Німеччини й України. Професор В. Святний провів презентацію досягнень кафедри у складі Німецького технічного факультету. Гості зустрілися з керівництвом університету, викладачами німецької мови, мали розмову зі студентами та магістрантами, відвідали лабораторії, навчальні аудиторії, бібліотеку.</p><p>Комісія схвально оцінила діяльність команди викладачів та студентів ДонНТУ, збереження найкращих традицій та академічного духу у непростих умовах існування і  прагнення стати активними партнерами європейської освітньої спільноти.</p><p style=\" text-align:right;\"><i>Оксана Верещак,</i><br><i>фахівець І категорії відділу міжнародних зв’язків</i></p><p style=\" text-align:right;\"><i>Оксана Попова,</i><br><i>асистент кафедри мовної підготовки</i></p>',
  'full_text_ru'=>'<p>24 апреля ДонНТУ посетила комиссия DAAD в составе руководителя отдела проектов сотрудничества в Европе, Южном Кавказе и Центральной Азии Германской службы академических обменов в Бонне, доктора Рандольфа Обершмидта, профессора, доктора Франка Гольчевського (Университет, г.Гамбург) и профессора, доктора Клауса Раля (технический университет Гамбург-Харбург). Целью визита было оценивание перспектив внедрения украинского-немецкой программы двойных дипломов по направлению «компьютерная инженерия». Такой проект был инициирован тремя украинскими вузами: Донецким национальным техническим университетом, Киевским политехническим институтом и Харьковской политехникой.</p><p>Гостей приветствовали ректор Я. Ляшок и проректор по международным связям И. Швец. Члены комиссии ознакомились с состоянием профессиональной и языковой подготовки будущих специалистов по компьютерной инженерии, лабораторной базой Университета. Гости признали, что кафедра компьютерной инженерии имеет длительный опыт партнерских отношений с университетами Магдебурга и Штутгарта, основателем и многолетним научным руководителем которого является профессор Владимир Андреевич Святный, заведующий кафедрой компьютерной инженерии.</p><p>Благодаря многолетнему сотрудничеству профессора В. Святного кафедра получила международное признание. На кафедре значительная часть профессиональных дисциплин преподается на немецком языке. Выпускники и студенты кафедры проводят научные исследования и успешно защищают магистерские и диссертационные работы, работают в вузах и на предприятиях Германии и Украины. Профессор В. Святный провел презентацию достижений кафедры в составе Немецкого технического факультета. Гости встретились с руководством университета, преподавателями немецкого языка, беседовали со студентами и магистрантами, посетили лаборатории, учебные аудитории, библиотеку.</p><p>Комиссия положительно оценила деятельность команды преподавателей и студентов ДонНТУ, сохранение лучших традиций и академического духа в сложных условиях существования и стремление стать активными партнерами европейской образовательного сообщества.</p><p style=\" text-align:right;\"><i>Оксана Верещак,</i><br><i>специалист I категории отдела международных связей</i></p><p style=\" text-align:right;\"><i>Оксана Попова,</i><br><i>ассистент кафедры языковой подготовки</i></p>',
  'full_text_en'=>'<p>On April 24, DonNTU was visited by the DAAD Commission, which included the Head of the Division for Cooperation Projects in Europe, the South Caucasus and Central Asia of the German Academic Exchange Service in Bonn, Doctor of Science Randolph Oberschmidt, Professor, Dr. Frank Golczewski (University, Hamburg), and Professor, Doctor of Science Klaus Rahl (Technical University of Hamburg-Harburg). The purpose of the visit was to assess the prospects for the introduction of the Ukrainian-German program of double degrees in the specialty of \"computer engineering\". Such a project was initiated by three Ukrainian universities: Donetsk National Technical University, Kyiv Polytechnic Institute and Kharkiv Polytechnic.</p><p>The guests were welcomed by the rector Jaroslav Lyashok and the Vice-Rector for International Relations Irina Shvets. The commission members got acquainted with the state of professional and language training of future specialists in computer engineering, the laboratory base of the University. The guests recognized that the Department of Computer Engineering has a long experience of partnerships with the universities of Magdeburg and Stuttgart, the founder and long-time supervisor of which is Professor Vladimir Andreevich Svyatny, Head of the Department of Computer Engineering.</p><p>Thanks to the long-term cooperation of Professor V. Svyatny, the department received international recognition. At the department a significant part of professional disciplines is taught in German. Graduates and students of the department conduct scientific research and successfully defend master\'s and dissertational works, work in universities and enterprises of Germany and Ukraine. Professor V. Svyatny gave a presentation of the achievements of the department as part of the German Technical Faculty. Guests met with the university administration, teachers of the German language, talked with students and undergraduates, visited laboratories, classrooms, the library.</p><p>The Commission positively assessed the activity of the team of teachers and students of DonNTU, the preservation of the best traditions and academic spirit in difficult conditions of existence and the desire to become active partners of the European educational community.</p><p style=\" text-align:right;\"><i>Oksana Vereshchak,</i><br><i>Specialist of the I category of the International Relations Department</i></p><p style=\" text-align:right;\"><i>Oksana Popova,</i><br><i>Assistant of the Department of Language Training</i></p>',
  'short_text_uk'=>'<p>24 квітня ДонНТУ відвідала поважна комісія  DAAD у складі керівника відділу проектів співпраці у Європі, Південному Кавказі та Центральній Азії Німецької служби академічних обмінів у Бонні, доктора Рандольфа Обершмідта, професора, доктора Франка Гольчевського (Університет, м. Гамбург) та професора, доктора Клауса Раля (Технічний університет Гамбург-Гарбург). Метою візиту було оцінювання перспектив впровадження українсько-німецької програми подвійних дипломів за напрямом підготовки «комп’ютерна інженерія». Такий проект було ініційовано трьома українськими вишами: Донецьким національним технічним університетом, Київським політехнічним інститутом та Харківською політехнікою.</p>',
  'short_text_ru'=>'<p>24 апреля ДонНТУ посетила комиссия DAAD в составе руководителя отдела проектов сотрудничества в Европе, Южном Кавказе и Центральной Азии Германской службы академических обменов в Бонне, доктора Рандольфа Обершмидта, профессора, доктора Франка Гольчевського (Университет, г.Гамбург) и профессора, доктора Клауса Раля (технический университет Гамбург-Харбург). Целью визита было оценивание перспектив внедрения украинского-немецкой программы двойных дипломов по направлению «компьютерная инженерия». Такой проект был инициирован тремя украинскими вузами: Донецким национальным техническим университетом, Киевским политехническим институтом и Харьковской политехникой.</p>',
  'short_text_en'=>'<p>On April 24, DonNTU was visited by the DAAD Commission, which included the Head of the Division for Cooperation Projects in Europe, the South Caucasus and Central Asia of the German Academic Exchange Service in Bonn, Doctor of Science Randolph Oberschmidt, Professor, Dr. Frank Golczewski (University, Hamburg), and Professor, Doctor of Science Klaus Rahl (Technical University of Hamburg-Harburg). The purpose of the visit was to assess the prospects for the introduction of the Ukrainian-German program of double degrees in the specialty of \"computer engineering\". Such a project was initiated by three Ukrainian universities: Donetsk National Technical University, Kyiv Polytechnic Institute and Kharkiv Polytechnic.</p>',
  ),$db)){

  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
if(!create_image(array('news_id'=>13),$db)){
  $success = false;
}
/*
if(!create_news(array( 'title_uk'=>'','title_ru'=>'','title_en'=>'', 
  'full_text_uk'=>'<p></p>',
  'full_text_ru'=>'<p></p>',
  'full_text_en'=>'<p></p>',
  'short_text_uk'=>'<p></p>',
  'short_text_ru'=>'<p></p>',
  'short_text_en'=>'<p></p>'
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

