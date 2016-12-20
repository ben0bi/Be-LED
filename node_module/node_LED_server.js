var AppVersion = "0.1.0";

// attraction mode text.
var attractionText="by ben0bi@web4me {EmptyHeart} {QuarterHeart} {HalfHeart} {Herz} http://ben0bi.homenet.org {:)} {;)} {:)}";

// ++++ requires.
var my_http = require("http");
var qs = require("querystring");
var fs = require("fs");

var ws281x = require('./lib/rpi-ws281x-native/lib/ws281x-native');
var mcs=require("./lib/fonts/LED_charset_multispace_Wx7(Wx10)");
var LED=require("./lib/LED_functions");
var colours = require("./lib/LED_colours");

// get width and height from console.
var PRECOUNT = parseInt(process.argv[2], 10) || 0,
    screenWidth=WIDTH = parseInt(process.argv[3], 10) || 10,
    screenHeight=HEIGHT = parseInt(process.argv[4], 10) || 10,
    AFTERCOUNT = parseInt(process.argv[5], 10) || 0,
    NUM_LEDS = PRECOUNT+ (WIDTH * HEIGHT)+ AFTERCOUNT;
    pixelData = new Uint32Array(NUM_LEDS);

LED.setDisplaySize(PRECOUNT,WIDTH, HEIGHT, AFTERCOUNT);

// global x position.
var globalX = 0;

// ++++ get a single character into the screen.
var getRenderSymbol = function(symIndex)
{
	var pd = new Uint32Array(NUM_LEDS);
	var sc = mcs.get(symIndex);

	// render a symbol
	for(var y=0;y<sc.length;y++)
	{
		for(var x=0;x<sc[y].length;x++)
		{
			if(x+globalX < screenWidth && x+globalX >= 0)
			{
				var ind = y*screenWidth + x + globalX;
				if(ind<NUM_LEDS)
				{
					var r=0;
					if(sc[y][x]==1)
						r=255;
					pd[ind]=colours.get(sc[y][x]);
				}
			}
		}
	}
	return pd;
};

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
var os = require('os');
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

// set default text with local ip.
var realText = "";
var localIP = getMyLocalIP();

if(localIP.length > 0)
{
	realText = "Local IP: ";
	for(var loc=0;loc<localIP.length;loc++)
	{
		realText+=localIP[loc]+" {Smiley} ";
	}
	realText+="{Smiley} {Smiley} ";
}
realText+=attractionText;
var realTextLength = LED.getRealTextLength(realText, mcs);

// ++++ colouring

// reset white to orange.
colours.set(1, 1, 255, 127, 0);
colours.set(1,10,255,255,255);
// switch to eye friendly palette.
colours.switchToPalette(1);

// ++++ RENDER FUNCTION
function RENDER()
{
		// RENDER THE SCREEN
	//var pixelData=getRenderSymbol("pal"); // or globalsymbol.
	var screenData2=LED.getRenderText(realText,globalX, mcs);
	var screenData=LED.addSnow(screenData2,2);
	var pi=0;
	var plen=pixelData.length;
	var slen=screenData.length;
	// render the pre array
	if(PRECOUNT>0)
	{
		for(prei=0;prei<PRECOUNT;prei++)
		{
			if(pi<plen)
				pixelData[pi]=colours.get(parseInt(color));
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
				pixelData[pi]=colours.get(color);
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

// the loop function
setInterval(function () 
{
	// does not get ip right at startup when booting,
	// so wait until its here.
	if(localIP.length<=0)
	{
		localIP = getMyLocalIP();
		if(localIP.length > 0)
		{
			realText = "Local IP: ";
			for(var loc=0;loc<localIP.length;loc++)
			{
				realText+=localIP[loc]+" {Smiley} ";
			}
			realText+="{Smiley} {Smiley} ";
			realText+=attractionText;
			realTextLength = LED.getRealTextLength(realText, mcs);
		}
	}
		
	// change symbol every some frames (120 = 1 second)
	frames++;
	if(frames >= 7)
	{
		RENDER();
		frames = 0;
		
		// scroll
		globalX--;
		if(Math.abs(globalX)>realTextLength)
			globalX = screenWidth;

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

// ++++ text listening server.
var serverPort = 3000;
var server = my_http.createServer(function(request, response)
{
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
				var data = qs.parse(body);
				console.log("+ Setting new Text: "+data.content_text);
				realText=data.content_text
				realTextLength = LED.getRealTextLength(realText,mcs);
				globalX = screenWidth+2;
				response.write(realText);
				response.end();
			});
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

		// set admin password.
		if (url == '/setadminpassword')
		{
			var body = '';
			request.on('data', function(chunk) {
			body += chunk;
			});
			request.on('end', function() {
				var data = qs.parse(body);
				console.log("+ Setting new admin password.");
				fs.writeFileSync("./admin_password",data.password, "utf8");
				response.write("DONE");
				response.end();
			});
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
						if(FSdata == data.password) {granted = true;}
					} else if(err.code == 'ENOENT') {
						// file does not exist
						console.log("+  There is no password file. Sending password creation page.");
						responsetext=sendSetPasswordPage();
						sendfile = true;
						// hard coded default password: be+led
						//if(data.password == "e579c47cffd1fc00d8671084969c2cc1a8b58269586ce66bc2f33973ba6f7cb5") {granted = true;}
					} else {
						console.log('+  There is some error with the password file: ', err.code);
						responsetext = "D0P3";
					}
					
					if(!granted)
					{
						console.log("+  Access DENIED");
						if(!sendfile)
							console.log("+  Response: "+responsetext);
					}else{
						console.log("+  Access GRANTED");
						sendfile = true;
						responsetext=sendAdminPage();
					}

					if(sendfile)
						console.log("+ Sending a file as response.");

					response.write(responsetext);
					response.end();
				});
			});			
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
						responsetext=sendSetPasswordPage();
						sendfile = true;
						// hard coded default password: be+led
						//if(data.password == "e579c47cffd1fc00d8671084969c2cc1a8b58269586ce66bc2f33973ba6f7cb5") {granted = true;}
			} else {
					console.log('+  There is some error with the password file: ', err.code);
					responsetext = "D0P3";
			}

			if(sendfile)
				console.log("+ Sending a file as response.");

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
