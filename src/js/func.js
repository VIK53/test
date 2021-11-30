//Функции пишем здесь

export function ajax_get(url, callback) {
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			try {
				var data = JSON.parse(xhr.responseText);
			} catch(err) {
				console.info('url:', url);
				console.error('response: ', xhr.responseText);
				return;
			}
			callback(data);
		}
	}
	xhr.open("GET", url, true);
	xhr.send();
}
