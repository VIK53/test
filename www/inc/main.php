<?PHP
$userId = 1;//Тестовая версия - только один пользователь

$sql='SELECT column_name, column_comment, character_maximum_length, data_type
FROM information_schema.columns 
WHERE table_schema="'.$config['db_name'].'" AND table_name="user"';

if(!$res = DB::$jd->query($sql)) exit("error $sql");
$row = $res->fetch_all();
/* Делаем из $row такой массив $field: ================================================
[name] => Array( 	// имя поля в качестве ключа массива
	[0] => text|Имя	// comment (символом | разделяем правило проверки и комментарий поля)
	[1] => 120)  		// maximum_length
======================================================================================*/
$field = [];
foreach($row as $v)	$field[$v[0]] = array_slice($v, 1); //echo '<pre>'.print_r($field,1).'</pre>';
unset($field['id']);

if($userId){
	$sql="SELECT * FROM user WHERE id=$userId";
	if(!$res = DB::$jd->query($sql)) exit(json_encode(["err" => "err SELECT from user = $userId"]));
	$row = $res->fetch_assoc();
}

echo '<form class=VIK>';
foreach($field as $k => $v){//Выводим поля для редактирования
	$t = explode('|',$v[0]);
	echo "<div class='cap' >$t[1]</div>"."<input data-id=$userId type=text name='$k' value='$row[$k]' maxlength='$v[1]'>";
}
echo '<p>Не корректные данные выделяются красным цветом.</p>';
echo '<p>Размер загружаемого файла не более 2 МБ, допустимые расширения: gif, png, jpg, pdf, doc, docx, odt, xls, txt, rtf, sig.</p>';

echo '<label class=upload>';
echo '<div>Добавить файл</div><input type="file" name="file" multiple>';
echo '</label>';

echo '<div class=VIK_user_doc>';
if($userId){ //Выводим список файлов пользоватея $userId
	$sql="SELECT * FROM file WHERE user_id=$userId ORDER BY id DESC";
	if(!$res = DB::$jd->query($sql)) exit(json_encode(["err" => "err SELECT from file"]));
	while($row = $res->fetch_assoc()){
		echo "<div><input data-id='$row[id]' data-fn='$row[name]' type='text' name='fileNote' value='$row[note]'></div>";
	}
}
echo '</div>';
echo "</form>\n";
