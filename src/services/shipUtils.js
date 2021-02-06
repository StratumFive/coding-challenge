const orientationValues = {
	NORTH : "N",
	SOUTH : "S",
	EAST  : "E",
	WEST  : "W"
}
const orientation = Object.freeze(orientationValues)

const instructionValues = {
	LEFT    : "L",
	RIGHT   : "R",
	FORWARD : "F"
}
const instruction = Object.freeze(instructionValues)

export {
	orientation,
	instruction
}
