function init(){
	jQuery('#form-mar').css("display","none");
	jQuery('#form-ar').css("display","none");
	
	
	
	var json = $.parseJSON(localStorage.alinarg);
	
	for( var i=0,j = json.length;i<j;i++){

		if (json[i].id == "押金代码" ){
			document.getElementsByName("dcode")[0].value = json[i].s_arg;
			document.getElementsByName("text")[0].value = json[i].s_formula;
			return false;
		}

	}		
			
}


document.getElementById('btn-cancel').onclick = function () {
	art.dialog.data('bParameter','{"ok":"0"}');// 取消
	art.dialog.close();
};	


function btn_cash(){
	
	var asJson = '{"arg":"1111"}'
	
	art.dialog.data('aParameter', asJson );// 存储数据
	
	art.dialog.open('cash-posting-credit-cash.html', {
		title: '现金',
		width: 800,
		height: 600,
		close: function () {
			var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
			if (bJson.ok == '1'){
				document.getElementsByName("dcode")[0].value = bJson.dcode;
				document.getElementsByName("text")[0].value = bJson.text;
				document.getElementsByName("credit")[0].value = bJson.credit;
			}
		}
	}, false);
}

function btn_other(){
	
	var asJson = '{"arg":"1111",'
	asJson +=  '"dcode":"' + document.getElementsByName("dcode")[0].value + '",';
	asJson +=  '"text":"' + document.getElementsByName("text")[0].value + '",';
	asJson +=  '"credit":"' + document.getElementsByName("credit")[0].value + '"}';

	art.dialog.data('aParameter', asJson );// 存储数据
	
	art.dialog.open('cash-posting-credit-cash.html', {
		title: '支票、其它',
		width: 800,
		height: 600,
		close: function () {
			var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
			if (bJson.ok == '1'){
				document.getElementsByName("dcode")[0].value = bJson.dcode;
				document.getElementsByName("text")[0].value = bJson.text;
				document.getElementsByName("credit")[0].value = bJson.credit;
			}
		}
	}, false);
}
