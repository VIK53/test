<?
class DB{//Для доступа из функций
	public static $jd;
}

DB::$jd = new mysqli("localhost",$config['db_usr'],$config['db_psw'],$config['db_name']);
if(DB::$jd->connect_errno) exit('{"err":"Ошибка соединения: '.DB::$jd->connect_error.'"}');
if(!DB::$jd->set_charset('utf8')) exit('{"err":"Ошибка при загрузке utf8"}');
?>