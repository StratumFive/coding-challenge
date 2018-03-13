var fs = require("fs");
var inputData = '';

// Create a readable stream
var readerStream = fs.createReadStream('input.txt');

// Set the encoding to utf8.
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
	inputData += chunk;
});

readerStream.on('end', function(){
	console.log(inputData);
});

readerStream.on('error', function(err){
	console.log(err.stack);
})

class Boat {

	constructor(x, y, o) {
		this.orientations = { N: 0, E: 90, S: 180, W: 270 };
		this.x = x;
		this.y = y;
		this.orientation = o;
		this.degrees = this.orientations[o];
		this.lost = '';
	}

	rotate(direction) {
		// Rotate function
	}

	move() {
		// Move function
	}

	setOrientation() {
		// Set initial orientation
	}
}

class ShipNavigator {

	constructor() {
		this.output = '',
		this.bounds = [];
		this.boats = [];
	}

	extractData() {
		// extract the data from the input
		// transform into useful format
	}

	run() {
		// run all ships function
		// loop through boat data
	}

	navigateShip() {
		// run a single ship
	}
}
