var ws281x = require('../lib/ws281x-native');

var NUM_LEDS = parseInt(process.argv[2], 10) || 10,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});


// ---- animation-loop
var screenwidth=10;
var scr = new Array();
var scX=new Array();
scX.push(1,0,0,0,0,0,0,0,0,1);
scX.push(0,1,0,0,0,0,0,0,1,0);
scX.push(0,0,1,0,0,0,0,1,0,0);
scX.push(0,0,0,1,0,0,1,0,0,0);
scX.push(0,0,0,0,1,1,0,0,0,0);
scX.push(0,0,0,0,1,1,0,0,0,0);
scX.push(0,0,0,1,0,0,1,0,0,0);
scX.push(0,0,1,0,0,0,0,1,0,0);
scX.push(0,1,0,0,0,0,0,0,1,0);
scX.push(1,0,0,0,0,0,0,0,0,1);

scr["x"] = scr["X"] = scX;

/*
scr[0] = [0,0,0,1,1,1,1,0,0,0];
scr[1] = [0,0,1,0,0,0,0,1,0,0];
scr[2] = [0,1,0,0,0,0,0,0,1,0];
scr[3] = [1,0,0,1,0,0,1,0,0,1];
scr[4] = [1,0,0,0,0,0,0,0,0,1];
scr[5] = [1,0,0,0,0,0,0,0,0,1];
scr[6] = [1,0,0,1,0,0,1,0,0,1];
scr[7] = [0,1,0,0,1,1,0,0,1,0];
scr[8] = [0,0,1,0,0,0,0,1,0,0];
scr[9] = [0,0,0,1,1,1,1,0,0,0];
*/

var offset = 0;

setInterval(function () 
{
/*  for (var i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = colorwheel((offset + i) % 256);
  }
*/
//  offset = (offset + 1) % 256;

	for(var y=0;y<scr["X"].length;y++)
	{
		var ind=y; //*screenwidth + x;
		if(ind<NUM_LEDS)
		{
			var r=0;
			if(scr["X"][y]==1)
				r=255;
			pixelData[ind]=rgb2Int(r, 0, 0);
		}
	}

  ws281x.render(pixelData);
}, 1000 / 30);

console.log('Press <ctrl>+C to exit.');


// rainbow-colors, taken from http://goo.gl/Cs3H0v
function colorwheel(pos) {
  pos = 255 - pos;
  if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
  else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
  else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
}

function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}