<?
/*=== Берём имя файла из file.id и удаляем его, удаляем запись ===
 На входе:
	id - указатель записи в таблице file
	$usrId - Из куки
=================================================================*/
$usrId = 1; //Тестовая версия - только один юзер
ini_set('display_errors', 1);//Выводить ошибки в браузер
if(!$usrId)	exit ('{"err" : "error: !user id"}');
if(isset($_GET['id'])) $id = (int)$_GET['id'];
else exit ('{"err" : "error: error !id"}'); 

$config = require __DIR__.'/inc/config.php';
require __DIR__.'/inc/DB.php';

$DOC_DIR = $config['doc_dir'];

$sql="SELECT * FROM file WHERE user_id=$usrId AND id = $id";
if(!$res = DB::$jd->query($sql)) exit(json_encode(["err" => "err del - SELECT from file"]));
$row = $res->fetch_assoc();

$fn = $DOC_DIR.$row['name'];
if(file_exists($fn)){//Удаляем файл если есть
	if(!unlink($fn)) exit('{"err":"error deleting file from disk"}');
}

$sql = "DELETE FROM file WHERE id=$id";
if(!DB::$jd->query($sql)) exit('{"err":"error deleting file from db"}');

exit('{"err":""}');
