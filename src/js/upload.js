import {ajax_get} from './func';

/*Загрузка файлов*/
window.URL = window.URL || window.webkitURL;
var FUItmBox = document.querySelector('.FUItmBox');
var MAX_FSIZE = 2*1024*1024,//2 МБайта
MAX_FILES = 5;

export function onChangeInput(){
	var inpName = this.getAttribute('name');
	var id = this.getAttribute('data-id');
	var v = encodeURIComponent(this.value);
	var that = this;
	ajax_get('field_save.php?n='+inpName+'&id='+id+'&v='+ v, function(r){
		if(r.err) that.classList.add("alert"); //alert(r.err);
		else that.classList.remove("alert");
	})
}

export function upload(){
	var target = e.target;
	var files = this.files;
	//var input_name = this.getAttribute('name');//
	//var id = this.getAttribute('data-id');
	var fNum = files.length;
	if(!fNum) {
   	alert("Файлы не выбраны.");
		return false;
	}else if(fNum >MAX_FILES){
   	alert("Можно загружать не более "+MAX_FILES+" фото");
		return false;
	}

  for(var i = 0; i < fNum; i++){
		if(files[i].size > MAX_FSIZE){
			console.log('Превышение размера ' + files[i].name + ' лиммт: ' + MAX_FSIZE/1048576 + 'МБ');
			continue;
		}
		var xhr = new XMLHttpRequest();
		xhr.onload = xhr.onerror = xhrOnload;

		var formData = new FormData();
		formData.append('files[]', files[i]);
		xhr.open("post", 'file_save.php');
	 	xhr.send(formData);
	}
	return false;
}

function xhrOnload(){
	if (this.status == 200) {
		//console.log('this.responseText=',this.responseText);
		var val = JSON.parse(this.responseText);
		if(!val.err) console.log('Загружено: ' + val['orig_name']);
		else{
			console.log(val.err);
			return;
		}
		var fn = val['name'];
		//Создаём элемента списка файлов
		var filesItem = document.createElement('div');
		filesItem.innerHTML = '<input data-id="' + val['id'] + '" data-fn="'+ fn +'" type="text" name="fileNote" value="' + val['orig_name'] + '">';
		filesItem.querySelector('input').onchange=onChangeInput;
		document.querySelector('.VIK_user_doc').prepend(filesItem);
	} else {
		console.log("error " + this.status);
	}
}