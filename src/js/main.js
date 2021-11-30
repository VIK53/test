import {upload,onChangeInput} from './upload';
import {ajax_get} from './func';

var t=document.querySelectorAll('.VIK input[type="text"]');
for(var i=0; i< t.length;i++){
	t[i].onchange=onChangeInput;
}

var p = document.createElement('p');
p.innerHTML = '<span data-act=view>открыть</span> | <span data-act=del>удалить</span>';
p.addEventListener("click", function(){ 
	var act = event.target.getAttribute('data-act');
	var fileItemBox = event.target.parentElement.parentElement;
	var inputEl=fileItemBox.querySelector('input');
	var id = inputEl.getAttribute('data-id');
	var fn = inputEl.getAttribute('data-fn');
	var name = inputEl.getAttribute('data-name');
	var val = inputEl.value;
	if(act === 'view') window.open('./upload/' + fn, '_blank');
	else if(act === 'del'){
		ajax_get('del_file.php?id='+id, function(r){
			//console.log('r=',r);
			if(!r.err) fileItemBox.remove();
		})
	}
});

//Загрузка файлов
var t=document.querySelector('.VIK input[type="file"]');
t.addEventListener("change", upload);

//Панель кнопок "посмотреть | удалить"
var user_doc_box=document.querySelector('.VIK_user_doc');
user_doc_box.addEventListener("focusin", function(){ 
	var t = event.target;
	//console.log(t);
	var user_doc = t.parentElement;
	user_doc.append(p);
});
