var AppVersion = "0.4.4";

console.log(" ");
console.log("Be+LED "+AppVersion+" by ben0bi in 2016ad / 30ahc");
console.log(" ");


// attraction mode text.
var attractionText="{%P3}by ben0bi@web4me{%L0}{%P1} {EmptyHeart} {QuarterHeart} {HalfHeart} {DreiviertelHerz} {Herz} http://ben0bi.homenet.org {:)} {;)} {:)}";

var filename_password = './config/admin_password';
var filename_defaulttext = './config/default_text';
var filename_iptime = './config/local_ip_showtime';

// ++++ requires.
var my_http = require("http");
var qs = require("querystring");
var fs = require("fs"); // for file operations.
var os = require('os'); // for getting the IP.

var SHA = require('./lib/sha256');

var ws281x = require('./lib/rpi-ws281x-native/lib/ws281x-native');  // the LED driver.
var mcs=require("./lib/fonts/LED_charset_multispace_Wx7(Wx10)");	// the charset to use.
var LED=require("./lib/LED_functions");								// the basic LED functions. Maybe the charset provides some own methods.
var colours = require("./lib/LED_colours");							// color palettes.

// get width and height from console.
var PRECOUNT = parseInt(process.argv[2], 10) || 0,				// First parameter: count of special LEDs before screen.
    screenWidth=WIDTH = parseInt(process.argv[3], 10) || 10,	// Second parameter: screen size (width)
    screenHeight=HEIGHT = parseInt(process.argv[4], 10) || 10,	// Third parameter: screen size (height)
    AFTERCOUNT = parseInt(process.argv[5], 10) || 0,			// Fourth parameter: count of special LEDs after screen.
    NUM_LEDS = PRECOUNT+ (WIDTH * HEIGHT)+ AFTERCOUNT,			// Total LED count.
    initial_speed = LED.getSpeed();								// Default speed.
    pixelData = new Uint32Array(NUM_LEDS);						// The "real" screen array.

// Pass parameters to the LED module.
LED.setDisplaySize(PRECOUNT,WIDTH, HEIGHT, AFTERCOUNT);

// global x position.
var globalXInit = -screenWidth * 3;	// Default init position of text.
var globalX = globalXInit;			// Scroll position.

var realText = "";			// The text shown on the device.
var realTextLength = 0; 	// The length of the text in pixels.
var localIP = [];			// array for the local IP(s).
var localIPText = "";		// text with the IPs to add to the screen.
var waitForRemoveIP = 10000;	// Milliseconds to wait until the ip will be removed.
var messages = [];			// message array.
var maxMessageCount = 5; 	// maximum amount of messages to show.
var messagesAfterAttractionText = true; // if false, the attraction text will be overwritten on message.

// the port of the node server.
var serverPort = 3000;

// maybe get another default text.
try
{
	var startuptext = fs.readFileSync(filename_defaulttext, 'utf8');
	if(startuptext)
	{
		console.log('-->  Default text file found: '+startuptext);
		attractionText = startuptext;
	}
}catch(ex){
	console.log("--> No default text file found, using hard coded text: "+attractionText);
}

// maybe get another IP time.
try
{
	var iptime = fs.readFileSync(filename_iptime, 'utf8');
	if(iptime)
	{
		console.log('-->  IP time file found: '+iptime);
		waitForRemoveIP=parseInt(iptime);
	}
}catch(ex){
	console.log("--> No default ip time found, using hard coded time: "+waitForRemoveIP);
}

// ++++ Get local IP addresses of this device.
var getMyLocalIP = function()
{
	var interfaces = os.networkInterfaces();
	var addresses = [];
	for (var k in interfaces) 
	{
	    for (var k2 in interfaces[k]) 
		{
        	var address = interfaces[k][k2];
		    if (address.family === 'IPv4' && !address.internal) 
			{
        	    addresses.push(address.address);
		    }
		}
    }
	return addresses;
}

// get and add the local ip to the text.
var getLocalIP = function()
{
	console.log("Trying to get local IP.");
	localIP = getMyLocalIP();
	if(localIP.length > 0)
	{
		localIPText = "Local IP: ";
		for(var loc=0;loc<localIP.length;loc++)
		{
			localIPText+=localIP[loc]+" {Smiley} ";
		}
		localIPText+="{Smiley} {Smiley} ";
		addMessage("");
		globalX = globalXInit;
		
		
		// wait some secs and then remove the local ip.
		if(waitForRemoveIP!=0)
		{
			if(waitForRemoveIP<0)
				waitForRemoveIP=10; //just wait for 10ms, then hide the IP.
			setTimeout(function()
			{
				console.log("--> Removing IP from screen.");
				globalX=globalXInit;
				localIPText = "";
				addMessage("");
			}, waitForRemoveIP);
		}
	}
	return localIP;
}

// set the real text which is shown on the device.
var setRealText = function(newText)
{
	var gap=" ";
	while(LED.getRealTextLength(gap)<screenWidth)
		gap+=" ";
	realText=gap+newText+gap;
	realTextLength=LED.getRealTextLength(realText, mcs);
}

// add a message to the messages on the screen.
var addMessage = function(message)
{
	if(message!=null && message!="")
		messages.push(message);
	
	var rt = localIPText;
	if(messagesAfterAttractionText==true)
		rt+=attractionText+" ";
		
	if(messages.length>0)
	{
		for(var m=0;m<messages.length;m++)
		{
			rt+=" +++ "+messages[m];
		}
		rt +=" +++";
	}
	setRealText(rt);
}

// ++++ RENDER FUNCTION
function RENDER()
{
	// RENDER THE SCREEN
	var screenData=LED.getRenderText(realText,globalX, mcs);
//	var screenData=LED.addSnow(screenData,2); // some snow flakes.

	// get pre and after led data.
	// MUST be called after getRenderText because the text is parsed
	// there for commands.
	var preLEDData=LED.getPreLEDData();
	var afterLEDData=LED.getAfterLEDData();
	
	var pi=0;
	var plen=pixelData.length;
	var slen=screenData.length;

	// render the pre array
	if(PRECOUNT>0)
	{
		for(prei=0;prei<PRECOUNT;prei++)
		{
			if(pi<plen)
				pixelData[pi]=preLEDData[prei];
			pi++;
		}
	}

	// render the screen data.
	if(slen>0)
	{
		for(scri=0;scri<slen;scri++)
		{
			if(pi<plen)
				pixelData[pi]=screenData[scri];
			pi++;
		}
	}

	// render the after array
	if(AFTERCOUNT>0)
	{
		for(ai=0;ai<AFTERCOUNT;ai++)
		{
			if(pi<plen)
				pixelData[pi]=afterLEDData[ai];
			pi++;
		}
	}

	// render the array on the LEDs
	ws281x.render(pixelData);
}

// ++++ INITIALIZE
ws281x.init(NUM_LEDS);
// clear array before setting brightness.
ws281x.render(LED.clearData());
ws281x.setBrightness(32);

// ++++ trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});

// ++++ colouring

// switch to eye friendly palette.
colours.switchToPalette(0);

// reset white to orange.
//colours.set(1, 255, 127, 0);
//colours.set(10,255,255,255);

// ++++ animation-loop
var frames = 0;
var color = 0;

setRealText(attractionText);

// the loop function
setInterval(function () 
{
	// does not get ip right at startup when booting,
	// so wait until its here.
	if(localIP.length<=0)
	{
		getLocalIP();
	}
		
	// move some stuff every some frames (120 = 1 second)
	frames++;
	if(frames >= LED.getSpeed())
	{
		RENDER();
		frames = 0;
		
		// scroll
		globalX--;
		if(globalX <= screenWidth-realTextLength)
		{
			globalX = globalXInit;
			// maybe reset speed.
			LED.setSpeed(initial_speed);
		}

		// go through all colours
		color+=0.1;
		if(color>=20)
			color=0;
	}
}, 1000 / 200); // 200 frames / sec


// ++++ SERVER STUFF.

// ++++ sending some protected html pages.
function sendAdminPage() {return fs.readFileSync('./node_module/send_html/send_admin_page.html', "utf8");}
function sendSetPasswordPage() {return fs.readFileSync('./node_module/send_html/send_new_admin_password.html', "utf8");};
function sendFirstPasswordPage() {return fs.readFileSync('./node_module/send_html/send_new_admin_password_first.html', "utf8");};

// ++++ text listening server.
var server = my_http.createServer(function(request, response)
{
	// YOU MUST SET A RETURN AFTER EACH VALID COMMAND!
	// The return must be at the end of the command-if, 
	// NOT at the end of the async methods!
	// Else it will maybe return "D0P3" before the async call ends.
	
	var url=request.url.toLowerCase();
	console.log("Request received: "+request.url);

	// write header.
	response.writeHeader(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});

	if(request.method === 'POST')
	{
		// set new LED text.
		if (url == '/addtext')
		{
			var body = '';
			request.on('data', function(chunk) {
			body += chunk;
			});
			request.on('end', function() {
				// TODO: add to array
				var data = qs.parse(body);
				console.log("+ Adding a Text: "+data.content_text);
				addMessage(data.content_text);
				//globalX = globalXInit;
				//LED.setSpeed(initial_speed);
				response.write(realText);
				response.end();
			});
			return;
		}

		// return the default text.
		if (url == '/givemethedefaulttext')
		{
			response.write(attractionText);
			response.end();
			return;
		}

		// set default text which is shown after boot/restart.
		if (url == '/setdefaulttextxhx')
		{
			console.log("+ Getting new default text..");
			var body = '';
			request.on('data', function(chunk) 
			{
				body += chunk;
			});
			request.on('end', function() 
			{
				var data = qs.parse(body);
				var newtext = data.defaulttext;
				console.log("+ Setting new default text: "+newtext);
				fs.writeFileSync(filename_defaulttext,newtext, "utf8");
				response.write(newtext);
				response.end();
			});
			return;
		}

		// return the ip time.
		if (url == '/givemetheiptime')
		{
			var q = waitForRemoveIP/1000;
			response.write(q.toString());
			response.end();
			return;
		}

		// set how long the ip will be shown.
		if (url == '/setiptimexwx')
		{
			console.log("+ Getting new IP time..");
			var body = '';
			request.on('data', function(chunk) 
			{
				body += chunk;
			});
			request.on('end', function() 
			{
				var data = qs.parse(body);
				var newtime = data.iptime;
				var t = parseInt(newtime)*1000;
				console.log("+ Setting new IP time: "+t);
				waitForRemoveIP = t;
				fs.writeFileSync(filename_iptime,t, "utf8");
				response.write(t.toString());
				response.end();
			});
			return;
		}
		
		// show the ip on the device
		if(url=="/showipxzx")
		{
			var ips=getLocalIP();
			var ip="not set";
			if(ips.length>0)
				ip=ips[0];
			response.write(ip);
			response.end();
			return;
		}

		// just send the password reset page. 
		// This function is only accessible over the admin page,
		// so no one should be able to guess it.
		if(url=="/uhsorrymanineedsomepasswordreset")
		{
			response.write(sendSetPasswordPage());
			response.end();
			return;
		}

		// set admin password (first timer).
		if (url == '/setadminpasswordxhx')
		{
			var body = '';
			request.on('data', function(chunk) {
			body += chunk;
			});
			request.on('end', function() {
				var data = qs.parse(body);
				var pw = SHA.sha256(data.password);
				console.log("+ Setting new admin password. Hash: "+pw);
				fs.writeFileSync(filename_password,pw, "utf8");
				response.write("DONE");
				response.end();
			});
			return;
		}

		// set admin password (second timer).
		if (url == '/setadminpasswordxwx')
		{
			var body = '';
			request.on('data', function(chunk) {
			body += chunk;
			});
			request.on('end', function() {
				var data = qs.parse(body);
				var pw = SHA.sha256(data.password);
				var oldpw = SHA.sha256(data.oldpass);

				fs.readFile(filename_password, 'utf8', function (err, FSdata)
				{
					var granted = false;
					responsetext="N0P3";
					if(err == null) {
						console.log('+  Password file found.');
						if(FSdata == oldpw) 
						{
							granted = true;
						}else{
							responsetext="WRONGPW";
						}
					} else if(err.code == 'ENOENT') {
						// file does not exist
						console.log("+  There is no password file. Sending OK!");
						granted = true;
					} else {
						console.log('+  There is some error with the password file: ', err.code);
						responsetext = "D0P3";
					}
					
					if(!granted)
					{
						console.log("+  Password reset DENIED.");
						console.log("+  Response: "+responsetext);
					}else{
						console.log("+  Password reset DONE.");
						fs.writeFileSync(filename_password,pw, "utf8");
						responsetext="DONE";
					}

					response.write(responsetext);
					response.end();
				});				
			});
			return;
		}
				
		// get admin page on right password.
		if(url == '/admin')
		{
			var body = '';
			request.on('data', function(chunk) {
			body += chunk;
			});
			request.on('end', function() {
				var data = qs.parse(body);
				console.log("+ Getting request for admin page.");
				var responsetext="Uhh...There is something wrong.";
				
				fs.readFile(filename_password, 'utf8', function (err, FSdata)
				{
					var granted = false;
					var sendfile = false;
					responsetext="N0P3";
					if(err == null) {
						console.log('+  Password file found.');
						//console.log(FSdata+" ==> "+data.password);
						if(FSdata == SHA.sha256(data.password)) {granted = true;}
					} else if(err.code == 'ENOENT') {
						// file does not exist
						console.log("+  There is no password file. Sending password creation page.");
						responsetext=sendFirstPasswordPage();
						sendfile = true;
						// hard coded default password: be+led
						//if(data.password == "e579c47cffd1fc00d8671084969c2cc1a8b58269586ce66bc2f33973ba6f7cb5") {granted = true;}
					} else {
						console.log('+  There is some error with the password file: ', err.code);
						responsetext = "D0P3";
					}
					
					if(!granted)
					{
						console.log("+  Access DENIED.");
						if(!sendfile)
							console.log("+  Response: "+responsetext);
					}else{
						console.log("+  Access GRANTED.");
						sendfile = true;
						responsetext=sendAdminPage();
					}

					if(sendfile)
						console.log("+ Sending a file as response.");

					response.write(responsetext);
					response.end();
				});
			});
			return;
		}
	}

	// check if there is a password file and send set-password-page if not.
	if(url=="/isconfigured")
	{		
		fs.readFile(filename_password, 'utf8', function (err, FSdata)
		{
			console.log("+ Is page configured?");
			var sendfile = false;
			responsetext="N0P3";
			if(err == null) 
			{
				console.log('+  Password file found.');
				responsetext="Password_Is_Set";
				//console.log(FSdata+" ==> "+data.password);
			} else if(err.code == 'ENOENT') {
						// file does not exist
						console.log("+  There is no password file. Sending password creation page.");
						responsetext=sendFirstPasswordPage();
						sendfile = true;
						// hard coded default password: be+led
						//if(data.password == "e579c47cffd1fc00d8671084969c2cc1a8b58269586ce66bc2f33973ba6f7cb5") {granted = true;}
			} else {
					console.log('+  There is some error with the password file: ', err.code);
					responsetext = "D0P3";
			}

			if(sendfile)
				console.log("+ Sending password setting page as response.");

			response.write(responsetext);
			response.end();
		});
		return;
	}
	
	// get actual text on the LED.
	if(url=="/gettext")
	{
		console.log("Response: "+realText);
		response.write(realText);
		response.end();
		return;
	}
	
	response.write("D0P3");
	response.end();
});
server.listen(serverPort);

// ++++ final output.
console.log("++++ LED SERVER RUNNING FOR "+NUM_LEDS+" UNITS  +++");
console.log("Local IPs:");
console.log(localIP);
var s = server.address();
console.log("Global IP:");
console.log(s);
console.log(" ");
console.log('Press <ctrl>+C to exit.');
console.log(" ");
