import Vue from "vue";
import Vuex from "vuex";
import { executeOneInstruction } from "@services"

Vue.use(Vuex);

const MAXIMUM_WORLD_LIMIT = 50

const state = { 
	limitX: 0,
	limitY: 0,
	world: [],
	currentShip: {
		x: -1,
		y: -1,
		orientation: "",
		status: "",
	},
	warnings: []
}

const getters = {
	currentShip: (state) => state.currentShip,
	hasShipInCoordinates : (state) => coordinates => (state.world.length > 0) && (state.world[coordinates.y][coordinates.x] === 2),
	hasWarningInCoordinates : (state) => coordinates => (state.world.length > 0) && (state.warnings.findIndex(w => (w.x === coordinates.x && w.y === coordinates.y) === -1)),
}

const mutations = {
	SET_WORLD_LIMITS(state, limits) {
		if (limits !== undefined && !isNaN(limits.limitX) && !isNaN(limits.limitY) && limits.limitX <= MAXIMUM_WORLD_LIMIT && limits.limitY <= MAXIMUM_WORLD_LIMIT) {
			state.limitX = limits.limitX
			state.limitY = limits.limitY
		}
	},

	SET_WORLD(state, world) {
		state.world = world ? world : []
	},

	SET_WARNING(state, coordinates) {
		if (coordinates !== undefined && coordinates.x !== undefined && coordinates.y !== undefined 
			&& coordinates.x < MAXIMUM_WORLD_LIMIT && coordinates.y < MAXIMUM_WORLD_LIMIT) {
				// state.world[coordinates.y][	coordinates.x] = 1
				const alreadyWarned = state.warnings.findIndex(warning => (warning.x === coordinates.x && warning.y === coordinates.y) !== -1)
				if (!alreadyWarned) state.warnings.push({ x: coordinates.x, y: coordinates.y })
			}
	},

	SET_MOVED_SHIP(state, ship) {
		if (ship !== undefined) {
			state.currentShip = { ...ship }
		}
	},

	SET_SHIP_MAP(state, coordinates) {
		if (coordinates !== undefined && coordinates.x !== undefined && coordinates.y !== undefined 
			&& coordinates.x < MAXIMUM_WORLD_LIMIT && coordinates.y < MAXIMUM_WORLD_LIMIT) {
				state.world[coordinates.x][	coordinates.y] = 2
			}
	},
}

const actions = {
	/**
	 * * [ createWorld: Given the limit for horizontal (X) coordinates and for vertical (Y) coordinates,
	 * 		this action creates a new matrix with X and Y dimensions and commits it.
	 * 		It also commits the limitX and limitY on the state. ]
	 * @param {[Number]} limitX	[ represents maximum x coordinate for any ship ]
	 * @param {[Number]} limitY	[ represents maximum y coordinate for any ship ]
	 */
	createWorld({ commit }, limits) {
		if (limits === undefined || limits.limitX === undefined || limits.limitY === undefined
			|| limits.limitX <= 0 || limits.limitY <= 0) {
			throw new Error("The world can not be created without the proper limits. Please define the limits within range.")
		} 
		const { limitX, limitY } = limits

		var world = Array.from({ length: limitY }, () => Array.from({ length: limitX }, () => 0))
		commit("SET_WORLD", world)
		commit("SET_WORLD_LIMITS", { limitX, limitY })
	},

	/**
	 * * [ moveShip: Given a ship and an array of instructions, this action executes all of those
	 * 		instructions one by one. After every instruction, if the ship falls over (is marked as LOST),
	 * 		the action checks whether the ships coordinates were marked as OFF previously. If they were,
	 * 		the ship may continue with the next instruction. Otherwise, the ship is lost and the spot 
	 * 		is marked as a warning for another ship.  ]
	 * @param {[Object]} ship			[ represents the ship information ]
	 * @param {[Array]} instructions	[ represents an array of letters: N, E, S, W ]
	 */
	moveShip({ state, commit }, payload) {
		const { ship, instructions } = payload

		if (state.limitX === 0 || state.limitY === 0) {
			throw new Error("No instructions can be executed until the world is created.")
		} 

		if (payload === undefined) {
			throw new Error("A ship and instructions are required to move the ship. Plese enter some.")
		} 

		if (instructions === undefined || instructions.length === 0) {
			throw new Error("Instructions are required to move the ship. Plese enter some.")
		} 

		let movedShip = { 
			...ship,
			status: "OK"
		}

		instructions.forEach(instruction => {
			if (movedShip.status !== "LOST") {
				movedShip = executeOneInstruction(movedShip, instruction)

				if (movedShip.status === "LOST") {
					if (state.world[movedShip.y, movedShip.x] === 1){
						// if the coordinates was already marked with a warning, the ship can ignore the instruction
						movedShip.status = "OK"
					} else {
						// mark the "off limit" coordinate
						commit("SET_WARNING", { x: movedShip.x, y: movedShip.y })
					}
				}
			}
		})
		if (movedShip.status === "OK") commit("SET_SHIP_MAP", { x: movedShip.x, y: movedShip.y })
		commit("SET_MOVED_SHIP", movedShip)
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}
