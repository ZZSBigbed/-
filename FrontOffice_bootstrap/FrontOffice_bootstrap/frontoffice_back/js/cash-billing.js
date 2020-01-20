document.getElementById('btn-cancel').onclick = function () {
	art.dialog.data('bParameter','{"ok":"0"}');// 取消
	art.dialog.close();
};	

document.getElementById('btn-debit').onclick = function () {
	//alert("111");
	var Parameter = '{"action":"edit","room":"2012"}';

	var Title = "借方入帐";
	art.dialog.data('aParameter', Parameter );// 存储数据
	
	art.dialog.open("cash-posting-debit.html?Parameter='" + Parameter + "'", {
		title: Title,
		width: "80%",
		height: "70%",
		close: function () {
			//var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
			//if (bJson.ok == '1') iObj.value = bJson.arg;
		}
	}, false);
};	
document.getElementById('btn-credit').onclick = function () {
	//alert("111");
	var Parameter = '{"action":"edit","room":"2012"}';

	var Title = "贷方入帐";
	art.dialog.data('aParameter', Parameter );// 存储数据
	
	art.dialog.open("cash-posting-credit.html?Parameter='" + Parameter + "'", {
		title: Title,
		width: "60%",
		height: "60%",
		close: function () {
			//var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
			//if (bJson.ok == '1') iObj.value = bJson.arg;
		}
	}, false);
};	


document.getElementById('btn-print').onclick = function () {
	//alert("111");
	var Parameter = '{"action":"edit","room":"2012"}';

	var Title = "打印账单";
	art.dialog.data('aParameter', Parameter );// 存储数据
	
	art.dialog.open("cash-bill.html?Parameter='" + Parameter + "'", {
		title: Title,
		width: "80%",
		height: "90%",
		close: function () {
			//var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
			//if (bJson.ok == '1') iObj.value = bJson.arg;
		}
	}, false);
}






function retrieve_edit(){
	//向后台请求客人信息
	var jsonstr;
	jQuery.ajax( {  
		  type : 'GET',  
		  url : 'data/reservation_edit.txt',  
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
		//填客人信息
		var i = 0;
		var max = form.elements.length;
		var e,name,lastarr;
		var tmpstr;
		// 循环处理form的元素
		var json =  window.reservation[0]
		json.gname_fname = json.gname + ',' + json.fname;
		json.arr_dep = json.arr_d + ' ' + json.arr_t + '--' + json.exp_dep_d + ' ' + json.exp_dep_t;
		json.rcode_rate = '费率:' + json.rcode + ' ' + json.rate;
		json.payment_tit = '付款方式:' + json.payment;
		json.balance_tit = '余额:' + json.balance;
		json.rmtype_tit = '房型:' + json.rmtype;
		json.company_tit = '公司:' + json.company;
		json.group_tit = '团队:' + json.group_;
		json.party_tit = '小组:' + json.party;
		
		
		for (i=0; i < max; i++) {
			e = form.elements[i];
			
			e.value = json[e.name];
			e.innerHTML = json[e.name];
			
			//alert("name="+e.name+"\ntype="+e.type+"\nvalue="+e.value)
			
			
			
			name = e.name;	
		};
	
}


function retrieve_gledger(){
	//向后台请求客人帐数据
	var jsonstr;
	jQuery.ajax( {  
		  type : 'GET',  
		  url : 'data/ho_gledger.txt',  
		  data : jsonstr,
		  dataType : 'json',  
		  success : function(data) {  
				window.gledger = data;
				allRefresh();
		  },  
		  error : function(data) {  
				alert("json ho_gledger error");
		  }  
	  });
	  
}


function fillTblMain( jsondata ){		
	//填入主列表数据
	
	var exTable = jQuery('#tblMain').DataTable({
		responsive: true,
		"bDestroy":true,
		"fnInitComplete": function(oSettings) {
			jQuery('#tblMain').css("width","100%");
			jQuery('#tblMain_info').css("width","auto");
			jQuery('#tblMain_paginate').css("width","auto");
		},					
		"bPaginate": true, //翻页功能
		"bLengthChange": true, //改变每页显示数据数量
		"bFilter": true, //过滤功能
		"bSort": false, //排序功能
		"bInfo": true,//页脚信息
		"bAutoWidth": true,//自动宽度					
		
		
		"data": jsondata,
		"oLanguage": {
		  "sSearch": "搜索:",
		  "sLengthMenu": "每页显示 _MENU_ 条记录",
		  "sZeroRecords": "Nothing found - 没有记录",
		  "sInfo": "显示第  _START_ 条到第  _END_ 条记录,一共  _TOTAL_ 条记录",
		  "sInfoEmpty": "显示0条记录",
		  "oPaginate": {
		   "sPrevious": " 上一页 ",
		   "sNext":     " 下一页 ",
		   }
		  },		
		"columnDefs":[
						{"targets": 0,
						 "data": null,
						 "render": function ( ) {
								   return '<input type="checkbox" value="" name="tablechoice1" />';}
						 },											
					  ],
					  
		"aoColumns": [
			{ "data": "","sClass":"tblchecked" },
			{ "data": "dcode","sClass":"dcode" },
			{ "data": "text","sClass":"text" },
			{ "data": "datetime","sClass":"datetime" },
			{ "data": "debit","sClass":"debit" },
			{ "data": "credit","sClass":"credit"  },
			{ "data": "quantity","sClass":"right" },
			{ "data": "text12" },
			{ "data": "status" },
			{ "data": "userid" },
			{ "data": "win" }
		],
		"order": [[1, 'asc']],
	 
	});

};



function fillTblCoid( jsondata ){		
	//填入主列表数据
	
	var exTable = jQuery('#tblCoid').DataTable({
		responsive: true,
		"bDestroy":true,
		"fnInitComplete": function(oSettings) {
			jQuery('#tblCoid').css("width","100%");
			jQuery('#tblCoid_info').css("width","auto");
			jQuery('#tblCoid_paginate').css("width","auto");
		},					
		"bPaginate": true, //翻页功能
		"bLengthChange": true, //改变每页显示数据数量
		"bFilter": true, //过滤功能
		"bSort": false, //排序功能
		"bInfo": true,//页脚信息
		"bAutoWidth": true,//自动宽度					
		
		
		"data": jsondata,
		"oLanguage": {
		  "sSearch": "搜索:",
		  "sLengthMenu": "每页显示 _MENU_ 条记录",
		  "sZeroRecords": "Nothing found - 没有记录",
		  "sInfo": "显示第  _START_ 条到第  _END_ 条记录,一共  _TOTAL_ 条记录",
		  "sInfoEmpty": "显示0条记录",
		  "oPaginate": {
		   "sPrevious": " 上一页 ",
		   "sNext":     " 下一页 ",
		   }
		  },		
		"aoColumns": [
			{ "data": "dcode","sClass":"dcode" },
			{ "data": "text","sClass":"text" },
			{ "data": "datetime","sClass":"datetime" },
			{ "data": "debit","sClass":"debit" },
			{ "data": "credit","sClass":"credit"  },
			{ "data": "quantity","sClass":"right" },
			{ "data": "text12" },
			{ "data": "status" },
			{ "data": "userid" },
			{ "data": "coid" }
		],
		"order": [[1, 'asc']],
	 
	});

};




function allRefresh(){
	//全部刷新
	
	
	fillTblMain( tblMainJson() )
	
	fillTblCoid( tblCoidJson() )
	
}

function tblMainJson(){
	//生成主列表的数据
	window.win = 0;
	window.win0 = 0;
	window.win1 = 0;
	window.win2 = 0;
	window.win3 = 0;
	
	json = [{}];
	var x = 0 ;
	for( var i=0,j = window.gledger.length;i<j;i++){
		if (where(window.gledger[i])){
			json[x] = window.gledger[i];
			
			window.win ++
			if ( json[x].win == 0 )
				window.win0 ++
			if ( json[x].win == 1 )
				window.win1 ++
			if ( json[x].win == 2 )
				window.win2 ++
			if ( json[x].win == 3 )
				window.win3 ++
			
			x ++
		}	
	}
	
	document.getElementById('win').innerHTML = window.win;
	document.getElementById('win0').innerHTML = window.win0;
	document.getElementById('win1').innerHTML = window.win1;
	document.getElementById('win2').innerHTML = window.win2;
	document.getElementById('win3').innerHTML = window.win3;
	
	return json;
}

function tblCoidJson(){
	//生成结账列表的数据
	json = [{}];
	var x = 0 ;
	for( var i=0,j = window.gledger.length;i<j;i++){
		if ( window.gledger[i].coid!='0'){
			json[x] = window.gledger[i];
			x ++
		}	
	}
	return json;
}




function where( json ){
	//过滤条件
	return true;	
}

function fillWin( win ){
	//选择窗口tab
	json = [{}];
	var x = 0 ;
	for( var i=0,j = window.gledger.length;i<j;i++){
		if ( window.gledger[i].win == win || win == 9 ){
			json[x] = window.gledger[i];
			x ++
		}	
	}
	if (x > 0 ){
		fillTblMain( json )}
	else{
		jQuery('#tblMain').dataTable().fnClearTable(0);
		jQuery("#tblMain").dataTable().fnDraw(false)
			
	};


}



