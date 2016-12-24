/******************************************
* Snow Effect Script- By Altan d.o.o. (http://www.altan.hr/snow/index.html)
* Visit Dynamic Drive DHTML code library (http://www.dynamicdrive.com/) for full source code
* Last updated Nov 9th, 05' by DD. This notice must stay intact for use
******************************************/
var no = 15;
var hidesnowtime = 36000;
var snowdistance = "pageheight";
var ie4up = (document.all) ? 1 : 0;
var ns6up = (document.getElementById&&!document.all) ? 1 : 0;

function iecompattest(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

var dx, xp, yp;    // coordinate and position variables
var am, stx, sty;  // amplitude and step variables
var i, doc_width = 800, doc_height = 650;
var dont_display = false;

dx = new Array();
xp = new Array();
yp = new Array();
am = new Array();
stx = new Array();
sty = new Array();
for (i = 0; i < no; ++ i) {  
	dx[i] = 0;                        // set coordinate variables
	xp[i] = Math.random()*(doc_width-50);  // set position variables
	yp[i] = Math.random()*doc_height;
	am[i] = Math.random()*20;         // set amplitude variables
	stx[i] = 0.02 + Math.random()/10; // set step variables
	sty[i] = 0.7 + Math.random();     // set step variables
	if (ie4up||ns6up) {
	    document.write("<div id=\"dot"+ i +"\" style=\"position: absolute; z-index: "+ i +"; visibility: visible; top: 15px; left: 15px; width: 30px; height: 30px; background: url(img/flakes/flake"+((i%6)+1)+".png) center center no-repeat;\"><\/div>");
	}
}

if (ie4up||ns6up) {
	snowtimer = setInterval(function() {
		doc_width = ns6up?window.innerWidth-30 : iecompattest().clientWidth-30;
	    for (i = 0; i < no; ++ i) {  // iterate for every dot
	      	yp[i] += sty[i];
	      	if (yp[i] > doc_height-50) {
				if(dont_display == true) {
					document.getElementById("dot"+i).style.visibility="hidden"
				}
	      	  	xp[i] = Math.random()*(doc_width-am[i]-30);
	      	  	yp[i] = 0;
	      	  	stx[i] = 0.02 + Math.random()/10;
	      	  	sty[i] = 0.7 + Math.random();
	      	}
	      	dx[i] += stx[i];
	      	document.getElementById("dot"+i).style.top=yp[i]+"px";
	      	document.getElementById("dot"+i).style.left=xp[i] + am[i]*Math.sin(dx[i])+"px";  
	    }
	}, 30);
	
	if (hidesnowtime>0) {
		setTimeout(function() {
			dont_display = true;
			setTimeout(function() {
				if (window.snowtimer) clearInterval(snowtimer);
				for (i=0; i<no; i++) document.getElementById("dot"+i).style.visibility="hidden"
			}, 20000);
		}, hidesnowtime*1000);
	}
}


function fixTreeSize() {
	var offset = (window.innerWidth-650)/20;
	document.getElementById('illus').style.height = Math.max(650, 650+offset)+"px";
	document.getElementById('tree').style.bottom = Math.max(60, 60+offset)+"px";
	doc_height = Math.max(650, 650+offset);
}

window.onresize = fixTreeSize;