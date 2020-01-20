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

function load_ftpcolor(){
	document.getElementById("ftp_di_color").value = window.ftp_di_color;
    jQuery('#colorSelector-di-c span').css('backgroundColor', '#' + window.ftp_di_color);
	
	document.getElementById("ftp_di_bgcolor").value = window.ftp_di_bgcolor;
    jQuery('#colorSelector-di-b span').css('backgroundColor', '#' + window.ftp_di_bgcolor);

	document.getElementById("ftp_cl_color").value = window.ftp_cl_color;
    jQuery('#colorSelector-cl-c span').css('backgroundColor', '#' + window.ftp_cl_color);

	document.getElementById("ftp_cl_bgcolor").value = window.ftp_cl_bgcolor;
    jQuery('#colorSelector-cl-b span').css('backgroundColor', '#' + window.ftp_cl_bgcolor);
	
	document.getElementById("ftp_oo_color").value = window.ftp_oo_color;
    jQuery('#colorSelector-oo-c span').css('backgroundColor', '#' + window.ftp_oo_color);
	
	document.getElementById("ftp_oo_bgcolor").value = window.ftp_oo_bgcolor;
    jQuery('#colorSelector-oo-b span').css('backgroundColor', '#' + window.ftp_oo_bgcolor);

	document.getElementById("ftp_os_color").value = window.ftp_os_color;
    jQuery('#colorSelector-os-c span').css('backgroundColor', '#' + window.ftp_os_color);

	document.getElementById("ftp_os_bgcolor").value = window.ftp_os_bgcolor;
    jQuery('#colorSelector-os-b span').css('backgroundColor', '#' + window.ftp_os_bgcolor);
}