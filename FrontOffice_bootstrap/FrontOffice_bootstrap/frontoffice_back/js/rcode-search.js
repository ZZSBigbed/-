	window.onload = function() { 
		//retrieve_rmtype();
		//retrieve_rate();
		//alert( "111" );

	}; 	
	

	function IFrameResize(){  
	  
	// alert(this.document.body.scrollHeight); //弹出当前页面的高度  
	 var obj = parent.document.getElementById("tab_Document6");  //取得父页面IFrame对象  
	// alert(obj.height); //弹出父页面中IFrame中设置的高度  
	 obj.height = this.document.body.scrollHeight;  //调整父页面中IFrame的高度为此页面的高度  
	  
	}


	
	function retrieve_rmtype(){
		//房型可用做为字段头
		var jsonstr;
		jQuery.ajax( {  
			  type : 'GET',  
			  url : 'data/RmtypeAvailable.txt',  
			  data : jsonstr,
			  dataType : 'json',  
			  success : function(data) {
//				    alert( data.data[0].rmtype );
					window.rmtype = data.data;
					maketablethead( data.data );
					
			  },  
			  error : function(data) {  
					alert("json RmtypeAvailable error");
			  }  
		  });
		  
	}	
	
	function maketablethead( json ){	
		//动态生成列表头
		for( var i=0,j = json.length;i<j;i++){
			addth( json[i].rmtype,json[i].ho_rmtype_text,json[i].c_ava );
		}		
	}

	function addth( rmtype,ho_rmtype_text,c_ava ){
		var app = '<th name ="'
		    app += rmtype + '" >'
			app += '<p class="text-muted">' + rmtype + '</p>' 
			app += '<p class="text-muted">' + ho_rmtype_text + '</p>' 
			app += '<p class="text-primary">' + c_ava + '</p>'
		    app += '</th>'
//			alert( app );
		$('#tblRcode > thead >tr').append( app );
	}



	function retrieve_rate(){
		//
		var jsonstr;
		jQuery.ajax( {  
			  type : 'GET',  
			  url : 'data/rmtyperate.txt',  
			  data : jsonstr,
			  dataType : 'json',  
			  success : function(data) {
					window.rate = data.data;
					maketabletbody( data.data );
					set_parameter();
				    jQuery('.tooltips').tooltip({ container: 'body'});
					jQuery('.popovers').popover();
					
			  },  
			  error : function(data) {  
					alert("json rmtyperate error");
			  }  
		  });
		  
	}	

	function maketabletbody( json ){	
		//动态生成tbody内容
		for( var i=0,j = json.length;i<j;i++){
			addtd( json[i] );
		}		
	}

	function addtd( json ){
		var app = '<tr >'
			app += '<td class="item" onclick="cleartpopover();">'
			app += json.rcode
			app += '</td>'
			app += '<td class="item" onclick="cleartpopover();">'
			app += json.text
			app += '</td>'
		for( var i=0,j = window.rmtype.length;i<j;i++){
			//alert( json.ST );
			//alert( window.rmtype[i].rmtype );
			var title = '全价： ' + json[window.rmtype[i].rmtype]
//			app += '<td onclick="selecttd(this)" class="tooltips" data-toggle="tooltip" data-placement="top" title="" data-original-title="'+ title+ '">'
			app += '<td onclick="selecttd(this)" title="' + json.rcode + '" data-original-title="" class="popovers" data-container="body" data-toggle="popover" data-placement="top" data-content="' + title + '">'
			app += json[window.rmtype[i].rmtype]
			app += '</td>'
			
		}		
		app += "</tr>"
		$('#tblRcode > tbody').append( app );
	}

	function selecttd( td ){
		cleartpopover();			 		

        var tdSeq = td.cellIndex;                //列
        var trSeq = td.parentNode.rowIndex;      //行

		var nThs = $('th',$('#tblRcode thead tr'))
		var rmtype =$("p",$(nThs[tdSeq]))[0].textContent;   //列名
		
		var nTds = $('td', $(td).parent());
		var rcode = $(nTds[0]).text();		

		var rate = td.textContent;

		window.para = '{"ok":"1","rmtype":"' + rmtype + '","rate":"' + rate + '","rcode":"' + rcode + '"}'
		
		cleartdselected();
			 
		$(td).addClass("selected").siblings().removeClass("selected");			 

//		
//		art.dialog.data('bParameter',window.para );// 存储数据
//		art.dialog.close();
	}
	
	// 返回数据给A页面
	document.getElementById('btn-ok').onclick = function () {
		art.dialog.data('bParameter',window.para );// 存储数据
		art.dialog.close();
	};

	document.getElementById('btn-cancel').onclick = function () {
		art.dialog.data('bParameter','{"ok":"0"}');// 取消
		art.dialog.close();
	};	
	
	function set_parameter( ){
		//添加列表选择初值
		jPara = $.parseJSON(art.dialog.data('aParameter'));
		var nThs = $('th',$('#tblRcode thead tr'))

		$('#tblRcode tbody tr').each( function() {
			var nTds = $('td', this);
			if ($(nTds[0]).text()==jPara.rcode){
				$('td', this).each(function(index, element) {
						var rmtype =$("p",$(nThs[index]))[0].textContent;   //列名
						var rate = element.textContent;
						if ( rmtype == jPara.rmtype ){
							if(rate == jPara.rate){
								$(element).addClass("selected0");
								//$(element).setAttribute( 'style', 'color:#F00' );
							}
						}
				});
			}
		} );
	}	

	function cleartdselected(){	
		$('#tblRcode tbody tr').each( function() {
			var nTds = $('td', this);
			$('td', this).each(function(index, element) {
				if (index > 0){ 
					$(element).removeClass("selected");
				}
			});
		} );	
	}

	function cleartpopover(){	
		//通过class获取元素
		paras = document.getElementsByClassName('popover');
		for(i=0;i<paras.length;i++){
			 //删除元素 元素.parentNode.removeChild(元素);
			if (paras[i] != null) 
				  paras[i].parentNode.removeChild( paras[i]); 
		}		
	}


	document.getElementById('btn-condition').onclick = function () {
		var Title = "费率选择条件";
		var asJson = '{"title":"' + Title + '"}'
		
		
		art.dialog.data('aParameter', asJson );// 存储数据
		
		art.dialog.open('rcode-search-parameter.html', {
			title: Title,
			width: 800,
			height: 600,
			close: function () {
				//var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
				//if (bJson.ok == '1') iObj.value = bJson.arg;
			}
		}, true);
		
		
		
	};

