<?PHP
/*Используем information_schema - column_comment для хранения расширенной инфы о типе.
	Из комментов получаем тип (правило проверки данных) в формате: tel|текст комментария
	где tel - правило проверки
	-------------------------
	На входе
		1. $table_name
		2. $fieldName
	На выходе
		Идентификатор правила проверки например: tel
*/

//Получим правило проверки данных
$sql='SELECT column_comment as note, character_maximum_length as len, data_type as type
FROM information_schema.columns 
WHERE table_schema="'.$config['db_name'].
'" AND table_name="'.$table_name.
'" AND column_name="'.$fieldName.'"';

if(!$res = DB::$jd->query($sql)) exit('{"err" : "err SELECT column_comment"}');
$row = $res->fetch_assoc();
$t = explode('|',$row['note']);
return $t[0];