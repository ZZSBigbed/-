	document.getElementById("btnLogin").onclick = function () {
		var userid = document.getElementById("userid");
		var password = document.getElementById("password");
		var hotelid = document.getElementById("hotelid");
		var message = '';

		if(hotelid.value.length==0){ 
			message += '酒店ID不能为空！'
		}; 
		if(userid.value.length==0){ 
			message += '用户ID不能为空!'
		} ;
		if(password.value.length==0){ 
			message += '密码不能为空!'
		} ;
		
		if(message.length==0){ 
			document.getElementById("message").innerHTML = "";
		}else{
			document.getElementById("message").innerHTML = "<code>"+message+"</code>";
			return false;
		};
		
		var askport = document.getElementById("askport").innerHTML;		  

	 	var json1= {"userid":userid.value,"password":password.value,"hotelid":hotelid.value};
		var jsonstr = JSON.stringify(json1);

		var json = askJsonInfo('login',jsonstr);
		
		
		  
		jQuery.ajax( {  
		  type : 'POST',  
	
		  url : askport + 'con/login.do',  
		  data : json,
		  dataType : 'text',  
		  success : function(data) {  
		  		var jsonlogin = $.parseJSON( data ); 
				if (jsonlogin.status == 'OK'){
					addCookie("userid",userid.value,7,"/");	
					addCookie("authorization",jsonlogin.authorization,7,"/");
					addCookie("login","YES",7,"/");
					addCookie("locked","NO",7,"/");
					addCookie("password",password.value,7,"/");
						
					window.location.href="index.do";
				}else{
					addCookie("login","NO",7,"/");
					addCookie("userid","",7,"/");
					document.getElementById("message").innerHTML = "<code>非法用户!</code>";
					return false;
				}
				
		  },  
		  error : function(data) {  
				document.getElementById("message").innerHTML = "<code>ask Failure 请求失败!</code>";
		  }  
		}); 
		

		
	};

	document.getElementById("logout").onclick = function () {
		if (confirm("您确定要注销本系统吗？")){
				deleteCookie("userid","/")
				deleteCookie("authorization","/")
				deleteCookie("login","/")
				deleteCookie("locked","/")
				
				addCookie("userid","",7,"/");
				addCookie("login","NO",7,"/");
				CloseWebPage();
			}
	}

