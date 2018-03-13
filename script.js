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

const inputData = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`

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
	}

	/**
   * Updates the boats rotate position,
   */
	rotate(direction) {
		switch (direction) {
			case 'L':
				this.degrees -= 90;
				if( this.degrees < 0 ){
					this.degrees = 270;
				}
				break;
			case 'R':
				this.degrees += 90;
				if( this.degrees === 360 ){
					this.degrees = 0;
				}
				break;
		}

		this.setOrientation();
		this.setNextMove()
	}

	/**
	 * Updates the boats x and y position,
	 */
	move() {
		this.lastPosition = [ this.x, this.y ];

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

	constructor(data) {
		this.output = '',
		this.bounds = [];
		this.boats = [];
		this.lostCoords = [];

		this.extractData(data);
	}

	/**
   * Navigates all ships and logs the final output string
   */
	run() {
		this.boats.forEach( (boat) => {
      this.navigateShip(parseInt(boat[0]), parseInt(boat[1]), boat[2], boat[3])
    })

    console.log(this.output)
	}

	/**
   * Navigates a single ship given a start position and route
   * Updates the output string
   * @param {number} x, the start x position of the boat
   * @param {number} y, the start y position of the boat
   * @param {string} o, the start orientation of the boat
   * @param {string} directions, the directions
   */
	navigateShip(x, y, o, directions) {
		const boat = new Boat(x, y, o);
		// Run through the direction string.
		for( let dir of directions ) {
			dir === 'F'
				? boat.move()
				: boat.rotate(dir);

			if(!this.inBounds(boat.x, boat.y)) {
				boat.setLost();
				this.lostCoords.push([boat.x, boat.y]);

				// reset position to last know co-ordinates
				boat.x = boat.lastPosition[0];
				boat.y = boat.lastPosition[1];

				// Stop execution
				break
			}
		}

		this.output += `${boat.x} ${boat.y} ${boat.orientation} ${boat.lost}\n`
	}

	/**
   * Check that the boat is still in the bounds of the grid
   * @param {x} the x position of the boat
   * @param {y} the y position of the boat
   */
	inBounds(x,y) {
		return x >= 0 && x <= this.bounds[0] && y >= 0 && y <= this.bounds[1];
	}

	/**
   * Extract the data from a string
   * @param {string} dataAsString the input data
   * @return {array} the boat data
   */
	extractData(dataAsString) {
		let data = dataAsString.split(/\n/);
		// get the Bounds data and remove it from data array
		this.bounds = data[0].split(' ');
		data.splice(0, 1);
		// remove empty lines
		let newData = data.filter( (value) => {
			return value !== '';
		})
		// Chunk the ship data
		let boatData = this.chunkShips(newData);
		// Finally split start data into useful pieces
		this.boats = boatData.map( (boat) => {
			return [ ...boat[0].split(' '), boat[1] ];
		})
	}

	chunkShips(arr) {
		var newArray = [];
		while (arr.length > 0) {
			newArray.push(arr.splice(0, 2));
		}
		return newArray;
	}
}

const shipNavigator = new ShipNavigator(inputData);
shipNavigator.run()
