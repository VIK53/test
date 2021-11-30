<?PHP
/* Проверяем $value на соответствие правилу $checkRule
	На входе
		1. $checkRule
		2. $value
	На выходе
		$value
*/

if($checkRule === 'text'){ // Проверка только текста rus lat
	//$value = preg_replace("/([^a-zа-яёЁ0-9 _-])/ui", '', $value);
	if(!preg_match('/^[a-zа-яёЁ ]{2,200}$/ui',$value)) exit('{"err" : "Non correct text"}');

}elseif($checkRule === 'tel'){ // Проверка номера телефона
	if(!preg_match('/^[0-9+-]{5,16}$/ui',$value)) exit('{"err" : "Non correct phone"}');

}elseif($checkRule === 'fname'){ // Имена файлов
	if(!preg_match('/^[-a-zа-яё0-9\(\)\[\]\._]{1,240}$/ui',$value)) exit('{"err" : "Non correct file name'.$value.'"}');

}elseif($checkRule === 'mail'){ // Проверка емайл
	if(!filter_var($value, FILTER_VALIDATE_EMAIL)) exit('{"err" : "Non correct email"}');

}elseif($checkRule === 'int') $value = (int)$value; // Тип int

else exit(json_encode(["err" => "!checkRule"])); // Если не найдено правило

return $value;