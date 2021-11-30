<?PHP
$config = require __DIR__.'/inc/config.php';
require __DIR__.'/inc/DB.php';
?>
<!doctype html><html>
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" /> 
<meta charset="utf-8">
<title>Форма обратной связи с подгрузкой файлов</title>
<link rel="stylesheet" type="text/css" href="main.css?v=<?=$config['ver']?>">
<body>
	<header><h1>Ваши данные</h1>
	</header>
	<main>
		<?require __DIR__.'/inc/main.php'?>
	</main>
	<footer>
  	<div>Тестовое задание для ООО Гауф Рус.</div>
	</footer>
	<script src="bundle.js?v=<?=$config['ver']?>"></script>
</body>
</html>