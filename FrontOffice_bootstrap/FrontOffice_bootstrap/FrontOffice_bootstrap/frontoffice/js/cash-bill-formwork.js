document.getElementById('btn-cancel').onclick = function () {
	art.dialog.data('bParameter','{"ok":"0"}');// 取消
	art.dialog.close();
};	

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
				//var form = document.getElementById("frm_guest")
				var form = document.getElementsByClassName ("fill") 
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
//		var max = form.elements.length;
		var max = form.length;
		
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
		json.printtime = CurentTime();
		
		for (i=0; i < max; i++) {
			//e = form.elements[i];
			e = form[i];
			e.innerHTML = json[e.id];
		};
	
}


function retrieve_gledger(){
	//向后台请求客人帐数据
	var jsonstr;
	jQuery.ajax( {  
		  type : 'GET',  
		  url : 'data/bill.txt',  
		  data : jsonstr,
		  dataType : 'json',  
		  success : function(data) {  
				window.bill = data;
				fillTblDetail(data.detail);
				fillTblTotal(data.total)
		  },  
		  error : function(data) {  
				alert("json bill error");
		  }  
	  });
	  
}

function fillTblDetail( jsondata ){		
	//填入主列表数据
	
	var exTable = jQuery('#tblDetail').DataTable({
		//测试
		"bLengthChange":false,
		"bPaginate":false,
		"bFilter": false,
		"bSort":false,
		//		
		"data": jsondata,
		"oLanguage": {                          //汉化
			"sInfo": ""
			},					  
		"aoColumns": [
			{ "data": "datetime"},
			{ "data": "text"},
			{ "data": "quantity"},
			{ "data": "debit" },
			{ "data": "credit"}
		],
		"order": [[1, 'asc']],
	 
	});

};

function fillTblTotal( jsondata ){		
	//填入主列表数据
	
	var exTable = jQuery('#tblTotal').DataTable({
		//测试
		"bLengthChange":false,
		"bPaginate":false,
		"bFilter": false,
		"bSort":false,
		//		
		"data": jsondata,
		"oLanguage": {                          //汉化
			"sInfo": ""
			},					  
		"aoColumns": [
			{ "data":  "dcode"},
			{ "data": "text"},
			{ "data": "quantity"},
			{ "data": "debit" },
			{ "data": "credit"}
		],
		"order": [[1, 'asc']],
	 
	});

};




function SetCwinHeight(obj) 
{   


var cwin=obj; 
if (document.getElementById) 
{ 
	if (cwin && !window.opera) 
		{ 
			if (cwin.contentDocument && cwin.contentDocument.body.offsetHeight) 
				 cwin.height = cwin.contentDocument.body.offsetHeight + 20; //FF NS 
			else if(cwin.Document && cwin.Document.body.scrollHeight) 
				cwin.height = cwin.Document.body.scrollHeight + 10;//IE 
		 } 
	else 
		{ 
			if(cwin.contentWindow.document && cwin.contentWindow.document.body.scrollHeight) 
			cwin.height = cwin.contentWindow.document.body.scrollHeight;//Opera 
		} 
	} 
} 


function iReload(){

	var val=$('input:radio[name="rLanguage"]:checked',window.parent.document).val();

	switch (val)
		{
			case "CN":
//				document.getElementById("pIframe").src = "cash-bill-cn.html";
				fill_formwork( "cash-bill-cn.html" );
				break;
			case "EN":
//				document.getElementById("pIframe").src = "cash-bill-en.html";
				fill_formwork( "cash-bill-en.html" );
				break;
			case "OT":
//				document.getElementById("pIframe").src = "cash-bill-formwork.html";
				fill_formwork( "cash-bill-ot.html" );
				break;
			default:
				// TODO
		}	

}

function iPrint(){
	 //printorder();
	 var iframe = document.getElementById('pIframe');
	 iframe.contentWindow.focus();
	 iframe.contentWindow.print();
	 

}

function fill_formwork( url ){
	//向后台请求客人帐数据
	var jsonstr;
	jQuery.ajax( {  
		  type : 'GET',  
		  url : url,  
		  data : jsonstr,
		  dataType : 'text',  
		  success : function(data) {  
			  var formwork = document.getElementById('formwork');
			  formwork.innerHTML =  data;
		  	  retrieve_edit();
  	  	      retrieve_gledger(); 
		  },  
		  error : function(data) {  
				alert("json url error");
		  }  
	  });
	  
}




function CurentTime()
    { 
        var now = new Date();
        
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();           //秒
        
        var clock = year + "-";
        
        if(month < 10)
            clock += "0";
        
        clock += month + "-";
        
        if(day < 10)
            clock += "0";
            
        clock += day + " ";
        
        if(hh < 10)
            clock += "0";
            
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm + ":"; 
         
        if (ss < 10) clock += '0'; 
        clock += ss; 
        return(clock); 
}

