
document.getElementById("btn-retrieve").onclick = function () {
 // var jsonArg = [{}]; 
//  var str = document.getElementById("txtFuzzySearch").value
//  if(str.length!=0){
//	  jsonArg.fuzzysearch = str;
//   }
//  var str = document.getElementById("txtRoom").value
//  if(str.length!=0){
//	  jsonArg.room = str;
//   }
//   if(jQuery.isEmptyObject(jsonArg)){
//	  //alert( "无查询条件" );
//	  return
//	}
//	
  //$('tbody').empty();
  //window.rdo_status = rdo_sele();

  retrieve_list(  );
  
};

document.getElementById("btn-search").onclick = function () {
//    var oTable = $("#tblList").dataTable();
//    oTable.fnFilterColumn(0,"35");

	filter_status( rdo_sele() );
  
};

function retrieve_list(){
	//向后台请求客人帐数据
	var jsonstr;
	jQuery.ajax( {  
		  type : 'GET',  
		  url : 'data/rsv-guest-search.txt',  
		  data : jsonstr,
		  dataType : 'json',  
		  success : function(data) {
				window.data = formatall(data);
				fillTblList( window.list_all );
		  },  
		  error : function(data) {  
				alert("json rsv-guest-search error");
		  }  
	  });
	  
}

function fillTblList( jsondata ){		
	//填入主列表数据
	
	var exTable = jQuery('#tblList').DataTable({
		responsive: true,
		"bDestroy":true,
		"fnInitComplete": function(oSettings) {
			jQuery('#tblList').css("width","100%");
			jQuery('#tblList_info').css("width","auto");
			jQuery('#tblList_paginate').css("width","auto");
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
			{ "data": "" },
			{ "data": "c_status"},
			{ "data": "message_c" },
			{ "data": "gname" },
			{ "data": "room" },
			{ "data": "rmtype" },
			{ "data": "arr_d" },
			{ "data": "exp_dep_d" },
			{ "data": "rooms" },
			{ "data": "room_status1"},
			{ "data": "rate"},
			{ "data": "package"},
			{ "data": "authoriacation"},
			{ "data": "balance"},
			{ "data": "special" },
			{ "data": "partycompany" },
			{ "data": "gno"},
			{ "data": "filter_party","bVisible": false },
			{ "data": "filter_company","bVisible": false }
		],
		"order": [[1, 'asc']],
	});
	
//	$(".table-huasheng").alterBgColor({ style: "4" }).find("room"); //可以链式操作
	resize();
};

document.getElementById("btnTest").onclick = function () {
	alert( selectRows() );					
};

$(document).ready(function () { 
	$(".table-huasheng").alterBgColor({ style: "4" }).find("room"); //可以链式操作  
});				

function selectRows (){
	var arrArg = new Array();
	var jsonData = {};
	var i = 0;
	$('#tblGuest tbody tr').each( function() {
		var chk=$(this).find('td').eq(0).find('input');
		if (chk.attr("checked")=="checked"){
			var arg={};
			var nTds = $('td', this);
			arg.sGno = $(nTds[1]).text();
			arg.sRoom = $(nTds[2]).text();
			arg.sGname = $(nTds[4]).text();
			
			arrArg[i] = arg;
			
			i++;
		}
	} );
	return JSON.stringify(arrArg);
}	

function formatall( jdata ){
	window.list_all = [{}];
	window.list_rsv = [{}];
	window.list_arr = [{}];
	window.list_in = [{}];
	var list_rsv_x = 0;
	var list_arr_x = 0;
	var list_in_x = 0;
	
	for( var i=0,j = jdata.length;i<j;i++){
		window.list_all[i] =format( jdata[i] );
		if(jdata[i].Status == 0 ){
		   window.list_rsv[list_rsv_x] =  jdata[i];
		   list_rsv_x ++
		}
		if(jdata[i].Status == 0 ){
		   window.list_arr[list_arr_x] =  jdata[i];
		   list_arr_x ++
		}
		if(jdata[i].Status > 0 && jdata[i].Status < 9){
		   window.list_in[list_in_x] =  jdata[i];
		   list_in_x ++
		}
	}	
}


//格式化数据
function format( data ){
	//生成message_c提示
	var str = '';
	if (data.trace != 0 ){str = '<code>?退</code>';}
	if (data.trace_ok != 0 ){str = '<code>OK</code>';}
	if (data.rmlinks != null ){str = str + '<code>' + data.rmlinks + '</code>'}
	
	if (data.vip != null ){str = str + '<span style="color:#3C763D;font-size:90%">' + data.vip + '</span>'}
	
	if (data.co_mess != null ){str = str + '<span style="color:#03F;font-size:90%">' + data.co_mess + '</code>'}
	data.message_c = str;

	if (data.Status == 9 ){data.c_status ='<span class="alert-danger">' + data.c_status + '</span>'}
	if (data.Status == 0 ){data.c_status ='<span class="alert-success">' + data.c_status + '</span>'}
	if (data.Status > 0 && data.Status < 9 ){data.c_status ='<span class="alert-info">' + data.c_status + '</span>'}
	if (data.Status < 0 ){data.c_status ='<span style="background-color:#666; color:#FFF;">' + data.c_status + '</span>'}
	
	if (data.balance < 0 ){data.balance ='<span style="color:#F00;">' + data.balance + '</span>'}

	str = '';
	if (data.party != null ){
		str ='<a href="#" onClick="filter_party(this.innerHTML);return false;">' + data.party + '</a>'
		data.filter_party = "小组:" + data.party ;
	}else{
		data.filter_party = null;
	}
	
	
	if (data.company != null ){
		str = str + '/' + '<a href="#" onClick="filter_company(this.innerHTML);return false;">' + data.company + '</a>'
		data.filter_company = "团队:" + data.company;
	}else{
		data.filter_company = null;
	}
	

	data.partycompany = str;
	
	
	
	
	return data;
}

//过滤条件
function filter_status( rdo_value ){
	switch ( rdo_value ) {
	   case ("opAll"):
			fillTblList( window.list_all );
			break;
	   case ("opRsv"):
			fillTblList( window.list_rsv );
			break;
	   case ("opArr"):
			fillTblList( window.list_arr );
			break;
	   case ("opIn"):
			fillTblList( window.list_in );
			break;
	   case ("opLedger"):
			fillTblList( window.list_in );
			break;
	   default:
	  	    return false;
	}
}


function resize( ){
	var main = $(window.parent.document).find("#tab_Document7");
	var thisheight = $(document).height()+20;
	main.height(thisheight);
}

function filter_party( text ){
    var oTable = $("#tblList").dataTable();
	
	var sSearch = $("input[type='search']").val();
	
	if ( sSearch=="小组:" + text){
	    oTable.fnFilter("");
	}else{
	    oTable.fnFilter("小组:" + text );
	}
}
function filter_company( text ){
    var oTable = $("#tblList").dataTable();
	var sSearch = $("input[type='search']").val();

	if ( sSearch=="团队:" + text){
	    oTable.fnFilter("");
	}else{
	    oTable.fnFilter("团队:" + text);
	}
}

function rdo_sele(){
	var op = 'opAll';
	var obj=document.getElementsByName("rao_status");
	for(var i=0;i<obj.length;i++)
	{
	  if(obj[i].checked)
	  {
		op = obj[i].id;
	  }
	}
	return op;
}

