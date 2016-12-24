/*
	LED_colours module for Node.js
	Set and get colours on different palettes, as RGB-Integers.

	by Beni Yager from Grenchen of the Families Jaeggi, Schoell and Byland
	@ web4me, a subsidiary branch of 4me GmbH, Grenchen, Switzerland

	Copyleft 2016

	Free use allowed if you include the author credits above.
*/

var actualpalette = 0;

var palette = Array();

// get a colour on the actual palette.
var getColour = function(index)
{
	return getColourDirect(actualpalette, index);
};

// get a colour direct from your desired palette.
var getColourDirect = function(paletteIndex, colorIndex)
{
	if(!palette[paletteIndex])
		return 0;
	if(!palette[paletteIndex][colorIndex])
		return 0;
	return palette[paletteIndex][colorIndex];
}

// set a colour for a specific palette.
var setColour = function(colourIndex, R, G, B)
{
	setColourDirect(actualpalette, colourIndex);
};

// set a colour for a specific palette.
var setColourDirect = function(paletteIndex,colourIndex, R, G, B)
{
	if(!palette[paletteIndex])
		palette[paletteIndex] = Array();
	palette[paletteIndex][colourIndex] = rgb2Int(R, G, B);
};


// switch to another palette.
var switchToPalette = function(paletteIndex)
{
	actualpalette = paletteIndex;
};

// convert 3 values to an RGB-Integer.
var rgb2Int = function(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
};

/* Define some colours
	Standard colours are in palette 0.
	Eye friendly colours are in palette 1. (white is yellowish, blue is not to strong.)
	Overwrite them for your needs in YOUR code, please.
*/

// Standard set.
setColour(0,0,0,0,0); 		// 0 = Black
setColour(0,1,255,255,255); 	// 1 = White
setColour(0,2,255,0, 0); 	// 2 = Red
setColour(0,3,0,255,0); 	// 3 = Green
setColour(0,4,0,0,255); 	// 4 = Blue
setColour(0,5,255,127,0); 	// 5 = Orange
setColour(0,6,255,255,0); 	// 6 = Yellow
setColour(0,7,255,0,127);	// 7 = Pink/Rose
setColour(0,8,0,255,127);	// 8 = Turkis

// Eye friendly set.
setColour(1,0,0,0,0); 		// 0 = Black
setColour(1,1,255,255,127); 	// 1 = White
setColour(1,2,255,0, 0); 	// 2 = Red
setColour(1,3,0,255,0); 	// 3 = Green
setColour(1,4,0,0,127); 	// 4 = Blue
setColour(1,5,255,127,0); 	// 5 = Orange
setColour(1,6,127,127,0); 	// 6 = Yellow
setColour(1,7,127,0,64);	// 7 = Pink/Rose
setColour(1,8,0,127,64);	// 8 = Turkis

// EXPORTS
module.exports.RGBtoInt = rgb2Int;
module.exports.get = getColour;
module.exports.getDirect = getColourDirect;
module.exports.set = setColour;
module.exports.set = setColourDirect;
module.exports.switchToPalette = switchToPalette;
