/*
LED_functions
Functions for displaying stuff on LED panels.
by ben0bi@web4me in 2016ad / 30ahc
twitter.com/ben0bi

You can make free use of this library as long as you include the author credits above.
*/
var colours = require("./LED_colours");

var screenWidth = 0;
var screenHeight = 0;
var preLEDs = 0;
var afterLEDs = 0;

var setLEDDisplaySize = function(preSpecialLEDs, width, height, afterSpecialLEDs) 
{
	screenWidth=width;
	screenHeight=height;
	preLEDs=preSpecialLEDs;
	afterLEDs=afterSpecialLEDs;
	console.log("Display size: "+width+"x"+height);
	console.log("--> Special LEDs before screen: "+preLEDs);	
	console.log("--> Special LEDs after screen: "+afterLEDs);	
}

var mirrorH = function(arr)
{
	var arr2 = Array();
	for(var y=0;y<arr.length;y++)
	{
		var arrLine = Array();
		for(x=arr[y].length-1;x>=0;x--)
			arrLine.push(arr[y][x]);
		arr2.push(arrLine);	
	}
	return arr2;
};

// mirror the screen vertically
var mirrorV = function(arr)
{
	var arr2 = Array();
	for(var y=arr.length-1;y>=0;y--)
	{
			arr2.push(arr[y]);
	}
	return arr2;
};

// ++++ get (some) characters of a text onto the screen.
var getRenderText = function(text, posX, charset)
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
	var charheight = charset.height();
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
			// maybe add command and reset symbol.
			if(parseCommand(symbol)==true)
			{
				symbol = "";
			}
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
		if(!getSymbol && symbol!="")
		{
			// get the symbol.
			var chsym = charset.get(symbol);
			var chwidth=charset.width(symbol);
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

// ++++ checks if a symbol is a command and ads it to the command list.
var parseCommand = function(symbol, verbose)
{
	if(verbose) console.log("Parsing: "+symbol);
	if(symbol.length > 0)
	{
		if(symbol[0]=="%")
		{
			if(verbose) console.log("--> ITs A COMMAND!");
			return true;
		}
	}
	return false;
}

// ++++ get the real text length counting special symbols as 1.
// charset is the loaded charset variable (with require).
var getRealTextLength = function(text, charset)
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
			if(parseCommand(symbol, true)==true)
			{
				symbol = "";
				vtlen--;
			}
			vtlen--;
		}

		if(getSymbol) 
		{
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

		// add the width of the symbol.
		if(charset && symbol!="" && !getSymbol)
			vtPlen += charset.width(symbol);
	}
	
	if(charset)
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
	var NUM_LEDS = preLEDs+(screenWidth*screenHeight)+afterLEDs;
	var pd = new Uint32Array(NUM_LEDS);
	for(var i=0;i<NUM_LEDS;i++)
		pd[i]=0;
	return pd;	
}

// ++++ Add a rain effect to the given screen array.
var snowScreen = [];
var snow = [];
var hasSnow = false;
var snowSteps = 0;

function addSnow(screenData, steps)
{
	// initialize
	if(!hasSnow)
	{
		// create the snow screen;
		for(x=0;x<screenWidth;x++)
		{
			yline = [];
			snowScreen.push(yline);
			for(y=0;y<screenHeight;y++)
			{
				snowScreen[x][y] = 0;
			}
		}
		
		for(s=0;s<10;s++)
			snow.push(parseInt(Math.random()*screenHeight)+screenHeight);
		
		hasSnow=true;
	}
	
	// clear snow screen except the last two lines.
	for(x=0;x<screenWidth;x++)
	{
		var h=0;
		if(screenHeight>2)
			h=1;
		for(y=h;y<screenHeight;y++)
		{
			snowScreen[x][y]=0;
		}
	}
	
	// render snow flakes.
	for(p=0;p<10;p++)
	{
		if(snow[p]>=0 && snow[p]<screenHeight)
			snowScreen[p][snow[p]]=1;
	}
	
	// set colour
	var screenSize=screenData.length;
	for(x=0;x<screenWidth;x++)
	{
		for(y=0;y<screenHeight;y++)
		{
			var pos= y*screenWidth+x;
			// melting snow

			// set color
			if(pos>=0 && pos<screenSize && snowScreen[x][y]==1)
			{
				screenData[pos] = colours.get(10); // 4 is blue				
			}
		}
		//var pos= rain[x]*screenWidth+x-(x%2);
		//if(pos>=0 && pos<screenSize)
		//		screenData[pos] = colours.get(10); // 4 is blue
	}

	// move
	if(snowSteps > steps)
	{
		for(x=0;x<10;x++)
		{
			snow[x]-=1;
			if(snow[x]< 0)
				snow[x]= parseInt( Math.random()*10)+10;
		}
		snowSteps = 0;
	}
	
	snowSteps++;
	return screenData;
}

// MODULE EXPORTS
module.exports.setDisplaySize = setLEDDisplaySize;
module.exports.getRealTextLength = getRealTextLength;
module.exports.getRenderText = getRenderText;
module.exports.clearData = clearData;
module.exports.mirrorH = mirrorH;
module.exports.mirrorV = mirrorV;
module.exports.addSnow = addSnow;
