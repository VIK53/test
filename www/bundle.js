function ajax_get(e,t){xhr=new XMLHttpRequest,xhr.onreadystatechange=function(){if(4==xhr.readyState&&200==xhr.status){try{var n=JSON.parse(xhr.responseText)}catch(t){return console.info("url:",e),void console.error("response: ",xhr.responseText)}t(n)}},xhr.open("GET",e,!0),xhr.send()}window.URL=window.URL||window.webkitURL;var FUItmBox=document.querySelector(".FUItmBox"),MAX_FSIZE=2097152,MAX_FILES=5;function onChangeInput(){var e=this.getAttribute("name"),t=this.getAttribute("data-id"),n=encodeURIComponent(this.value),r=this;ajax_get("field_save.php?n="+e+"&id="+t+"&v="+n,(function(e){e.err?r.classList.add("alert"):r.classList.remove("alert")}))}function upload(){var e=this.files,t=e.length;if(!t)return alert("Файлы не выбраны."),!1;if(t>MAX_FILES)return alert("Можно загружать не более "+MAX_FILES+" фото"),!1;for(var n=0;n<t;n++)if(e[n].size>MAX_FSIZE)console.log("Превышение размера "+e[n].name+" лиммт: "+MAX_FSIZE/1048576+"МБ");else{var r=new XMLHttpRequest;r.onload=r.onerror=xhrOnload;var a=new FormData;a.append("files[]",e[n]),r.open("post","file_save.php"),r.send(a)}return!1}function xhrOnload(){if(200==this.status){var e=JSON.parse(this.responseText);if(e.err)return void console.log(e.err);console.log("Загружено: "+e.orig_name);var t=e.name,n=document.createElement("div");n.innerHTML='<input data-id="'+e.id+'" data-fn="'+t+'" type="text" name="fileNote" value="'+e.orig_name+'">',n.querySelector("input").onchange=onChangeInput,document.querySelector(".VIK_user_doc").prepend(n)}else console.log("error "+this.status)}for(var t=document.querySelectorAll('.VIK input[type="text"]'),i=0;i<t.length;i++)t[i].onchange=onChangeInput;var p=document.createElement("p");p.innerHTML="<span data-act=view>открыть</span> | <span data-act=del>удалить</span>",p.addEventListener("click",(function(){var e=event.target.getAttribute("data-act"),t=event.target.parentElement.parentElement,n=t.querySelector("input"),r=n.getAttribute("data-id"),a=n.getAttribute("data-fn");n.getAttribute("data-name");"view"===e?window.open("./upload/"+a,"_blank"):"del"===e&&ajax_get("del_file.php?id="+r,(function(e){e.err||t.remove()}))})),(t=document.querySelector('.VIK input[type="file"]')).addEventListener("change",upload);var user_doc_box=document.querySelector(".VIK_user_doc");user_doc_box.addEventListener("focusin",(function(){event.target.parentElement.append(p)}));
//# sourceMappingURL=bundle.js.map