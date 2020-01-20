function open(){
	
	var sParameter = document.getElementById("Parameter").innerHTML;
	window.jParameter =  $.parseJSON(sParameter)
	switch ( window.jParameter.action) {
	   case ("新建"):
			break;
	   case ("修改"):
			retrieve_edit();
			break;
	   default:
	}	

	add_select_rev_type();
	add_select_market();
	add_select_source();
	add_select_payment();
	
}

function retrieve_edit(){
	
	var jsonstr;
	jQuery.ajax( {  
		  type : 'GET',  
		  url : '../data/reservation_edit.txt',  
		  data : jsonstr,
		  dataType : 'json',  
		  success : function(data) {  
				window.reservation = data;
				var form = document.getElementById("frm_guest")
				fill( form );
				
		  },  
		  error : function(data) {  
				alert("json reservation_edit error");
		  }  
	  });
	  
}

function fill( form ){
		var i = 0;
		var max = form.elements.length;
		var e,name,lastarr;
		var tmpstr;
		// 循环处理form的元素
		for (i=0; i < max; i++) {
			e = form.elements[i];
			
			var json =  window.reservation[0]
			e.value = json[e.name];
			
			//alert("name="+e.name+"\ntype="+e.type+"\nvalue="+e.value)
			
			
			
			name = e.name;	
		};
	
}

function add_select_rev_type(){
	var jsonstr;
	jQuery.ajax( {  
		  type : 'post',  
		  url : '../data/rev_type.txt',  
		  data : jsonstr,
		  dataType : 'text',
		  contentType: 'text/html;charset=ansi',  
		  success : function(data) { 
		  
	//	  		var data = '[{"c_sort":2,"descript1":"普通订房","code":"1"},{"c_sort":3,"descript1":"已确认订房","code":"2"},{"c_sort":6,"descript1":"无担保","code":"4"},{"c_sort":4,"descript1":"担保","code":"3"}]'
		  
				var select=document.getElementById("select_rev_type");
				var rJson =  window.reservation[0];
				fill_select( select,data,rJson["rev_type"] );
		  },  
		  error : function(data) {  
				alert("json rev_type error");
		  }  
	  });

}

function add_select_market(){
	var jsonstr;
	jQuery.ajax( {  
		  type : 'post',  
		  url : '../data/market.txt',  
		  data : jsonstr,
		  dataType : 'text',
		  contentType: 'application/x-www-form-urlencoded; charset=ansi',  
		  success : function(data) { 
		  
		  		//var data = '[{"c_sort":2,"descript1":"普通订房","code":"1"},{"c_sort":3,"descript1":"已确认订房","code":"2"},{"c_sort":6,"descript1":"无担保","code":"4"},{"c_sort":4,"descript1":"担保","code":"3"}]'
		  
			   // alert( bytes2BSTR(data) );
				var select=document.getElementById("select_market");
				var rJson =  window.reservation[0];
				fill_select( select,data,rJson["market"] );
		  },  
		  error : function(data) {  
				alert("json market error");
		  }  
	  });

}

function add_select_source(){
	var jsonstr;
	jQuery.ajax( {  
		  type : 'post',  
		  url : '../data/source.txt',  
		  data : jsonstr,
		  dataType : 'text',
		  contentType: 'application/x-www-form-urlencoded; charset=utf-8',  
		  success : function(data) { 
		  
		  		//var data = '[{"c_sort":2,"descript1":"普通订房","code":"1"},{"c_sort":3,"descript1":"已确认订房","code":"2"},{"c_sort":6,"descript1":"无担保","code":"4"},{"c_sort":4,"descript1":"担保","code":"3"}]'
		  
				var select=document.getElementById("select_source");
				var rJson =  window.reservation[0];
				fill_select( select,data,rJson["source"] );
		  },  
		  error : function(data) {  
				alert("json source error");
		  }  
	  });

}
function add_select_payment(){
	var jsonstr;
	jQuery.ajax( {  
		  type : 'post',  
		  url : '../data/payment.txt',  
		  data : jsonstr,
		  dataType : 'text',
		  contentType: 'application/x-www-form-urlencoded; charset=utf-8',  
		  success : function(data) { 
		  
		  		//var data = '[{"c_sort":2,"descript1":"普通订房","code":"1"},{"c_sort":3,"descript1":"已确认订房","code":"2"},{"c_sort":6,"descript1":"无担保","code":"4"},{"c_sort":4,"descript1":"担保","code":"3"}]'
		  
				var select=document.getElementById("select_payment");
				var rJson =  window.reservation[0];
				fill_select( select,data,rJson["payment"] );
		  },  
		  error : function(data) {  
				alert("json payment error");
		  }  
	  });

}


function fill_select( select,data,value ){
	var json = $.parseJSON(data);
	var x = 0;
	for (i=0; i < json.length; i++) {
		select.options.add(new Option(json[i].text,json[i].code));
		if (json[i].code== value ){
			x = i;
		}
	}
	options[x].defaultSelected = true;  
	options[x].selected = true;
}

function select( sName ){
	switch ( sName ) {
	   case ("comp_features"):
//			var sObj = "{'arg':'" + document.getElementsByName("comp_features")[0] + "'}";
			var iObj = document.getElementsByName("comp_features")[0];
			var Title = "选房特征";
			selectdialog( Title,iObj )
			break;
	   case ("special"):
			var iObj = document.getElementsByName("special")[0];
			var Title = "特殊要求";
			selectdialog( Title,iObj )
			break;
	   default:
	}	
}


function rcode_search(){

	iObj = document.getElementsByName("rcode")[0];
	rateObj = document.getElementsByName("rate")[0];
	rmtypeObj =	document.getElementsByName("rmtype")[0];
	
	var asJson = '{"rcode":"' + iObj.value + '","rate":"' + rateObj.value + '","rmtype":"' + rmtypeObj.value + '"}'
	
	art.dialog.data('aParameter', asJson );// 存储数据
	
	art.dialog.open('rcode-search.html', {
		title: '费率查询',
		width: 1280,
		height: 700,
		close: function () {
			var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
			if (bJson.ok == '1'){ 
				iObj.value = bJson.rcode;
				document.getElementsByName("rate")[0].value = bJson.rate;
				document.getElementsByName("rmtype")[0].value = bJson.rmtype;
				
			}
		}
	}, false);
}



function rmtype_available(){

	iObj = document.getElementsByName("rmtype")[0];
	
	var asJson = '{"arg":"' + iObj.value + '"}'
	
	art.dialog.data('aParameter', asJson );// 存储数据
	
	art.dialog.open('rmtype-available.html', {
		title: '选择房型',
		width: 620,
		height: 600,
		close: function () {
			var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
			if (bJson.ok == '1') iObj.value = bJson.arg;
		}
	}, false);
}





function rooms_serach(){

	iObj = document.getElementsByName("room")[0];
	
	var asJson = '{"arg":"' + iObj.value + '"}'
	
	art.dialog.data('aParameter', asJson );// 存储数据
	
	art.dialog.open('rooms-serach.html', {
		title: '房间搜索',
		width: 1280,
		height: 700,
		close: function () {
			var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
			if (bJson.ok == '1') iObj.value = bJson.arg;
		}
	}, false);
}



if (art.dialog.data('test')) {
	document.getElementById('aInput').value = art.dialog.data('test');// 获取由主页面传递过来的数据
};

// 传递给B页面
function selectdialog(Title,iObj) {
	var asJson = '{"title":"' + Title + '" ,"arg":"' + iObj.value + '"}'
	
	art.dialog.data('aParameter', asJson );// 存储数据
	
	art.dialog.open('select-dict.html', {
		title: Title,
		width: 420,
		height: 600,
		close: function () {
			var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
			if (bJson.ok == '1') iObj.value = bJson.arg;
		}
	}, false);
};

// 关闭并返回数据到主页面
document.getElementById('exit').onclick = function () {
	var origin = artDialog.open.origin;
	var aValue = document.getElementById('aInput').value;
	var input = origin.document.getElementById('demoInput04-3');
	input.value = aValue;
	input.select();
	art.dialog.close();
};

// 刷新主页面
document.getElementById('reload').onclick = function () {
	art.dialog.data('iframeTools', '我知道你刷新了页面～哈哈'); // plugin.iframe.html可以收到
	var win = art.dialog.open.origin;//来源页面
	// 如果父页面重载或者关闭其子对话框全部会关闭
	win.location.reload();
	return false;
};

