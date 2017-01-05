var AppVersion = "0.3.0";

// attraction mode text.
var attractionText="{%P3}by ben0bi@web4me{%L0}{%P1} {EmptyHeart} {QuarterHeart} {HalfHeart} {DreiviertelHerz} {Herz} http://ben0bi.homenet.org {:)} {;)} {:)}";

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
var PRECOUNT = parseInt(process.argv[2], 10) || 0,
    screenWidth=WIDTH = parseInt(process.argv[3], 10) || 10,
    screenHeight=HEIGHT = parseInt(process.argv[4], 10) || 10,
    AFTERCOUNT = parseInt(process.argv[5], 10) || 0,
    NUM_LEDS = PRECOUNT+ (WIDTH * HEIGHT)+ AFTERCOUNT,
    initial_speed = LED.getSpeed();
    pixelData = new Uint32Array(NUM_LEDS);

LED.setDisplaySize(PRECOUNT,WIDTH, HEIGHT, AFTERCOUNT);

// global x position.
var globalXInit = -screenWidth * 3;
var globalX = globalXInit;

// maybe get another default text.
try
{
	var startuptext = fs.readFileSync('./default_text', 'utf8');
	if(startuptext)
	{
		console.log('-->  Default text file found: '+startuptext);
		//console.log(FSdata+" ==> "+data.password);
		attractionText = startuptext;
	}
}catch(ex){
	console.log("--> No default text file found, using hard coded text: "+attractionText);
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

// set the real text which is shown on the device.
var setRealText = function(newText)
{
	var gap=" ";
	while(LED.getRealTextLength(gap)<screenWidth)
		gap+=" ";
	realText=gap+newText+gap;
	realTextLength=LED.getRealTextLength(realText, mcs);
}

// ++++ colouring

// switch to eye friendly palette.
colours.switchToPalette(0);

// reset white to orange.
//colours.set(1, 255, 127, 0);
//colours.set(10,255,255,255);

// ++++ RENDER FUNCTION
function RENDER()
{
	// RENDER THE SCREEN
	//var pixelData=getRenderSymbol("pal"); // or globalsymbol.
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

// ++++ animation-loop
var frames = 0;
var globalsymbol = 0;
var color = 0;

// set default text with local ip.
var realText = "";
var oldText=""; // save the text to see if something changed.
var realTextLength = 0;
var localIP = [];
setRealText(attractionText);

// get and add the local ip to the text.
var addLocalIP = function()
{
	localIP = getMyLocalIP();
	if(localIP.length > 0)
	{
		var rt = "Local IP: ";
		for(var loc=0;loc<localIP.length;loc++)
		{
			rt+=localIP[loc]+" {Smiley} ";
		}
		rt+="{Smiley} {Smiley} ";
		rt+=attractionText;
		setRealText(rt);
		oldText = rt;
		setTimeout(function() 
		{
			console.log("Resetting text...");
			//if(realText==oldText)
			//{
				setRealText(attractionText);
			//}
		}, 2000);
	}
}

// the loop function
setInterval(function () 
{
	// does not get ip right at startup when booting,
	// so wait until its here.
	if(localIP.length<=0)
	{
		addLocalIP();
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

		// go through all symbols (old attraction mode)
		globalsymbol++;
		if(globalsymbol >= mcs.length())
			globalsymbol = 0;

	}
}, 1000 / 200); // 200 frames / sec


// ++++ sending some protected html pages.
function sendAdminPage() {return fs.readFileSync('./node_module/send_html/send_admin_page.html', "utf8");}
function sendSetPasswordPage() {return fs.readFileSync('./node_module/send_html/send_new_admin_password.html', "utf8");};
function sendFirstPasswordPage() {return fs.readFileSync('./node_module/send_html/send_new_admin_password_first.html', "utf8");};

// ++++ text listening server.
var serverPort = 3000;
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
				console.log("+ Setting new Text: "+data.content_text);
				setRealText(data.content_text);
				globalX = globalXInit;
				LED.setSpeed(initial_speed);
				response.write(realText);
				response.end();
			});
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
				fs.writeFileSync("./default_text",newtext, "utf8");
				response.write(newtext);
				response.end();
			});
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
				fs.writeFileSync("./admin_password",pw, "utf8");
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

				fs.readFile('./admin_password', 'utf8', function (err, FSdata)
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
						fs.writeFileSync("./admin_password",pw, "utf8");
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
				
				fs.readFile('./admin_password', 'utf8', function (err, FSdata)
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
		fs.readFile('./admin_password', 'utf8', function (err, FSdata)
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
console.log(" ");
console.log("Be+LED "+AppVersion+" by ben0bi in 2016ad / 30ahc");
console.log(" ");
console.log("Local IPs:");
console.log(localIP);
var s = server.address();
console.log("Global IP:");
console.log(s);
console.log(" ");
console.log('Press <ctrl>+C to exit.');
console.log(" ");
