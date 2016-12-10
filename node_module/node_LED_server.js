var AppVersion = "0.1.0";

// attraction mode text.
var attractionText="by ben0bi@web4me {EmptyHeart} {QuarterHeart} {HalfHeart} {Herz} http://ben0bi.homenet.org {:)} {;)} {:)}";

// ++++ requires.
var my_http = require("http");
var qs = require("querystring");
var fs = require("fs");

var ws281x = require('./lib/rpi-ws281x-native/lib/ws281x-native');
var mcs=require("./lib/fonts/LED_charset_multispace");
var LED=require("./lib/LED_functions");
var colours = require("./lib/LED_colours");

// get width and height from console.
var WIDTH = parseInt(process.argv[2], 10) || 10,
    HEIGHT = parseInt(process.argv[3], 10) || 10,
    NUM_LEDS = WIDTH * HEIGHT;
    pixelData = new Uint32Array(NUM_LEDS);

LED.setDisplaySize(WIDTH, HEIGHT);

var screenWidth = parseInt(process.argv[3], 10) || 10;
var screenHeight = NUM_LEDS / screenWidth;

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
ws281x.setBrightness(16);

// reset white to orange.
colours.set(1, 1, 255, 127, 0);

// switch to eye friendly palette.
colours.switchToPalette(1);

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

// ++++ animation-loop
var frames = 0;
var globalsymbol = 0;

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

	//var pixelData=getRenderSymbol("pal"); // or globalsymbol.
	var pixelData=LED.getRenderText(realText,globalX, mcs);
		
	// change symbol every some frames (120 = 1 second)
	frames++;
	if(frames >= 3)
	{
		ws281x.render(pixelData);

		frames = 0;

		globalX--;
		if(Math.abs(globalX)>realTextLength)
			globalX = screenWidth;

		// go through all symbols (old attraction mode)
		globalsymbol++;
		if(globalsymbol >= mcs.length())
			globalsymbol = 0;

	}
}, 1000 / 120);

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
		// set new text.
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
		
		// get admin page on right password.
		if(url == '/admin')
		{
			var body = '';
			request.on('data', function(chunk) {
			body += chunk;
			});
			request.on('end', function() {
				var data = qs.parse(body);
				console.log("+ Getting request for admin with this pass: "+data.password);
				var responsetext="Nothing.";
				if(data.password == "e579c47cffd1fc00d8671084969c2cc1a8b58269586ce66bc2f33973ba6f7cb5")
				{
					responsetext="Yes, done, you are in the system.";
				}else{
					responsetext="N0P3";
				}
				response.write(responsetext);
				response.end();
			});			
		}
	}

	// get text.
	if(url=="/gettext")
	{
		console.log("Response: "+realText);
		response.write(realText);
		response.end();
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
