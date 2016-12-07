// attraction mode text.
var attractionText="by ben0bi@web4me {EmptyHeart} {QuarterHeart} {HalfHeart} {Herz} http://ben0bi.homenet.org {:)} {;)} {:)}";

// ++++ requires.
var my_http = require("http");
var qs = require("querystring");

var ws281x = require('./lib/rpi-ws281x-native/lib/ws281x-native');
var mcs=require("./lib/fonts/LED_charset_multispace");
var colours = require("./lib/LED_colours");

var NUM_LEDS = parseInt(process.argv[2], 10) || 10,
    pixelData = new Uint32Array(NUM_LEDS);

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

// ++++ get (some) characters of a text onto the screen.
var getRenderText = function(text, posX)
{
	var screen = Array();
	// build 2dimensional screen array
	for(x = 0;x < screenWidth; x++)
	{
		var screeny = Array();
		screen.push(screeny);
		for(y=0;y<screenHeight;y++)
		{
			screen[x][y] = 0;
		}
	}

	// render the text into the screen.
	var charheight = mcs.height();
	var pixels = 0; // actual x position on the text, in pixels.
	var getSymbol = false;
	symbol = "";
	for(tp=0;tp<text.length;tp++)
	{
		var startx = posX + pixels;
		var sym=text.charAt(tp);

		// get special symbols between {}
		if(sym=="}")
		{
			getSymbol=false;
		}

		if(getSymbol) {
			symbol+=sym;
		}else{
			if(sym!="}") {symbol=sym;}
		}

		if(sym=="{")
		{
			getSymbol=true;
			symbol = "";
		}
		
		// there is something to render.
		if(!getSymbol)
		{
			// get the symbol.
			var chsym = mcs.get(symbol);
			var chwidth=mcs.width(symbol);
			// performance boost.
			// its in the screen, draw it.
			if(startx+chwidth-1 >= 0 && startx-chwidth+1 < screenWidth)
			{
				for(var x=0;x<chwidth;x++)
				{
					for(var y=0;y<charheight;y++)
					{
						// it could be halfway out of the screen, so check that.
						if(y>=0 && y<screenHeight && x+startx>=0 && x+startx<screenWidth)
						{
							// its really in the screen.
							screen[x+startx][y] = chsym[y][x];
						}
					}
				}
			}

			// do not count special chars.
			if(sym!="{")
				pixels+=chwidth;
		}
	}


	// render the screen into a onedimensional array.
	var pd = new Array();
	for(var y=0;y<screenHeight;y++)
	{
		for(var x=0;x<screenWidth;x++)
		{
			pd.push(screen[x][y]);
		}
	}

	return convertScreenToColor(pd);
};

// ++++ get the real text length counting special symbols as 1.
var getRealTextLength = function(text, inPixels)
{
	var vtlen=text.length;	// char amount
	var vtPlen=0;		// pixel amount
	var getSymbol=false;	// do we get a symbol name?
	var symbol = "";

	for(var tp=0;tp<text.length;tp++)
	{
		var sym=text.charAt(tp);

		// get special symbols between {}
		if(sym=="}")
		{
			getSymbol=false;
			vtlen--;
		}

		if(getSymbol) {
			symbol+=sym;
			vtlen--;
		}else{
			// set the symbol
			if(sym!="}") {symbol=sym;}
		}

		if(sym=="{")
		{
			getSymbol=true;
			symbol = "";
		}

		if(symbol!="" && !getSymbol)
			vtPlen += mcs.width(symbol);
	}
	
	if(inPixels)
		return vtPlen;
	return vtlen;
}

// ++++ convert an array with color numbers to a real LED array with colors.
var convertScreenToColor = function(arr)
{
	var pd=new Uint32Array(arr.length);
	for(var i=0;i<arr.length;i++)
	{
		pd[i] = colours.get(arr[i])
	}
	return pd;
}

// ++++ get a clear screen array.
var clearData =function()
{
	var pd = new Uint32Array(NUM_LEDS);
	for(var i=0;i<NUM_LEDS;i++)
		pd[i]=0;
	return pd;	
}

// ++++ INITIALIZE
ws281x.init(NUM_LEDS);
clearData();
// clear array before setting brightness.
ws281x.render(clearData());
ws281x.setBrightness(16);

// reset white to orange.
colours.set(1, 1, 255, 127, 0);

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
var realTextLength = getRealTextLength(realText, true);

setInterval(function () 
{
	// does not get ip right at startup.
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
			realTextLength = getRealTextLength(realText, true);
		}
	}

	//var pixelData=getRenderSymbol("pal"); // or globalsymbol.
	var pixelData=getRenderText(realText,globalX);
	
	ws281x.render(pixelData);
	
	// change symbol every some frames (30 = 1 second)
	frames++;
	if(frames >= 1)
	{
		frames = 0;

		globalX--;
		if(Math.abs(globalX)>realTextLength)
			globalX = screenWidth;

		// go through all symbols (old attraction mode)
		globalsymbol++;
		if(globalsymbol >= mcs.length())
			globalsymbol = 0;

	}
}, 1000 / 30);

// ++++ text listening server.
var serverPort = 3000;
var server = my_http.createServer(function(request, response)
{
	var url=request.url.toLowerCase();
	console.log("Request received: "+request.url);

	// write header.
	response.writeHeader(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});

	// set new text.
	if (request.method === 'POST' && url == '/addtext') 
	{
	    var body = '';
	    request.on('data', function(chunk) {
	      body += chunk;
	    });
	    request.on('end', function() {
	      var data = qs.parse(body);
		console.log("+ Setting new Text: "+data.content_text);
		realText=data.content_text
		realTextLength = getRealTextLength(realText,true);
		globalX = screenWidth+2;
		response.write(realText);
		response.end();
	    });
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
console.log("Be+LED vAlpha by ben0bi in 2016ad / 30ahc");
console.log(" ");
console.log("Local IPs:");
console.log(localIP);
var s = server.address();
console.log("Global IP:");
console.log(s);
console.log(" ");
console.log('Press <ctrl>+C to exit.');
console.log(" ");
