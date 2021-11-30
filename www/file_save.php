<?
/*== Upload файла ======================================================
 На входе 
	1. массив $_FILES 
	2. $usrId ($usrId из куки)
 ---------------------------
 Принимаем данные формы $_FILES['files'], только один файл. 
 Генерируем уникальное имя и записываем файл в $config['doc_dir'], 
 старое имя файла тоже пишем в таблицу file.fileNote в качестве коммента
 Проверяем расширения файлов по $allowExt.
========================================================================*/
ini_set('display_errors', 1);//Выводить ошибки в браузер
$usrId = 1;//По идее мы должны получать usrId из куки
if(!$usrId)	exit('{"err":"!usrId"}');
if(!isset($_FILES['files'])) exit('{"err":"$_FILES not found"}');

$config = require __DIR__.'/inc/config.php';
require __DIR__.'/inc/DB.php';
$DOC_DIR = $config['doc_dir'];

$maxSize = 1024 * 1024 * 2;//2 Мегабайта
$allowExt = ['gif','png','jpg','pdf','doc','docx','odt','xls','txt','rtf','sig'];

function reArrayFiles($file){//https://www.php.net/manual/ru/features.file-upload.multiple.php
	$file_ary = array();
	$file_count = count($file['name']);
	$file_key = array_keys($file);
	for($i=0;$i<$file_count;$i++){
		foreach($file_key as $val){
			$file_ary[$i][$val] = $file[$val][$i];
    }
	}
	return $file_ary;
}

function uniq(){//Генерилка более короткого id
	$s = uniqid('');
	return base_convert($s,16,36);//Сократим на 3 символа
}

$files = reArrayFiles($_FILES['files']); //exit( '<pre>'.print_r($files,1) );
/*Получаем такой массив
	[0] => Array(
		[name] => foto.jpg
    [type] => image/jpeg
    [tmp_name] => /tmp/phpCbTED6
    [error] => 0
    [size] => 166953)
*/

$file = $files[0];
$fileNames='';
if ($file['size'] > $maxSize){
	$msgErr.='File size: '.$file['name'].' > '.($maxSize/1024/1024).'MB';
	exit('{"err":"'.$msgErr.'"}');
}
$t = explode('.', $file['name']);
$ext = end($t);
$ext = rtrim($ext);

if(!in_array($ext, $allowExt)){
	exit('{"err":"invalid type file"}');
}
$fn = uniq();
$fn .= ".$ext";
if(filesize($file['tmp_name']) > $maxSize) exit('{"err":"file size > 2MB"}');

if(move_uploaded_file($file['tmp_name'], $DOC_DIR.$fn)){
	$checkRule = 'fname';
	$value = preg_replace("/([^a-zа-яёЁ ]+)/ui", ' ', $file['name']);
	$value = DB::$jd->real_escape_string($value);//
	$sql = "INSERT INTO file SET user_id = $usrId, name = '$fn', note='$value'";
	if(!DB::$jd->query($sql)) exit('{"err":"err query INSERT INTO file"}');
	$t=[];
	$t['err'] = '';
	$t['id'] = DB::$jd->insert_id;
	$t['name'] = $fn;
	$t['orig_name'] = $value;
	echo json_encode($t);
}else{
	$t['err'] = 'err uploaded file';
	$t['orig_name'] = $value;
	exit( json_encode($t) );
}
