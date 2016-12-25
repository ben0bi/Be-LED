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
	setColourDirect(actualpalette, colourIndex, R, G, B);
};

// set a colour for a specific palette.
var setColourDirect = function(paletteIndex,colourIndex, R, G, B)
{
	if(!palette[paletteIndex])
		palette[paletteIndex] = Array();
	palette[paletteIndex][colourIndex] = rgb2Int(R, G, B);
};


// switch to another palette.
var switchToPalette = function(paletteIndex) {actualpalette = paletteIndex;};

// return the actual palette index.
var getActualPaletteIndex = function() {return actualpalette;}

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
setColourDirect(0,0,0,0,0); 		// 0 = Black
setColourDirect(0,1,255,255,255); 	// 1 = White
setColourDirect(0,2,255,0, 0); 		// 2 = Red
setColourDirect(0,3,0,255,0); 		// 3 = Green
setColourDirect(0,4,0,0,255); 		// 4 = Blue
setColourDirect(0,5,255,127,0); 	// 5 = Orange
setColourDirect(0,6,255,255,0); 	// 6 = Yellow
setColourDirect(0,7,255,0,127);		// 7 = Pink/Rose
setColourDirect(0,8,0,255,127);		// 8 = Turkis

// Eye friendly set.
setColourDirect(1,0,0,0,0); 		// 0 = Black
setColourDirect(1,1,255,255,127); 	// 1 = White
setColourDirect(1,2,255,0, 0); 		// 2 = Red
setColourDirect(1,3,0,255,0); 		// 3 = Green
setColourDirect(1,4,0,0,127); 		// 4 = Blue
setColourDirect(1,5,255,127,0); 	// 5 = Orange
setColourDirect(1,6,127,127,0); 	// 6 = Yellow
setColourDirect(1,7,127,0,64);		// 7 = Pink/Rose
setColourDirect(1,8,0,127,64);		// 8 = Turkis

// Standard set, switched colours
setColourDirect(2,0,255,255,255); 	// 0 = White
setColourDirect(2,1,0,0,0); 		// 1 = Black
setColourDirect(2,2,255,0, 0); 		// 2 = Red
setColourDirect(2,3,0,255,0); 		// 3 = Green
setColourDirect(2,4,0,0,255); 		// 4 = Blue
setColourDirect(2,5,255,127,0); 	// 5 = Orange
setColourDirect(2,6,255,255,0); 	// 6 = Yellow
setColourDirect(2,7,255,0,127);		// 7 = Pink/Rose
setColourDirect(2,8,0,255,127);		// 8 = Turkis

// EXPORTS
module.exports.RGBtoInt = rgb2Int;
module.exports.get = getColour;
module.exports.getDirect = getColourDirect;
module.exports.set = setColour;
module.exports.setColour = setColourDirect;
module.exports.switchToPalette = switchToPalette;
module.exports.getActualPaletteIndex = getActualPaletteIndex;
