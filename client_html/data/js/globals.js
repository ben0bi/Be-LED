var LEDPort = 3000;

function set_footer_position()
{
	// define footer position
	var height = $("#wrapper").height();
	var h2 = $("#footer_wrapper").height();
	var footerY=parseInt($("#footer_wrapper").css("bottom"));
	if(footerY <0)
		h2 -= footerY;
	$("#wrapper").css("min-height", height-h2);
}