	$(document).ready(function() {
		$(".children a").click(function() {
			addTab($(this));
		});
		
		addEvent( );
	});
	function addTab(link) {
		// If tab already exist in the list, return
		if ($("#" + $(link).attr("rel")).length != 0)
			return;
		
		// hide other tabs
		$("#tabs li").removeClass("current");
		$("#content p").hide();
		
		// add new tab and related content
		$("#tabs").append("<li class='current'><a class='tab' id='" +
			$(link).attr("rel") + "' href='#'>" + $(link).html() +
			"</a><a href='#' class='remove'>x</a></li>");

		var app = "<Iframe id='tab_" + $(link).attr("rel") +"' name='iframe' src='" + $(link).attr("name") + "' width='100%' height='100%' scrolling='yes' frameborder='0' onload= 'SetCwinHeight(this);'></iframe>";
		$("#content").append("<p id='" + $(link).attr("rel") + "_content'>" +
			app + "</p>");
		
		// set the newly added tab as current
		$("#" + $(link).attr("rel") + "_content").show();
		
		$("#tabs-h").html($(link).html());
		
		addEvent( );
	}

	function addEvent( ){
		$('#tabs a.tab').click(function() {
			// Get the tab name
			var contentname = $(this).attr("id") + "_content";

			// hide all other tabs
			$("#content p").hide();
			$("#tabs li").removeClass("current");

			// show current tab
			$("#" + contentname).show();
			$(this).parent().addClass("current");
			$("#tabs-h").html($(this).html());

		});

		$('#tabs a.remove').click(function() {
			// Get the tab name
			var tabid = $(this).parent().find(".tab").attr("id");

			// remove tab and related content
			var contentname = tabid + "_content";
			$("#" + contentname).remove();
			$(this).parent().remove();

			// if there is no current tab and if there are still tabs left, show the first one
			if ($("#tabs li.current").length == 0 && $("#tabs li").length > 0) {

				// find the first tab    
				var firsttab = $("#tabs li:first-child");
				firsttab.addClass("current");

				// get its link name and show related content
				var firsttabid = $(firsttab).find("a.tab").attr("id");
				$("#" + firsttabid + "_content").show();
			}
		});
	}



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
		
	jQuery('#download').click(function(){
		download();
	})
	
	
	function download(){
		 jQuery.gritter.add({
				title: '下载基础数据!',
				text: '正在下载数据.',
		  class_name: 'growl-success',
		  image: 'images/screen.png',
					sticky: false,
					time: '300'
		 });
		 download_alinarg();
		 
		 
		 return false;
	}
			
	function download_alinarg(){
		//向后台请求客人信息
		var jsonstr;
		jQuery.ajax( {  
			  type : 'GET',  
			  url : 'data/get_alinarg_dict.txt',  
			  data : jsonstr,
			  dataType : 'text',  
			  success : function(data) { 

					localStorage.alinarg = data;

					
					
			  },  
			  error : function(data) {  
					alert("json get_alinarg_dict error");
			  }  
		  });
		  
	}			
			