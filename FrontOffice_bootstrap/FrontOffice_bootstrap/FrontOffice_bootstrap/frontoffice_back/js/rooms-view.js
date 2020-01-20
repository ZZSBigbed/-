	function addroom( json,i ){
			<!--其它状态-->
			var div_ico = '<div class="img-gstatus">' 
			if (json.Skip == '1'){
				div_ico +=	'<img src="../images/roomstatus/room_status_skip.png" class="img-rmstatus" alt="room_status_skip" />' 
			}
			if (json.Sleep == '1'){
				div_ico +=	'<img src="../images/roomstatus/room_status_sleep.png" class="img-rmstatus" alt="room_status_sleep" />' 
			}
			if (json.CheckedIn == '1'){
				div_ico += '<img src="../images/roomstatus/room_status_checkin.png" class="img-rmstatus" alt="room_status_checkin" />' 
			}
			if (json.OUTHouse == '1'){
				div_ico +=	'<img src="../images/roomstatus/room_status_checkout.png" class="img-rmstatus" alt="room_status_checkout" />'
			}
			if (json.dayuse == '1'){
				div_ico +=	'<img src="../images/roomstatus/room_status_dayuse.png" class="img-rmstatus" alt="room_status_dayuse" />' 
			}
			if (json.Stayover == '1'){
				div_ico +=	'<img src="../images/roomstatus/room_status_stayover.png" class="img-rmstatus" alt="room_status_stayover" />'  
			}
			if (json.Depaturs == '1'){
				div_ico +=	'<img src="../images/roomstatus/room_status_dueout.png" class="img-rmstatus" alt="room_status_dueout" />' 
			}
			if (json.shared == '1'){
				div_ico +=	'<img src="../images/roomstatus/room_status_share.png" class="img-rmstatus" alt="room_status_share" />' 
			}
			if (json.O_Arrival == '1'){
				div_ico +=	'<img src="../images/roomstatus/room_status_oarrival.png" class="img-rmstatus" alt="room_status_oarrival" />' 
			}
			if (json.V_Arrival == '1'){
				div_ico +=	'<img src="../images/roomstatus/room_status_varrival.png" class="img-rmstatus" alt="room_status_varrival" />' 
			}
		div_ico += '</div>' 


		var ftps_= String(100 /window.ftps) ;
		
		
		var app = "";
		
		app += 	'<div class="col-xs-6 col-sm-4" style="width:' + ftps_ + '%;">'

		if (json.rmstatus == 'O'){
		app += 	  '<div id="'+ json.room + '" class="thmb-ftp thmb-ftp-occ" >'
		//app += 	  '<div id="'+ json.room + '" class="thmb-ftp" style ="border: 3px double #31708F;" >'
		}else{
		app += 	  '<div id="'+ json.room + '" class="thmb-ftp">'
		}
		app +=		  		  '<div class="ckbox ckbox-default">'  
		app +=					   '<input type="checkbox" id="check' + i + '" value="1" />' 
		app +=					   '<label for="check' + i + '"></label>'  
		app +=				  '</div>' 		
		app +=				  '<div>'
		app +=					  '<h5 class="fm-title-room">' + json.room + '</h5>'
		app +=					  div_ico
		app +=				  '</div>' 
		app +=				  '<small class="text-rmtype">'+ json.rmtype + '</small>' 
		app +=				  '<small class="text-muted">  '+ json.gname + '</small>' 

		
		if (json.hsk_status == 'OO'){
			app += 	  '<div class="thmb-status" ' + 'style="color:#' + window.ftp_oo_color + ';' + 'background-color:#' + window.ftp_oo_bgcolor +';">'
		}else if (json.hsk_status == 'OS'){
			app += 	  '<div class="thmb-status" ' + 'style="color:#' + window.ftp_os_color + ';' + 'background-color:#' + window.ftp_os_bgcolor +';">'
		}else if (json.hsk_status == 'DI'){
			app += 	  '<div class="thmb-status" ' + 'style="color:#' + window.ftp_di_color + ';' + 'background-color:#' + window.ftp_di_bgcolor +';">'
		}else if (json.hsk_status == 'CL'){
			app += 	  '<div class="thmb-status" ' + 'style="color:#' + window.ftp_cl_color + ';' + 'background-color:#' + window.ftp_cl_bgcolor +';">'
		}else{
			app += 	  '<div class="thmb-status">'
		}
		
		app +=         '<div class="height50">'
		app +=            '<small>'
			if (json.trace == '1'){app += '?退'}
			if (json.trace_ok == '1'){app += 'OK'}
		app +=            '</small>'
		
		app +=            '<small class="small-right">' + json.balance + '</small>'
		app +=		   '</div>' 
		app +=         '<div class="height50">'
		app +=            '<small>' + json.rmlinks + '</small>'
		app +=            '<small class="small-right">' + json.ass + '</small>'
		app +=		   '</div>' 
		app +=		'</div>' 
		
		app +=	  '</div><!-- thmb -->' 
		app +=	'</div><!-- col-xs-6 -->'
			
//		$('.media-manager').append( app );
		$('.col-md-8').append( app );
		
		return false;
   }
	function addblank( ){
		
		var ftps_= String(100 /window.ftps) ;
		
		var app = "";
		
		app += 	'<div class="col-xs-6 col-sm-4" style="width:' + ftps_ + '%;">'  
		app += 			   '<div class="thmb-blank">'
		app +=				'</div><!-- thmb -->' 
		app +=	'</div><!-- col-xs-6 -->'
//		$('.media-manager').append( app );
		$('.col-md-8').append( app );
		
		return false;
		
	}

   	function roomretrieve(){
		
				var jsonstr;
				jQuery.ajax( {  
					  type : 'GET',  
					  url : 'data/roomsview.txt',  
					  data : jsonstr,
					  dataType : 'text',  
					  success : function(data) {  
							window.roomsview = data;
							makeview( );
							
					  },  
					  error : function(data) {  
						    alert("json roomsview error");
					  }  
				  });		
	}
	
	function makeview( ){
//		var json = $.parseJSON(window.roomsview);
		var json = create_json();
		
		var floors = "";
		var ftps = window.ftps;
		if (json.length>0){
			floors = json[0].floor;	
		}
		
		for( var i=0,j = json.length;i<j;i++){

			ftps--;
			if(ftps==0){ ftps = window.ftps; };

			if (floors == json[i].floor){
				addroom( json[i],i );
			}else{			
				ftps++;
				for( var x=0; x < ftps && ftps!= window.ftps ;x++){
					addblank();
				}
				ftps = window.ftps;
				floors = json[i].floor;
			}


		}

		set_event();

		  $('.thmb-ftp').click(function(){
			 // alert( "111" );
			 // if (window.bBlock){
				    //window.bRoom = obj.id;
					art.dialog.confirm('你确认分房操作？', function(){
						var top = art.dialog.top,
							input = document.getElementById('demoInput02'),
							photo = top.document.getElementById('photo');
							
						if (input) input.parentNode.removeChild(input);
						if (photo) photo.innerHTML = '<img src="images/lixiaolong.png" />';
					}, function(){
						art.dialog.tips('你取消了操作');
					});		  
			 //}
		  });
				

	}
	
	function get_ftpcolor(){
		window.ftp0_di_color = "41464D";
		window.ftp0_di_bgcolor = "D2D5D8";
		window.ftp0_cl_color = "31708F";
		window.ftp0_cl_bgcolor = "FFFFFF";
		window.ftp0_oo_color = "FFFFFF";
		window.ftp0_oo_bgcolor = "A94442";
		window.ftp0_os_color = "FFFFFF";
		window.ftp0_os_bgcolor = "4E5154";
		
		
		window.ftp_di_color = getCookieValue("ftp_di_color");
		window.ftp_di_bgcolor = getCookieValue("ftp_di_bgcolor");
		window.ftp_cl_color = getCookieValue("ftp_cl_color");
		window.ftp_cl_bgcolor = getCookieValue("ftp_cl_bgcolor");
		window.ftp_oo_color = getCookieValue("ftp_oo_color");
		window.ftp_oo_bgcolor = getCookieValue("ftp_oo_bgcolor");
		window.ftp_os_color = getCookieValue("ftp_os_color");
		window.ftp_os_bgcolor = getCookieValue("ftp_os_bgcolor");
		
		
		if(window.ftp_di_color.length==0){window.ftp_occ_color=window.ftp0_di_color};
		if(window.ftp_di_bgcolor.length==0){window.ftp_occ_bgcolor=window.ftp0_di_bgcolor};
		if(window.ftp_cl_color.length==0){window.ftp_cl_color=window.ftp0_cl_color};
		if(window.ftp_cl_bgcolor.length==0){window.ftp_cl_bgcolor=window.ftp0_cl_bgcolor};
		if(window.ftp_oo_color.length==0){window.ftp_oo_color=window.ftp0_oo_color};
		if(window.ftp_oo_bgcolor.length==0){window.ftp_oo_bgcolor=window.ftp0_oo_bgcolor};
		if(window.ftp_os_color.length==0){window.ftp_os_color=window.ftp0_os_color};
		if(window.ftp_os_bgcolor.length==0){window.ftp_os_bgcolor=window.ftp0_os_bgcolor};
	}
	
	function set_ftpcolor(){
		
		var aa = jQuery('.alert-danger');
		jQuery('.alert-danger').css('color', '#' + window.ftp_occ_color);
		jQuery('.alert-danger').css('backgroundColor', '#' + window.ftp_occ_bgcolor);
		jQuery('.alert-info').css('color', '#' + window.ftp_v_color);
		jQuery('.alert-info').css('backgroundColor', '#' + window.ftp_v_bgcolor);
		
	}	
	
	function set_event(){
		$('.thmb-ftp').contextMenu('myMenu',{
			bindings:{
				'edit': function(t){
					var Parameter = '{"action":"edit","room":"' + t.id + '"}';

					var Title = "修改客人信息";
					art.dialog.data('aParameter', Parameter );// 存储数据
					
					art.dialog.open("reservation/reservation.html?Parameter='" + Parameter + "'", {
						title: Title,
						width: 1280,
						height: 810,
						close: function () {
							//var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
							//if (bJson.ok == '1') iObj.value = bJson.arg;
						}
					}, false);
					
				},
				'walkin': function(t){
					var Parameter = '{"action":"edit","room":"' + t.id + '"}';
					var Title = "散客入住";
					art.dialog.data('aParameter', Parameter );// 存储数据
					
					art.dialog.open("reservation/reservation.html?Parameter='" + Parameter + "'", {
						title: Title,
						width: 1148,
						height: 810,
						close: function () {
							//var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
							//if (bJson.ok == '1') iObj.value = bJson.arg;
						}
					}, false);
					
					
					
					
				},
				'newreservation': function(t){
					var Parameter = '{"action":"newreservation","room":"' + t.id + '"}';
					var content = '<iframe src="reservation/reservation.html?Parameter=' + Parameter + '" id="win' + t.id + '" name="reservation" height="768px" width="1148px" frameborder="0"></iframe>';
	
					var throughBox = art.dialog.through;
					throughBox({
						title: '新预定:' + t.id,
						content: content,
						lock: true,
						cancel: true,
						height: (window.screen.height - window.screenTop),
						ok :  function(){ 
									alert( "11111" );
									return true;
								}
					});
	
						
				},
				
				'gledger': function(t){
					var Parameter = '{"action":"edit","room":"' + t.id + '"}';

					var Title = "客人帐";
					art.dialog.data('aParameter', Parameter );// 存储数据
					
					art.dialog.open("cash-billing.html?Parameter='" + Parameter + "'", {
						title: Title,
						width: 1280,
						height: 810,
						close: function () {
							//var bJson = $.parseJSON(art.dialog.data('bParameter'));// 读取B页面的数据
							//if (bJson.ok == '1') iObj.value = bJson.arg;
						}
					}, false);
					
				},
				
				
				'email': function(t){
					alert('Trigger was '+t.id+'\nAction was Email');
				},
				'save': function(t){
					alert('Trigger was '+t.id+'\nAction was Save');
				},
				'delete': function(t){
					alert('Trigger was '+t.id+'\nAction was Delete');
				}
			}
		});			



		jQuery('.thmb-ftp').hover(function() {
			var t = jQuery(this);
			window.bRoom = this.id;
			t.find('.ckbox').show();
		}, function() {

			var t = jQuery(this);
			if(!t.closest('.thmb-ftp').hasClass('selected')) {
				t.find('.ckbox').hide();
			}
		});

		jQuery('.ckbox').each(function(){
			var t = jQuery(this);
			var parent = t.parent();
			if(t.find('input').is(':checked')) {
				t.show();
				parent.addClass('selected');
			}
		});


		jQuery('.ckbox').click(function(){
			var t = jQuery(this);
			if(!t.find('input').is(':checked')) {
				t.closest('.thmb-ftp').removeClass('selected');
				enable_itemopt(false);
			} else {
				t.closest('.thmb-ftp').addClass('selected');
				enable_itemopt(true);
			}
		});

		jQuery('#selectAll').click(function() {
			if(jQuery(this).hasClass('btn-default')) {
				jQuery('.thmb').each(function() {
					jQuery(this).find('input').attr('checked',true);
					jQuery(this).addClass('checked');
					jQuery(this).find('.ckbox, .fm-group').show();
				});
				enable_itemopt(true);
				jQuery(this).removeClass('btn-default').addClass('btn-primary');
				jQuery(this).text('Select None');
			} else {
				jQuery('.thmb').each(function(){
					jQuery(this).find('input').attr('checked',false);
					jQuery(this).removeClass('checked');
					jQuery(this).find('.ckbox, .fm-group').hide();
				});
				enable_itemopt(false);
				jQuery(this).removeClass('btn-primary').addClass('btn-default');
				jQuery(this).text('Select All');
			}
		});

		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto();

	}

		function enable_itemopt(enable) {
			if(enable) {
				jQuery('.media-options .btn.disabled').removeClass('disabled').addClass('enabled');
			} else {

				// check all thumbs if no remaining checks
				// before we can disabled the options
				var ch = false;
				jQuery('.thmb-ftp').each(function(){
					if(jQuery(this).hasClass('checked'))
						ch = true;
				});

				if(!ch)
					jQuery('.media-options .btn.enabled').removeClass('enabled').addClass('disabled');
			}
		}

	function radio_select(){
		var obj=document.getElementsByName("radio_select");
		for(var i=0;i<obj.length;i++)
		{
		  if(obj[i].checked)
		  {
		  	return obj[i].id;
		  }
		}
		return 'opALL';
	}
	
	function create_json(){
		json0 = $.parseJSON(window.roomsview);
		json = [{}];
		var x = 0 ;
		for( var i=0,j = json0.length;i<j;i++){
			if (filter(json0[i])){
				json[x] = json0[i];
				x ++
			}	
		}
		return json;
	}
	
	function filter( json ){
		
		var sfilter = "1==1";
		var result = false;
		
		switch ( radio_select()) {
           case ("opALL"):
                result = true;
                break;
           case ("opV"):
				if(json.rmstatus == 'V' ){
					result = true;
				}else {
					result = false;	
				}			
                break;
           case ("opO"):
				if(json.rmstatus == 'O' ){
					result = true;
				}else {
					result = false;	
				}			
                break;
           case ("opDI"):
				if(json.hsk_status == 'DI' ){
					result = true;
				}else {
					result = false;	
				}			
                break;
           default:
        }
		
		if( !result ){
			return false;
		}
		
		slt_rmtype=document.getElementById("select-rmtype");
		if(slt_rmtype.value!=""){
		  if (slt_rmtype.value != json.rmtype ){
			return false;
		  }	
		}
		
		slt_floor=document.getElementById("select-floor");
		if(slt_floor.value!=""){
		  if (slt_floor.value != json.floor ){
			return false;
		  }	
		}
		
		
		return result;
		
	}
	
	document.getElementById("retrieve").onclick = function () {
		
//		$('.media-manager').empty();
		$('.col-md-8').empty();
		
		makeview( );
		
	}
	
	document.getElementById("search").onclick = function () {


		jQuery('.thmb-ftp').each(function() {
			jQuery(this).find('input').attr('checked',false);
			jQuery(this).removeClass('selected');
		});


		
		var room = document.getElementById("select-room").value;
		
		var t = $( "#" + room );
		
		t.addClass("selected")
//		roomid.siblings().removeClass("selected").end()
			  .find(":checkbox").attr("checked",true);
		
//		var t = jQuery(this);
		if(!t.find('input').is(':checked')) {
			t.closest('.thmb-ftp').removeClass('selected');
			enable_itemopt(false);
		} else {
			t.closest('.thmb-ftp').addClass('selected');
			enable_itemopt(true);
		}
		
	}
	
	document.getElementById("rmblock").onclick = function () {
		if ((this).checked){
			$( ".col-md-8" ).removeClass("all")
			$( ".col-md-4" ).removeClass("none")
		}else{
			$( ".col-md-8" ).addClass("all")
			$( ".col-md-4" ).addClass("none")
		}
	}
	





