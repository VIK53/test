<?PHP
/*======== Сохраняем все input'ы здесь ================
 На входе:
 id - указатель записи в таблице,  
 n  - аттрибут name у input, равен имени поля в таблице
 v  - значение для сохранения.
======================================================*/
ini_set('display_errors', 1);//Выводить ошибки в браузер
$config = require __DIR__.'/inc/config.php';
require __DIR__.'/inc/DB.php';

if(isset($_GET['id'])){
	$id = (int)$_GET['id'];
}else exit(json_encode(["err" => "!input data id"]));

if(isset($_GET['n'])){ //имя поля
	$fieldName = preg_replace("/([^a-z0-9_\$])/ui", '', $_GET['n']);
}else echo json_encode(["err" => "!input data n"]);

if(isset($_GET['v'])){ // данные
	$value = trim($_GET['v']);
}else echo json_encode(["err" => "!input data v"]);

if($fieldName === 'fileNote'){
	$fieldName = 'note';
	$table_name='file';
}else $table_name='user';

/*Получим правило проверки данных из information_schema
На входе 1.$table_name 2.$fieldName */
$checkRule = require __DIR__.'/inc/getCheckRule.php';

/*Проверим $value по полученному правилу
На входе 1.checkRule 2.$value*/
$value = require __DIR__.'/inc/setCheckRule.php';

$value = DB::$jd->real_escape_string($value); //Паранойя
$sql="UPDATE $table_name SET $fieldName='$value' WHERE `id`=$id";

if( DB::$jd->query($sql) ) echo json_encode(["err" => ""]);
else echo json_encode(["err" => "UPDATE err"]);
