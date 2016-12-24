/*
	LED character set module for Node.js
	Font #3 + Multispace Characters, the absolutely nice ones.
	Including lower chars.

	by Beni Yager from Grenchen of the Families Jaeggi, Schoell and Byland
	@ web4me, a subsidiary branch of 4me GmbH, Grenchen, Switzerland

	Copyleft 2016

	Free use allowed if you include the author credits above.
*/


// ----- some monocolor, MULTIspace symbols [Xx10]
var LF = require("../LED_functions");

// turn screen to the left / NOT USED YET, NOT FUNCIONAL anymore.
/*
var turn90deg10x10left = function(arr)
{
	var arr2 = Array();
	for(var x=0;x<10;x++)
	{
		for(var y=9;y>=0;y--)
		{
			var i = y*mcs_screenwidth + x;
			if(i<arr.length)
				arr2.push(arr[i]);
		}
	}
	return arr2;
};
*/

var scr = new Array();

// Palette Test Character for indices 0 to 9
var scPal=new Array();
scPal.push([0,1,2,3,4,5,6,7,8,9]);
scPal.push([0,1,2,3,4,5,6,7,8,9]);
scPal.push([0,1,2,3,4,5,6,7,8,9]);
scPal.push([0,1,2,3,4,5,6,7,8,9]);
scPal.push([0,1,2,3,4,5,6,7,8,9]);
scPal.push([0,1,2,3,4,5,6,7,8,9]);
scPal.push([0,1,2,3,4,5,6,7,8,9]);
scPal.push([0,1,2,3,4,5,6,7,8,9]);
scPal.push([0,1,2,3,4,5,6,7,8,9]);
scPal.push([0,1,2,3,4,5,6,7,8,9]);
scr["Pal"] = scr["pal"] = scr["PAL"] = scr["Test"] = scr["test"]= scr["TEST"] = scPal;

// NUMBERS

// 0
var scNull=new Array();
scNull.push([0,0,0,0,0,0,0,0,0]);
scNull.push([0,0,0,0,0,0,0,0,0]);
scNull.push([0,0,0,1,1,1,0,0,0]);
scNull.push([0,0,1,0,0,0,1,0,0]);
scNull.push([0,1,0,0,0,1,0,1,0]);
scNull.push([0,1,0,0,1,0,0,1,0]);
scNull.push([0,1,0,1,0,0,0,1,0]);
scNull.push([0,0,1,0,0,0,1,0,0]);
scNull.push([0,0,0,1,1,1,0,0,0]);
scNull.push([0,0,0,0,0,0,0,0,0]);
var scNull = LF.mirrorV(scNull);
scr[0] = scr["0"] = scr["Null"] = scr["null"] = scr["NULL"] = scNull;

// 1
var sc1=new Array();
sc1.push([0,0,0,0,0]);
sc1.push([0,0,0,0,0]);
sc1.push([0,0,0,1,0]);
sc1.push([0,0,1,1,0]);
sc1.push([0,1,0,1,0]);
sc1.push([0,0,0,1,0]);
sc1.push([0,0,0,1,0]);
sc1.push([0,0,0,1,0]);
sc1.push([0,0,0,1,0]);
sc1.push([0,0,0,0,0]);
sc1 = LF.mirrorV(sc1);
scr[1] = scr["1"] = sc1;

// 2
var sc2=new Array();
sc2.push([0,0,0,0,0,0,0]);
sc2.push([0,0,0,0,0,0,0]);
sc2.push([0,0,1,1,1,0,0]);
sc2.push([0,1,0,0,0,1,0]);
sc2.push([0,0,0,0,0,1,0]);
sc2.push([0,0,0,0,1,0,0]);
sc2.push([0,0,0,1,0,0,0]);
sc2.push([0,0,1,0,0,0,0]);
sc2.push([0,1,1,1,1,1,0]);
sc2.push([0,0,0,0,0,0,0]);
sc2 = LF.mirrorV(sc2);
scr[2] = scr["2"] = sc2;

// 3
var sc3=new Array();
sc3.push([0,0,0,0,0,0,0]);
sc3.push([0,0,0,0,0,0,0]);
sc3.push([0,0,1,1,1,0,0]);
sc3.push([0,1,0,0,0,1,0]);
sc3.push([0,0,0,0,0,1,0]);
sc3.push([0,0,0,1,1,0,0]);
sc3.push([0,0,0,0,0,1,0]);
sc3.push([0,1,0,0,0,1,0]);
sc3.push([0,0,1,1,1,0,0]);
sc3.push([0,0,0,0,0,0,0]);
sc3 = LF.mirrorV(sc3);
scr[3] = scr["3"] = sc3;

// 4
var sc4=new Array();
sc4.push([0,0,0,0,0,0,0,0,0]);
sc4.push([0,0,0,0,0,0,0,0,0]);
sc4.push([0,0,0,0,0,1,0,0,0]);
sc4.push([0,0,0,0,1,1,0,0,0]);
sc4.push([0,0,0,1,0,1,0,0,0]);
sc4.push([0,0,1,0,0,1,0,0,0]);
sc4.push([0,1,1,1,1,1,1,1,0]);
sc4.push([0,0,0,0,0,1,0,0,0]);
sc4.push([0,0,0,0,0,1,0,0,0]);
sc4.push([0,0,0,0,0,0,0,0,0]);
sc4 = LF.mirrorV(sc4);
scr[4] = scr["4"] = sc4;

// 5
var sc5=new Array();
sc5.push([0,0,0,0,0,0,0]);
sc5.push([0,0,0,0,0,0,0]);
sc5.push([0,1,1,1,1,1,0]);
sc5.push([0,1,0,0,0,0,0]);
sc5.push([0,1,1,1,0,0,0]);
sc5.push([0,0,0,0,1,0,0]);
sc5.push([0,0,0,0,0,1,0]);
sc5.push([0,1,0,0,0,1,0]);
sc5.push([0,0,1,1,1,0,0]);
sc5.push([0,0,0,0,0,0,0]);
sc5 = LF.mirrorV(sc5);
scr[5] = scr["5"] = sc5;

// 6, 9
var sc6=new Array();
sc6.push([0,0,0,0,0,0,0]);
sc6.push([0,0,0,0,0,0,0]);
sc6.push([0,0,1,1,1,1,0]);
sc6.push([0,1,0,0,0,0,0]);
sc6.push([0,1,1,1,1,0,0]);
sc6.push([0,1,0,0,0,1,0]);
sc6.push([0,1,0,0,0,1,0]);
sc6.push([0,1,0,0,0,1,0]);
sc6.push([0,0,1,1,1,0,0]);
sc6.push([0,0,0,0,0,0,0]);
sc6 = LF.mirrorV(sc6);
scr[6] = scr["6"] = sc6;

// 7
var sc7=new Array();
sc7.push([0,0,0,0,0,0,0,0,0]);
sc7.push([0,0,0,0,0,0,0,0,0]);
sc7.push([0,1,1,1,1,1,1,1,0]);
sc7.push([0,0,0,0,0,0,1,0,0]);
sc7.push([0,0,0,0,0,1,0,0,0]);
sc7.push([0,0,0,0,1,0,0,0,0]);
sc7.push([0,0,0,1,1,1,0,0,0]);
sc7.push([0,0,0,0,1,0,0,0,0]);
sc7.push([0,0,0,0,1,0,0,0,0]);
sc7.push([0,0,0,0,0,0,0,0,0]);
sc7 = LF.mirrorV(sc7);
scr[7] = scr["7"] = sc7;

// 8
var sc8=new Array();
sc8.push([0,0,0,0,0,0,0]);
sc8.push([0,0,0,0,0,0,0]);
sc8.push([0,0,1,1,1,0,0]);
sc8.push([0,1,0,0,0,1,0]);
sc8.push([0,0,1,0,1,0,0]);
sc8.push([0,0,0,1,0,0,0]);
sc8.push([0,0,1,0,1,0,0]);
sc8.push([0,1,0,0,0,1,0]);
sc8.push([0,0,1,1,1,0,0]);
sc8.push([0,0,0,0,0,0,0]);
sc8 = LF.mirrorV(sc8);
scr[8] = scr["8"] = sc8;

var sc9=new Array();
sc9.push([0,0,0,0,0,0,0]);
sc9.push([0,0,0,0,0,0,0]);
sc9.push([0,0,1,1,1,0,0]);
sc9.push([0,1,0,0,0,1,0]);
sc9.push([0,1,0,0,0,1,0]);
sc9.push([0,0,1,1,1,1,0]);
sc9.push([0,0,0,0,0,1,0]);
sc9.push([0,1,0,0,0,1,0]);
sc9.push([0,0,1,1,1,0,0]);
sc9.push([0,0,0,0,0,0,0]);
sc9 = LF.mirrorV(sc9);
scr[9] = scr["9"] = sc9;

// CHARACTERS

// A
var scA=new Array();
scA.push([0,0,0,0,0,0,0]);
scA.push([0,0,0,0,0,0,0]);
scA.push([0,0,0,1,0,0,0]);
scA.push([0,0,1,0,1,0,0]);
scA.push([0,1,0,0,0,1,0]);
scA.push([0,1,1,1,1,1,0]);
scA.push([0,1,0,0,0,1,0]);
scA.push([0,1,0,0,0,1,0]);
scA.push([0,1,0,0,0,1,0]);
scA.push([0,0,0,0,0,0,0]);
scA = LF.mirrorV(scA);
scr[10] = scr["a"] = scr["A"] = scA;

// B
var scB=new Array();
scB.push([0,0,0,0,0,0,0]);
scB.push([0,0,0,0,0,0,0]);
scB.push([0,1,1,1,1,0,0]);
scB.push([0,1,0,0,0,1,0]);
scB.push([0,1,0,0,0,1,0]);
scB.push([0,1,1,1,1,0,0]);
scB.push([0,1,0,0,0,1,0]);
scB.push([0,1,0,0,0,1,0]);
scB.push([0,1,1,1,1,0,0]);
scB.push([0,0,0,0,0,0,0]);
scB = LF.mirrorV(scB);
scr[11] = scr["b"] = scr["B"] = scB;

// C
var scC=new Array();
scC.push([0,0,0,0,0,0,0]);
scC.push([0,0,0,0,0,0,0]);
scC.push([0,0,0,1,1,0,0]);
scC.push([0,0,1,0,0,1,0]);
scC.push([0,1,0,0,0,0,0]);
scC.push([0,1,0,0,0,0,0]);
scC.push([0,1,0,0,0,0,0]);
scC.push([0,0,1,0,0,1,0]);
scC.push([0,0,0,1,1,0,0]);
scC.push([0,0,0,0,0,0,0]);
scC = LF.mirrorV(scC);
scr[12] = scr["c"] = scr["C"] = scC;

// D
var scD=new Array();
scD.push([0,0,0,0,0,0,0]);
scD.push([0,0,0,0,0,0,0]);
scD.push([0,1,1,1,0,0,0]);
scD.push([0,1,0,0,1,0,0]);
scD.push([0,1,0,0,0,1,0]);
scD.push([0,1,0,0,0,1,0]);
scD.push([0,1,0,0,0,1,0]);
scD.push([0,1,0,0,1,0,0]);
scD.push([0,1,1,1,0,0,0]);
scD.push([0,0,0,0,0,0,0]);
scD = LF.mirrorV(scD);
scr[13] = scr["d"] = scr["D"] = scD;

// E
var scE=new Array();
scE.push([0,0,0,0,0,0,0]);
scE.push([0,0,0,0,0,0,0]);
scE.push([0,1,1,1,1,1,0]);
scE.push([0,1,0,0,0,0,0]);
scE.push([0,1,0,0,0,0,0]);
scE.push([0,1,1,1,1,0,0]);
scE.push([0,1,0,0,0,0,0]);
scE.push([0,1,0,0,0,0,0]);
scE.push([0,1,1,1,1,1,0]);
scE.push([0,0,0,0,0,0,0]);
scE = LF.mirrorV(scE);
scr[14] = scr["e"] = scr["E"] = scE;

// F
var scF=new Array();
scF.push([0,0,0,0,0,0,0]);
scF.push([0,0,0,0,0,0,0]);
scF.push([0,1,1,1,1,1,0]);
scF.push([0,1,0,0,0,0,0]);
scF.push([0,1,0,0,0,0,0]);
scF.push([0,1,1,1,1,0,0]);
scF.push([0,1,0,0,0,0,0]);
scF.push([0,1,0,0,0,0,0]);
scF.push([0,1,0,0,0,0,0]);
scF.push([0,0,0,0,0,0,0]);
scF = LF.mirrorV(scF);
scr[15] = scr["f"] = scr["F"] = scF;

// G
var scG=new Array();
scG.push([0,0,0,0,0,0,0]);
scG.push([0,0,0,0,0,0,0]);
scG.push([0,0,1,1,1,1,0]);
scG.push([0,1,0,0,0,0,0]);
scG.push([0,1,0,0,0,0,0]);
scG.push([0,1,0,0,1,1,0]);
scG.push([0,1,0,0,0,1,0]);
scG.push([0,1,0,0,0,1,0]);
scG.push([0,0,1,1,1,0,0]);
scG.push([0,0,0,0,0,0,0]);
scG = LF.mirrorV(scG);
scr[16] = scr["g"] = scr["G"] = scG;

// H
var scH=new Array();
scH.push([0,0,0,0,0,0,0]);
scH.push([0,0,0,0,0,0,0]);
scH.push([0,1,0,0,0,1,0]);
scH.push([0,1,0,0,0,1,0]);
scH.push([0,1,0,0,0,1,0]);
scH.push([0,1,1,1,1,1,0]);
scH.push([0,1,0,0,0,1,0]);
scH.push([0,1,0,0,0,1,0]);
scH.push([0,1,0,0,0,1,0]);
scH.push([0,0,0,0,0,0,0]);
scH = LF.mirrorV(scH);
scr[17] = scr["h"] = scr["H"] = scH;

// I
var scI=new Array();
scI.push([0,0,0,0,0]);
scI.push([0,0,0,0,0]);
scI.push([0,1,1,1,0]);
scI.push([0,0,1,0,0]);
scI.push([0,0,1,0,0]);
scI.push([0,0,1,0,0]);
scI.push([0,0,1,0,0]);
scI.push([0,0,1,0,0]);
scI.push([0,1,1,1,0]);
scI.push([0,0,0,0,0]);
scI = LF.mirrorV(scI);
scr[18] = scr["i"] = scr["I"] = scI;

// J
var scJ=new Array();
scJ.push([0,0,0,0,0,0,0]);
scJ.push([0,0,0,0,0,0,0]);
scJ.push([0,1,1,1,1,1,0]);
scJ.push([0,0,0,0,0,1,0]);
scJ.push([0,0,0,0,0,1,0]);
scJ.push([0,1,0,0,0,1,0]);
scJ.push([0,1,0,0,0,1,0]);
scJ.push([0,0,1,0,1,0,0]);
scJ.push([0,0,0,1,0,0,0]);
scJ.push([0,0,0,0,0,0,0,0]);
scJ = LF.mirrorV(scJ);
scr[19] = scr["j"] = scr["J"] = scJ;

// K
var scK=new Array();
scK.push([0,0,0,0,0,0,0]);
scK.push([0,0,0,0,0,0,0]);
scK.push([0,1,0,0,0,1,0]);
scK.push([0,1,0,0,1,0,0]);
scK.push([0,1,0,1,0,0,0]);
scK.push([0,1,1,0,0,0,0]);
scK.push([0,1,0,1,0,0,0]);
scK.push([0,1,0,0,1,0,0]);
scK.push([0,1,0,0,0,1,0]);
scK.push([0,0,0,0,0,0,0]);
scK = LF.mirrorV(scK);
scr[20] = scr["k"] = scr["K"] = scK;

// L
var scL=new Array();
scL.push([0,0,0,0,0,0]);
scL.push([0,0,0,0,0,0]);
scL.push([0,1,0,0,0,0]);
scL.push([0,1,0,0,0,0]);
scL.push([0,1,0,0,0,0]);
scL.push([0,1,0,0,0,0]);
scL.push([0,1,0,0,0,0]);
scL.push([0,1,0,0,0,0]);
scL.push([0,1,1,1,1,0]);
scL.push([0,0,0,0,0,0]);
scL = LF.mirrorV(scL);
scr[21] = scr["l"] = scr["L"] = scL;

// M
var scM=new Array();
scM.push([0,0,0,0,0,0,0,0,0]);
scM.push([0,0,0,0,0,0,0,0,0]);
scM.push([0,1,1,0,0,0,1,1,0]);
scM.push([0,1,0,1,0,1,0,1,0]);
scM.push([0,1,0,0,1,0,0,1,0]);
scM.push([0,1,0,0,0,0,0,1,0]);
scM.push([0,1,0,0,0,0,0,1,0]);
scM.push([0,1,0,0,0,0,0,1,0]);
scM.push([0,1,0,0,0,0,0,1,0]);
scM.push([0,0,0,0,0,0,0,0,0]);
scM = LF.mirrorV(scM);
scr[22] = scr["m"] = scr["M"] = scM;

// N
var scN=new Array();
scN.push([0,0,0,0,0,0,0,0,0]);
scN.push([0,0,0,0,0,0,0,0,0]);
scN.push([0,1,0,0,0,0,0,1,0]);
scN.push([0,1,1,0,0,0,0,1,0]);
scN.push([0,1,0,1,0,0,0,1,0]);
scN.push([0,1,0,0,1,0,0,1,0]);
scN.push([0,1,0,0,0,1,0,1,0]);
scN.push([0,1,0,0,0,0,1,1,0]);
scN.push([0,1,0,0,0,0,0,1,0]);
scN.push([0,0,0,0,0,0,0,0,0]);
scN = LF.mirrorV(scN);
scr[23] = scr["n"] = scr["N"] = scN;

// O
var scO=new Array();
scO.push([0,0,0,0,0,0,0,0,0]);
scO.push([0,0,0,0,0,0,0,0,0]);
scO.push([0,0,0,1,1,1,0,0,0]);
scO.push([0,0,1,0,0,0,1,0,0]);
scO.push([0,1,0,0,0,0,0,1,0]);
scO.push([0,1,0,0,0,0,0,1,0]);
scO.push([0,1,0,0,0,0,0,1,0]);
scO.push([0,0,1,0,0,0,1,0,0]);
scO.push([0,0,0,1,1,1,0,0,0]);
scO.push([0,0,0,0,0,0,0,0,0]);
scO = LF.mirrorV(scO);
scr[24] = scr["o"] = scr["O"] = scO;

// P
var scP=new Array();
scP.push([0,0,0,0,0,0,0]);
scP.push([0,0,0,0,0,0,0]);
scP.push([0,1,1,1,0,0,0]);
scP.push([0,1,0,0,1,0,0]);
scP.push([0,1,0,0,0,1,0]);
scP.push([0,1,0,0,1,0,0]);
scP.push([0,1,1,1,0,0,0]);
scP.push([0,1,0,0,0,0,0]);
scP.push([0,1,0,0,0,0,0]);
scP.push([0,0,0,0,0,0,0]);
scP = LF.mirrorV(scP);
scr[25] = scr["p"] = scr["P"] = scP;

// Q
var scQ=new Array();
scQ.push([0,0,0,0,0,0,0,0,0]);
scQ.push([0,0,0,0,0,0,0,0,0]);
scQ.push([0,0,0,1,1,1,0,0,0]);
scQ.push([0,0,1,0,0,0,1,0,0]);
scQ.push([0,1,0,0,0,0,0,1,0]);
scQ.push([0,1,0,0,0,0,0,1,0]);
scQ.push([0,1,0,0,0,1,0,1,0]);
scQ.push([0,0,1,0,0,0,1,0,0]);
scQ.push([0,0,0,1,1,1,0,1,0]);
scQ.push([0,0,0,0,0,0,0,0,0]);
scQ = LF.mirrorV(scQ);
scr[26] = scr["q"] = scr["Q"] = scQ;

// R
var scR=new Array();
scR.push([0,0,0,0,0,0,0]);
scR.push([0,0,0,0,0,0,0]);
scR.push([0,1,1,1,0,0,0]);
scR.push([0,1,0,0,1,0,0]);
scR.push([0,1,0,0,0,1,0]);
scR.push([0,1,0,0,1,0,0]);
scR.push([0,1,1,1,0,0,0]);
scR.push([0,1,0,0,1,0,0]);
scR.push([0,1,0,0,0,1,0]);
scR.push([0,0,0,0,0,0,0]);
scR = LF.mirrorV(scR);
scr[27] = scr["r"] = scr["R"] = scR;

// S
var scS=new Array();
scS.push([0,0,0,0,0,0]);
scS.push([0,0,0,0,0,0]);
scS.push([0,0,1,1,1,0]);
scS.push([0,1,0,0,0,0]);
scS.push([0,1,0,0,0,0]);
scS.push([0,0,1,1,0,0]);
scS.push([0,0,0,0,1,0]);
scS.push([0,0,0,0,1,0]);
scS.push([0,1,1,1,0,0]);
scS.push([0,0,0,0,0,0]);
scS = LF.mirrorV(scS);
scr[28] = scr["s"] = scr["S"] = scS;

// T
var scT=new Array();
scT.push([0,0,0,0,0,0,0]);
scT.push([0,0,0,0,0,0,0]);
scT.push([0,1,1,1,1,1,0]);
scT.push([0,0,0,1,0,0,0]);
scT.push([0,0,0,1,0,0,0]);
scT.push([0,0,0,1,0,0,0]);
scT.push([0,0,0,1,0,0,0]);
scT.push([0,0,0,1,0,0,0]);
scT.push([0,0,0,1,0,0,0]);
scT.push([0,0,0,0,0,0,0]);
scT = LF.mirrorV(scT);
scr[29] = scr["t"] = scr["T"] = scT;

// U
var scU=new Array();
scU.push([0,0,0,0,0,0,0,0,0]);
scU.push([0,0,0,0,0,0,0,0,0]);
scU.push([0,1,0,0,0,0,0,1,0]);
scU.push([0,1,0,0,0,0,0,1,0]);
scU.push([0,1,0,0,0,0,0,1,0]);
scU.push([0,1,0,0,0,0,0,1,0]);
scU.push([0,1,0,0,0,0,0,1,0]);
scU.push([0,0,1,0,0,0,1,0,0]);
scU.push([0,0,0,1,1,1,0,0,0]);
scU.push([0,0,0,0,0,0,0,0,0]);
scU = LF.mirrorV(scU);
scr[30] = scr["u"] = scr["U"] = scU;

// V
var scV=new Array();
scV.push([0,0,0,0,0,0,0,0,0]);
scV.push([0,0,0,0,0,0,0,0,0]);
scV.push([0,1,0,0,0,0,0,1,0]);
scV.push([0,1,0,0,0,0,0,1,0]);
scV.push([0,1,0,0,0,0,0,1,0]);
scV.push([0,1,0,0,0,0,0,1,0]);
scV.push([0,0,1,0,0,0,1,0,0]);
scV.push([0,0,0,1,0,1,0,0,0]);
scV.push([0,0,0,0,1,0,0,0,0]);
scV.push([0,0,0,0,0,0,0,0,0]);
scV = LF.mirrorV(scV);
scr[31] = scr["v"] = scr["V"] = scV;

// W
var scW=new Array();
scW.push([0,0,0,0,0,0,0,0,0]);
scW.push([0,0,0,0,0,0,0,0,0]);
scW.push([0,1,0,0,0,0,0,1,0]);
scW.push([0,1,0,0,0,0,0,1,0]);
scW.push([0,1,0,0,0,0,0,1,0]);
scW.push([0,1,0,0,0,0,0,1,0]);
scW.push([0,1,0,0,1,0,0,1,0]);
scW.push([0,1,0,1,0,1,0,1,0]);
scW.push([0,0,1,0,0,0,1,0,0]);
scW.push([0,0,0,0,0,0,0,0,0]);
scW = LF.mirrorV(scW);
scr[32] = scr["w"] = scr["W"] = scW;

// X
var scX=new Array();
scX.push([0,0,0,0,0,0,0,0,0]);
scX.push([0,0,0,0,0,0,0,0,0]);
scX.push([0,1,0,0,0,0,0,1,0]);
scX.push([0,0,1,0,0,0,1,0,0]);
scX.push([0,0,0,1,0,1,0,0,0]);
scX.push([0,0,0,0,1,0,0,0,0]);
scX.push([0,0,0,1,0,1,0,0,0]);
scX.push([0,0,1,0,0,0,1,0,0]);
scX.push([0,1,0,0,0,0,0,1,0]);
scX.push([0,0,0,0,0,0,0,0,0]);
scX = LF.mirrorV(scX);
scr[33] = scr["x"] = scr["X"] = scX;

// Y
var scY=new Array();
scY.push([0,0,0,0,0,0,0,0,0]);
scY.push([0,0,0,0,0,0,0,0,0]);
scY.push([0,1,0,0,0,0,0,1,0]);
scY.push([0,0,1,0,0,0,1,0,0]);
scY.push([0,0,0,1,0,1,0,0,0]);
scY.push([0,0,0,0,1,0,0,0,0]);
scY.push([0,0,0,0,1,0,0,0,0]);
scY.push([0,0,0,0,1,0,0,0,0]);
scY.push([0,0,0,0,1,0,0,0,0]);
scY.push([0,0,0,0,0,0,0,0,0]);
scY = LF.mirrorV(scY);
scr[34] = scr["y"] = scr["Y"] = scY;

// Z
var scZ=new Array();
scZ.push([0,0,0,0,0,0,0,0,0]);
scZ.push([0,0,0,0,0,0,0,0,0]);
scZ.push([0,1,1,1,1,1,1,1,0]);
scZ.push([0,0,0,0,0,0,1,0,0]);
scZ.push([0,0,0,0,0,1,0,0,0]);
scZ.push([0,0,0,0,1,0,0,0,0]);
scZ.push([0,0,0,1,0,0,0,0,0]);
scZ.push([0,0,1,0,0,0,0,0,0]);
scZ.push([0,1,1,1,1,1,1,1,0]);
scZ.push([0,0,0,0,0,0,0,0,0,0]);
scZ = LF.mirrorV(scZ);
scr[35] = scr["z"] = scr["Z"] = scZ;

// SENTENCE SYMBOLS

// blank, space
var sc=new Array();
sc.push([0,0,0,0,0]);
sc.push([0,0,0,0,0]);
sc.push([0,0,0,0,0]);
sc.push([0,0,0,0,0]);
sc.push([0,0,0,0,0]);
sc.push([0,0,0,0,0]);
sc.push([0,0,0,0,0]);
sc.push([0,0,0,0,0]);
sc.push([0,0,0,0,0]);
sc.push([0,0,0,0,0]);
//sc = LF.mirrorH(sc);
scr[36] = scr[" "]= sc;

// dot (.)
var scDot=new Array();
scDot.push([0,0,0,0]);
scDot.push([0,0,0,0]);
scDot.push([0,0,0,0]);
scDot.push([0,0,0,0]);
scDot.push([0,0,0,0]);
scDot.push([0,0,0,0]);
scDot.push([0,0,0,0]);
scDot.push([0,1,1,0]);
scDot.push([0,1,1,0]);
scDot.push([0,0,0,0]);
scDot = LF.mirrorV(scDot);
scr[37] = scr["."]= scDot;

// comma
var scComma=new Array();
scComma.push([0,0,0,0]);
scComma.push([0,0,0,0]);
scComma.push([0,0,0,0]);
scComma.push([0,0,0,0]);
scComma.push([0,0,0,0]);
scComma.push([0,0,0,0]);
scComma.push([0,0,0,0]);
scComma.push([0,1,1,0]);
scComma.push([0,1,1,0]);
scComma.push([0,0,1,0]);
scComma = LF.mirrorV(scComma);
scr[38] = scr[","]= scComma;

// doubledot
var scDD=new Array();
scDD.push([0,0,0,0]);
scDD.push([0,0,0,0]);
scDD.push([0,1,1,0]);
scDD.push([0,1,1,0]);
scDD.push([0,0,0,0]);
scDD.push([0,0,0,0]);
scDD.push([0,0,0,0]);
scDD.push([0,1,1,0]);
scDD.push([0,1,1,0]);
scDD.push([0,0,0,0]);
scDD = LF.mirrorV(scDD);
scr[39] = scr[":"]= scDD;

// semicolon
var scSemicolon=new Array();
scSemicolon.push([0,0,0,0]);
scSemicolon.push([0,0,0,0]);
scSemicolon.push([0,1,1,0]);
scSemicolon.push([0,1,1,0]);
scSemicolon.push([0,0,0,0]);
scSemicolon.push([0,0,0,0]);
scSemicolon.push([0,0,0,0]);
scSemicolon.push([0,1,1,0]);
scSemicolon.push([0,1,1,0]);
scSemicolon.push([0,0,1,0]);
scSemicolon = LF.mirrorV(scSemicolon);
scr[40] = scr[";"]= scSemicolon;

// slash
var scSlash=new Array();
scSlash.push([0,0,0,0,0,0,0,0,0]);
scSlash.push([0,0,0,0,0,0,0,0,0]);
scSlash.push([0,0,0,0,0,0,0,1,0]);
scSlash.push([0,0,0,0,0,0,1,0,0]);
scSlash.push([0,0,0,0,0,1,0,0,0]);
scSlash.push([0,0,0,0,1,0,0,0,0]);
scSlash.push([0,0,0,1,0,0,0,0,0]);
scSlash.push([0,0,1,0,0,0,0,0,0]);
scSlash.push([0,1,0,0,0,0,0,0,0]);
scSlash.push([0,0,0,0,0,0,0,0,0]);
scSlash = LF.mirrorV(scSlash);
scr[41] = scr["/"]= scSlash;

// @ at 
var scAt=new Array();
scAt.push([0,0,0,0,0,0,0,0,0,0,0]);
scAt.push([0,0,0,0,0,0,0,0,0,0,0]);
scAt.push([0,0,1,1,1,1,1,0,0,0,0]);
scAt.push([0,1,0,0,0,0,0,1,0,1,0]);
scAt.push([0,1,0,0,1,1,0,1,0,1,0]);
scAt.push([0,1,0,1,0,1,0,1,0,1,0]);
scAt.push([0,1,0,0,1,1,1,0,0,1,0]);
scAt.push([0,1,0,0,0,0,0,0,1,0,0]);
scAt.push([0,0,1,1,1,1,1,1,0,0,0]);
scAt.push([0,0,0,0,0,0,0,0,0,0,0]);
scAt = LF.mirrorV(scAt);
scr[42] = scr["@"]= scAt;

// backslash
var scBS=new Array();
scBS.push([0,0,0,0,0,0,0,0,0]);
scBS.push([0,0,0,0,0,0,0,0,0]);
scBS.push([0,1,0,0,0,0,0,0,0]);
scBS.push([0,0,1,0,0,0,0,0,0]);
scBS.push([0,0,0,1,0,0,0,0,0]);
scBS.push([0,0,0,0,1,0,0,0,0]);
scBS.push([0,0,0,0,0,1,0,0,0]);
scBS.push([0,0,0,0,0,0,1,0,0]);
scBS.push([0,0,0,0,0,0,0,1,0]);
scBS.push([0,0,0,0,0,0,0,0,0]);
scBS = LF.mirrorV(scBS);
scr[43] = scr["\\"]= scBS;

// minus
var scMin=new Array();
scMin.push([0,0,0,0,0,0,0]);
scMin.push([0,0,0,0,0,0,0]);
scMin.push([0,0,0,0,0,0,0]);
scMin.push([0,0,0,0,0,0,0]);
scMin.push([0,0,0,0,0,0,0]);
scMin.push([0,1,1,1,1,1,0]);
scMin.push([0,0,0,0,0,0,0]);
scMin.push([0,0,0,0,0,0,0]);
scMin.push([0,0,0,0,0,0,0]);
scMin.push([0,0,0,0,0,0,0]);
scMin = LF.mirrorV(scMin);
scr[44] = scr["-"]= scMin;

// plus
var scPlus=new Array();
scPlus.push([0,0,0,0,0,0,0,0,0]);
scPlus.push([0,0,0,0,0,0,0,0,0]);
scPlus.push([0,0,0,0,1,0,0,0,0]);
scPlus.push([0,0,0,0,1,0,0,0,0]);
scPlus.push([0,0,0,0,1,0,0,0,0]);
scPlus.push([0,1,1,1,1,1,1,1,0]);
scPlus.push([0,0,0,0,1,0,0,0,0]);
scPlus.push([0,0,0,0,1,0,0,0,0]);
scPlus.push([0,0,0,0,1,0,0,0,0]);
scPlus.push([0,0,0,0,0,0,0,0,0]);
scPlus = LF.mirrorV(scPlus);
scr[45] = scr["+"]= scPlus;

// multiplicator
var scMul=new Array();
scMul.push([0,0,0,0,0]);
scMul.push([0,0,0,0,0]);
scMul.push([0,0,0,0,0]);
scMul.push([0,0,0,0,0]);
scMul.push([0,0,1,0,0]);
scMul.push([0,1,1,1,0]);
scMul.push([0,0,1,0,0]);
scMul.push([0,0,0,0,0]);
scMul.push([0,0,0,0,0]);
scMul.push([0,0,0,0,0]);
scMul = LF.mirrorV(scMul);
scr[46] = scr["*"]= scMul;

// equal
var scEq=new Array();
scEq.push([0,0,0,0,0,0,0]);
scEq.push([0,0,0,0,0,0,0]);
scEq.push([0,0,0,0,0,0,0]);
scEq.push([0,1,1,1,1,1,0]);
scEq.push([0,0,0,0,0,0,0]);
scEq.push([0,0,0,0,0,0,0]);
scEq.push([0,0,0,0,0,0,0]);
scEq.push([0,1,1,1,1,1,0]);
scEq.push([0,0,0,0,0,0,0]);
scEq.push([0,0,0,0,0,0,0]);
scEq = LF.mirrorV(scEq);
scr[47] = scr["="]= scEq;

// percent %
var scPercent=new Array();
scPercent.push([0,0,0,0,0,0,0,0,0]);
scPercent.push([0,0,0,0,0,0,0,0,0]);
scPercent.push([0,0,1,0,0,0,0,1,0]);
scPercent.push([0,1,0,1,0,0,1,0,0]);
scPercent.push([0,0,1,0,0,1,0,0,0]);
scPercent.push([0,0,0,0,1,0,0,0,0]);
scPercent.push([0,0,0,1,0,0,1,0,0]);
scPercent.push([0,0,1,0,0,1,0,1,0]);
scPercent.push([0,1,0,0,0,0,1,0,0]);
scPercent.push([0,0,0,0,0,0,0,0,0,0]);
scPercent = LF.mirrorV(scPercent);
scr[48] = scr["%"]= scPercent;

// braces () {}
var scBr1=new Array();
scBr1.push([0,0,0,0,0,0]);
scBr1.push([0,0,0,0,0,0]);
scBr1.push([0,0,0,1,1,0]);
scBr1.push([0,0,1,0,0,0]);
scBr1.push([0,1,0,0,0,0]);
scBr1.push([0,1,0,0,0,0]);
scBr1.push([0,1,0,0,0,0]);
scBr1.push([0,0,1,0,0,0]);
scBr1.push([0,0,0,1,1,0]);
scBr1.push([0,0,0,0,0,0]);
scBr1 = LF.mirrorV(scBr1);
scBr1c = LF.mirrorH(scBr1);
scr[49] = scr["("] = scr["{"] = scBr1;
scr[50] = scr[")"]= scr["}"] = scBr1c;

// braces []
var scBr2=new Array();
scBr2.push([0,0,0,0,0]);
scBr2.push([0,0,0,0,0]);
scBr2.push([0,1,1,1,0]);
scBr2.push([0,1,0,0,0]);
scBr2.push([0,1,0,0,0]);
scBr2.push([0,1,0,0,0]);
scBr2.push([0,1,0,0,0]);
scBr2.push([0,1,0,0,0]);
scBr2.push([0,1,1,1,0]);
scBr2.push([0,0,0,0,0]);
scBr2 = LF.mirrorV(scBr2);
scBr2c = LF.mirrorH(scBr2);
scr[51] = scr["["]= scBr2;
scr[52] = scr["]"]= scBr2c;

// braces, gt, lt <>
var scBr3=new Array();
scBr3.push([0,0,0,0,0,0]);
scBr3.push([0,0,0,0,0,0]);
scBr3.push([0,0,0,0,1,0]);
scBr3.push([0,0,0,1,0,0]);
scBr3.push([0,0,1,0,0,0]);
scBr3.push([0,1,0,0,0,0]);
scBr3.push([0,0,1,0,0,0]);
scBr3.push([0,0,0,1,0,0]);
scBr3.push([0,0,0,0,1,0]);
scBr3.push([0,0,0,0,0,0]);
scBr3 = LF.mirrorV(scBr3);
scBr3c = LF.mirrorH(scBr3);
scr[53] = scr["<"]= scBr3;
scr[54] = scr[">"]= scBr3c;

// questionmark
var scQuest=new Array();
scQuest.push([0,0,0,0,0,0,0]);
scQuest.push([0,0,1,1,1,0,0]);
scQuest.push([0,1,0,0,0,1,0]);
scQuest.push([0,0,0,0,1,0,0]);
scQuest.push([0,0,0,1,0,0,0]);
scQuest.push([0,0,0,1,0,0,0]);
scQuest.push([0,0,0,0,0,0,0]);
scQuest.push([0,0,0,1,0,0,0]);
scQuest.push([0,0,0,0,0,0,0]);
scQuest = LF.mirrorV(scQuest);
scr[55] = scr["?"]= scQuest;

// exlamationmark !
var scEx=new Array();
scEx.push([0,0,0,0,0,0]);
scEx.push([0,0,0,0,0,0]);
scEx.push([0,0,1,1,1,0]);
scEx.push([0,0,1,1,1,0]);
scEx.push([0,0,1,1,1,0]);
scEx.push([0,0,1,1,1,0]);
scEx.push([0,0,0,1,0,0]);
scEx.push([0,0,0,0,0,0]);
scEx.push([0,0,0,1,0,0]);
scEx.push([0,0,0,0,0,0]);
scEx = LF.mirrorV(scEx);
scr[56] = scr["!"]= scEx;

// OTHER SYMBOLS

var scWrong=new Array();
scWrong.push([1,1,1,1,1,1,1,1,1,1]);
scWrong.push([1,2,1,0,0,0,0,1,2,1]);
scWrong.push([1,1,2,1,0,0,1,2,1,1]);
scWrong.push([1,0,1,2,1,1,2,1,0,1]);
scWrong.push([1,0,0,1,2,2,1,0,0,1]);
scWrong.push([1,0,0,1,2,2,1,0,0,1]);
scWrong.push([1,0,1,2,1,1,2,1,0,1]);
scWrong.push([1,1,2,1,0,0,1,2,1,1]);
scWrong.push([1,2,1,0,0,0,0,1,2,1]);
scWrong.push([1,1,1,1,1,1,1,1,1,1]);
scr[57] = scr["Wrong"] = scr["WRONG"] = scr["wrong"] = scr["false"] = scr["False"]= scr["FALSE"] = scWrong;

var scSmiley = new Array();
scSmiley.push([0,0,0,1,1,1,1,0,0,0]);
scSmiley.push([0,0,1,0,0,0,0,1,0,0]);
scSmiley.push([0,1,0,0,0,0,0,0,1,0]);
scSmiley.push([1,0,0,1,0,0,1,0,0,1]);
scSmiley.push([1,0,0,0,0,0,0,0,0,1]);
scSmiley.push([1,0,0,0,0,0,0,0,0,1]);
scSmiley.push([1,0,0,1,0,0,1,0,0,1]);
scSmiley.push([0,1,0,0,1,1,0,0,1,0]);
scSmiley.push([0,0,1,0,0,0,0,1,0,0]);
scSmiley.push([0,0,0,1,1,1,1,0,0,0]);
scSmiley = LF.mirrorV(scSmiley);
scr[58] = scr["smiley"] = scr["Smiley"] = scr["SMILEY"] = scr[":)"] = scSmiley;

var scZwinker = new Array();
scZwinker.push([0,0,0,1,1,1,1,0,0,0]);
scZwinker.push([0,0,1,3,3,3,3,1,0,0]);
scZwinker.push([0,1,3,3,3,3,3,3,1,0]);
scZwinker.push([1,3,2,2,3,3,2,2,3,1]);
scZwinker.push([1,3,3,2,3,3,2,3,3,1]);
scZwinker.push([1,3,3,3,3,3,3,3,3,1]);
scZwinker.push([1,3,2,2,2,2,2,3,1]);
scZwinker.push([0,1,3,2,2,2,2,3,1,0]);
scZwinker.push([0,0,1,3,3,3,3,1,0,0]);
scZwinker.push([0,0,0,1,1,1,1,0,0,0]);
scZwinker = LF.mirrorV(scZwinker);
scr[59] = scr[";)"] = scr["fullsmiley"] = scr["FullSmiley"] = scr["FULLSMILEY"] = scZwinker;

var scEmptyHeart=new Array();
scEmptyHeart.push([0,0,1,0,0,0,1,0,0]);
scEmptyHeart.push([0,1,0,1,0,1,0,1,0]);
scEmptyHeart.push([1,0,0,0,1,0,0,0,1]);
scEmptyHeart.push([1,0,0,0,0,0,0,0,1]);
scEmptyHeart.push([1,0,0,0,0,0,0,0,1]);
scEmptyHeart.push([1,0,0,0,0,0,0,0,1]);
scEmptyHeart.push([0,1,0,0,0,0,0,1,0]);
scEmptyHeart.push([0,0,1,0,0,0,1,0,0]);
scEmptyHeart.push([0,0,0,1,0,1,0,0,0]);
scEmptyHeart.push([0,0,0,0,1,0,0,0,0]);
scEmptyHeart = LF.mirrorV(scEmptyHeart);
scr[60] = scr["EmptyHeart"] = scr["Emptyheart"] = scr["emptyheart"] = scr["LeerHerz"]= scr["Leerherz"] = scr["leerherz"] = scr["EMPTYHEART"] = scr["LEERHERZ"] = scEmptyHeart;

var scQuarterHeart=new Array();
scQuarterHeart.push([0,0,1,0,0,0,1,0,0]);
scQuarterHeart.push([0,1,0,1,0,1,0,1,0]);
scQuarterHeart.push([1,0,0,0,1,0,0,0,1]);
scQuarterHeart.push([1,0,0,0,0,0,0,0,1]);
scQuarterHeart.push([1,0,0,0,0,0,0,0,1]);
scQuarterHeart.push([1,2,2,2,2,0,0,0,1]);
scQuarterHeart.push([0,1,2,2,2,0,0,1,0]);
scQuarterHeart.push([0,0,1,2,2,0,1,0,0]);
scQuarterHeart.push([0,0,0,1,2,1,0,0,0]);
scQuarterHeart.push([0,0,0,0,1,0,0,0,0]);
scQuarterHeart = LF.mirrorV(scQuarterHeart);
scr[61] = scr["QuarterHeart"] = scr["quarterheart"] = scr["Quarterheart"] = scr["viertelherz"] = scr["ViertelHerz"] = scr["Viertelherz"] = scr["QUARTERHEART"] = scr["VIERTELHERZ"]= scQuarterHeart;

var scHalfHeart=new Array();
scHalfHeart.push([0,0,1,0,0,0,1,0,0]);
scHalfHeart.push([0,1,2,1,0,1,0,1,0]);
scHalfHeart.push([1,2,2,2,1,0,0,0,1]);
scHalfHeart.push([1,2,2,2,2,0,0,0,1]);
scHalfHeart.push([1,2,2,2,0,0,0,0,1]);
scHalfHeart.push([1,2,2,2,2,0,0,0,1]);
scHalfHeart.push([0,1,2,2,0,0,0,1,0]);
scHalfHeart.push([0,0,1,2,2,0,1,0,0]);
scHalfHeart.push([0,0,0,1,0,1,0,0,0]);
scHalfHeart.push([0,0,0,0,1,0,0,0,0]);
scHalfHeart = LF.mirrorV(scHalfHeart);
scr[62] = scr["HalfHeart"] = scr["halfheart"] = scr["Halfheart"] = scr["halbherz"] = scr["HalbHerz"] = scr["Halbherz"] = scr["HALFHEART"] = scr["HALBHERZ"]= scHalfHeart;

var scHeart=new Array();
scHeart.push([0,0,1,0,0,0,1,0,0]);
scHeart.push([0,1,2,1,0,1,2,1,0]);
scHeart.push([1,2,2,2,1,2,2,2,1]);
scHeart.push([1,2,2,2,2,2,2,2,1]);
scHeart.push([1,2,2,2,2,2,2,2,1]);
scHeart.push([1,2,2,2,2,2,2,2,1]);
scHeart.push([0,1,2,2,2,2,2,1,0]);
scHeart.push([0,0,1,2,2,2,1,0,0]);
scHeart.push([0,0,0,1,2,1,0,0,0]);
scHeart.push([0,0,0,0,1,0,0,0,0]);
scHeart = LF.mirrorV(scHeart);
scr[63] = scr["Heart"] = scr["heart"] = scr["fullheart"] = scr["herz"] = scr["Herz"] = scr["FullHeart"] = scr["Fullheart"] = scr["HEART"] = scr["FULLHEART"] = scr["HERZ"]= scHeart;

// ---- exposed functions.
var getMultiSym = function(index) 
{
	if(scr[index])
		return scr[index];
	return scr["WRONG"];
};
var getLength = function() {return scr.length;};
var getWidth = function(symbol) 
{
	var l = 0;
	if(symbol)
	{
		var arr=getMultiSym(symbol);
		if(arr)
		{
			for(var i=0;i<arr.length;i++)
			{
				if(arr[i].length > l)
					l = arr[i].length;
			}
		}
	}else{
		// default is 10, gives a space.
		l=10;
	}
	return l;
};

var getHeight = function() {return 10;};

module.exports.get = getMultiSym;
module.exports.height = getWidth;
module.exports.width = getWidth;
module.exports.length = getLength;
