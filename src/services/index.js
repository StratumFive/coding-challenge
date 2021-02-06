import { orientation, instruction } from "./shipUtils";

const limitX = 5
const limitY = 3

/**
 * * [ executeOneInstruction: Given a ship and one instruction, this function executes it. It can:
 * 		- move the ship Forward on the current orientation
 * 		- change direction 90 degrees to the Right
 * 		- change direction 90 degrees to the Left
 * 
 * 		It returns the ship with either the new coordinates or new direction. Otherwise, it sets the
 * 		ships status to "LOST" ]
 * @param {[Object]} ship 			[ represents the original ship ]
 * @param {[String]} newInstruction [ represents the instruction to execute on the ship ]
 * @return {[Object]} 				[ returns a moved ship (to the left, right or with a new orientation). It can
 * 									also set the new status. ]
 */
export function executeOneInstruction(ship, newInstruction) {
	let movedShip = { ...ship }
	let direction
	let error = false

	if ( ship.x === undefined || ship.y === undefined || ship.orientation === undefined || newInstruction === undefined) {
		movedShip.status = "LOST"
	} else {
		switch (newInstruction) {
			case instruction.LEFT:
				movedShip.orientation = left(ship.orientation)
				break
			case instruction.RIGHT:
				movedShip.orientation = right(ship.orientation)
				break
			case instruction.FORWARD:
				direction = forward(ship.x, ship.y, ship.orientation, limitX, limitY)
				movedShip.x = direction.x
				movedShip.y = direction.y
				error = direction.error
				break
		}

		if (error) movedShip.status = "LOST"
	}
	return movedShip 
}

/**
 * * [ left: Given a ship current orientation returns the next orientation moving left. ]
 * @param {[String]} currentOrientation [ represents the current orientation of a ship]
 * @return {[String]} 					[ returns a string indicating the next orientation moving left. 
 * 										The returned value will be the next valid orientation if the 
 * 										currentOrientation was valid or the currentOrientation value if not. ]
 */
function left(currentOrientation) {
	switch (currentOrientation) {
		case orientation.NORTH:
			return orientation.WEST
		case orientation.WEST:
			return orientation.SOUTH
		case orientation.SOUTH:
			return orientation.EAST
		case orientation.EAST:
			return orientation.NORTH
		default:
			return currentOrientation
	}
}

/**
 * * [ right: Given a ship current orientation returns the next orientation moving right. ]
 * @param {[String]} currentOrientation [ represents the current orientation of a ship]
 * @return {[String]} 					[ returns a string indicating the next orientation moving right. 
 * 										The returned value will be the next valid orientation if the 
 * 										currentOrientation was valid or the currentOrientation value if not. ]
 */
function right(currentOrientation) {
	switch (currentOrientation) {
		case orientation.NORTH:
			return orientation.EAST
		case orientation.EAST:
			return orientation.SOUTH
		case orientation.SOUTH:
			return orientation.WEST
		case orientation.WEST:
			return orientation.NORTH
		default:
			return currentOrientation
	}
}

/**
 * * [ forward: Given a ship current coordinates and orientation returns the next coordinates moving forward. ]
 * @param {[Number]} x 					[ represents the current horizontal coordinate of a ship ]
 * @param {[Number]} y 					[ represents the current vertical coordinate of a ship ]
 * @param {[String]} currentOrientation [ represents the current orientation of a ship]
 * @return {[Object]}  					[ returns an object containing the next coordinates a ship based
 * 										on the current coordinates and the orientation. If the coordinates 
 * 										get out of bound, returns -1. ]
 */
function forward (x, y, currentOrientation, limitX, limitY) {
	if (isNaN(x) || isNaN(y)) return currentOrientation
	
	let direction = {
		x,
		y,
		error: false
	}

	switch (currentOrientation) {
		case orientation.NORTH:
			direction.error = (Number(y) + 1 > limitY)
			direction.y = direction.error ? Number(y) : Number(y) + 1
			break
		case orientation.EAST:
			direction.error = (Number(x) + 1 > limitX)
			direction.x = direction.error ? Number(x) : Number(x) + 1
			break
		case orientation.SOUTH:
			direction.error = (Number(y) - 1 < 0)
			direction.y = direction.error ? Number(y) : Number(y) - 1
			break
		case orientation.WEST:
			direction.error = (Number(x) - 1 < 0)
			direction.x = direction.error ? Number(x) : Number(x) - 1
			break
	}

	return direction
}