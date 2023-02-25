function getPolygon(sides) {
	let polygon;

	switch (sides) {
		case 1: polygon = "henagon"; break;
		case 2: polygon = "digon"; break;
		case 3: polygon = "triangle"; break;
		case 4: polygon = "quadrilateral"; break;
		case 5: polygon = "pentagon"; break;
		case 6: polygon = "hexagon"; break;
		case 7: polygon = "heptagon"; break;
		case 8: polygon = "octagon"; break;
		case 9: polygon = "nonagon"; break;
		case 10: polygon = "decagon";
	}

	return polygon;
}

function parseSides(sides) {
	return Math.round(Math.abs(parseFloat(sides)));
}

let sides;

while (!sides) {
	sides = parseSides(prompt('Perry the Platypus asks "How many sides are in your polygon?"'));
}

alert(`Your polygon is a ${getPolygon(sides)}.`);
