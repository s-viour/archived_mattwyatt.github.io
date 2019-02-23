var stars = ["m 8.315476,239.54762 c 0,0 64.255951,-160.261907 64.255951,-157.238098 0,3.023812 40.065473,196.547628 39.309523,193.523808 C 111.125,272.80952 -7.5595238,108.76785 -7.5595238,108.76785 L 205.61905,142.78571 Z",
	         "m 35.52976,200.99404 c 0,-3.77976 37.797621,-157.238088 37.797621,-157.238088 L 127.75595,163.19643 -17.386905,85.333334 c 0,0 238.124995,-25.702382 243.416665,-25.702382 5.29166,0 -190.5,141.363088 -190.5,141.363088 z",
	         "M -17.386905,230.47619 73.327381,71.726189 85.422617,248.61904 -28.72619,114.81548 l 250.22024,17.3869 z"];

function generateLineDimensions() {
	var lines = [];
	for (var ln = 0; ln < Math.floor(Math.random() * 24) + 1; ln++) {
		var line = [];
		line.push(0);
		line.push(Math.floor(Math.random() * window.innerHeight) + 1);
		line.push(window.innerWidth);
		line.push(Math.floor(Math.random() * window.innerHeight) + 1);
		lines.push(line);
	}
	return lines;
}

function drawStars() {
	var toRemoveSVG = document.getElementById("starSVG")
	if (toRemoveSVG) {
		toRemoveSVG.parentNode.removeChild(toRemoveSVG)
	}

	var options = {
		fill: "black",
		strokeWidth: 3,
		roughness: 2
	}

	var starSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	starSVG.setAttribute("id", "starSVG")
	starSVG.setAttribute("width", window.innerWidth)
	starSVG.setAttribute("height", window.innerHeight)
	var roughStar = rough.svg(starSVG)

	for (var st = 0; st < Math.floor(Math.random() * 5) + 1; st++) {
		starPath = stars[Math.floor(Math.random() * stars.length - 1) + 1];
		var star = roughStar.path(starPath, options);
		var translateX = Math.floor(Math.random() * window.innerWidth)
		var translateY = Math.floor(Math.random() * window.innerHeight)
		star.setAttribute("transform", `translate(${translateX}, ${translateY})`)
		starSVG.appendChild(star)
		document.getElementById("aesthetics").appendChild(starSVG)
	}
}

function makeAesthetics() {
	var mainCanvas = document.getElementById("mainCanvas");

	mainCanvas.width = window.innerWidth;
	mainCanvas.height = window.innerHeight;

	const drawSurface = rough.canvas(document.getElementById("mainCanvas"));

	/*
	var lines = generateLineDimensions();
	lines.forEach((line) => {
		var options = {
			strokeWidth: 0.5
		};
		drawSurface.line(line[0],
					 line[1],
					 line[2],
					 line[3],
					 options);
	});
	*/
	drawStars();
}

function fullRoutine() {
	var el = document.getElementById("mainCanvas");

	el.width = window.innerWidth;
	el.height = window.innerHeight;

	makeAesthetics();
}

window.addEventListener("load", fullRoutine)
window.onresize = fullRoutine

