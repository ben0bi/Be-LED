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

module.exports.mirrorH = mirrorH;
module.exports.mirrorV = mirrorV;
