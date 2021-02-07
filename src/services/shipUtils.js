const orientationValues = {
	NORTH : "N",
	SOUTH : "S",
	EAST  : "E",
	WEST  : "W"
}
const orientation = Object.freeze(orientationValues)

function validateOrientation(orientation) {
	return Object.values(orientationValues).includes(orientation)
}

const instructionValues = {
	LEFT    : "L",
	RIGHT   : "R",
	FORWARD : "F"
}
const instruction = Object.freeze(instructionValues)

function validateSetOfInstructions(instructions) {
	for (let iter of instructions) {
		if (!Object.values(instructionValues).includes(iter)) return false
	}
	return true
}

export {
	orientation,
	instruction,
	validateOrientation,
	validateSetOfInstructions,
}
