document.getElementById('btn-cancel').onclick = function () {
	art.dialog.data('bParameter','{"ok":"0"}');// 取消
	art.dialog.close();
};	

function pIframeRetrieve(){
	document.getElementById("pIframe").src = "cash-bill-formwork.html";
	$('#pIframe').attr('src', $('#pIframe').attr('src'));
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

function iPrint(){
	 //printorder();
	 var iframe = document.getElementById('pIframe');
	 iframe.contentWindow.focus();
	 iframe.contentWindow.print();
}


