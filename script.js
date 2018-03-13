// var fs = require("fs");
// var inputData = '';
//
// // Create a readable stream
// var readerStream = fs.createReadStream('input.txt');
//
// // Set the encoding to utf8.
// readerStream.setEncoding('UTF8');
//
// // Handle stream events --> data, end, and error
// readerStream.on('data', function(chunk) {
// 	inputData += chunk;
// });
//
// readerStream.on('end', function(){
// 	console.log(inputData);
// });
//
// readerStream.on('error', function(err){
// 	console.log(err.stack);
// })

class Boat {

	constructor(x, y, o) {
		this.orientations = { N: 0, E: 90, S: 180, W: 270 };
		this.x = x;
		this.y = y;
		this.orientation = o;
		this.degrees = this.orientations[o];
		this.lost = '';

		this.setOrientation();
		this.setNextMove()

		console.log(this);
	}

	/**
   * Updates the boats rotate position,
   */
	rotate(direction) {
		switch (direction) {
			case 'L':
				this.degrees -= 90;
				break;
			case 'R':
				this.degrees += 90;
				break;
		}

		this.setOrientation();
		this.setNextMove()
	}

	/**
	 * Updates the boats x and y position,
	 */
	move() {
		this.x += this.nextMove[0];
		this.y += this.nextMove[1];
	}

	/**
	 * Calculates the next move data,
	 */
	setNextMove() {
		// Calculate next move vector by current orientation...
		switch (this.orientation) {
			case 'N':
				this.nextMove = [0,1];
				break;
			case 'E':
				this.nextMove = [1,0];
				break;
			case 'S':
				this.nextMove = [0,-1];
				break;
			case 'W':
				this.nextMove = [-1,0];
				break;

		}
	}

	/**
   * Sets the boats orientation,
   */
  setOrientation() {
    this.orientation = Object.keys(this.orientations).find(key => this.orientations[key] === this.degrees)
  }

	setLost() {
		this.lost = 'LOST';
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

	navigateShip(x, y, o, directions) {
		// Test vars
		this.bounds = [5, 3];
		const dirs = 'RFRFRFRF';
		const boat = new Boat(1, 1, 'E');

		// Run through the direction string.
		for( let dir of dirs ) {
			dir === 'F'
				? console.log('sdfs')
				: boat.rotate(dir);
		}
		console.log(boat);

		this.output = `${boat.x} ${boat.y} ${boat.orientation} ${boat.lost}`

		console.log(this.output);
	}
}

const shipNavigator = new ShipNavigator();
shipNavigator.navigateShip()
