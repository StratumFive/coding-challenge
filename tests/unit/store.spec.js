import { createLocalVue } from "@vue/test-utils"
import Vuex from "vuex"
import shipStore from "@store/index"
import { executeOneInstruction } from "@services"

let localVue
let store
let state
let defaultShip
localVue = createLocalVue()
localVue.use(Vuex)

jest.mock("@services")

describe("testing GETTERS", () => {
	beforeEach(() => initialization())

	describe("testing getter: currentShip", () => {
		it("should return an default ship object, if it hasn't been set", () => expect(shipStore.getters.currentShip(state)).toEqual(defaultShip))

		it("should return the correct current ship, it it has been set", () => {
			const movedShip = {
				x: 10,
				y: 20,
				orientation: "W",
				status: "OK"
			}
			shipStore.mutations.SET_MOVED_SHIP(state, movedShip)
			expect(shipStore.getters.currentShip(state)).toEqual(movedShip)
		})
	})


	describe("testing MUTATIONS", () => {
		beforeEach(() => initialization())
	
		describe("testing SET_WORLD_LIMITS", () => {
			it("should NOT set the limits if limits are altogether undefined", () => {
				shipStore.mutations.SET_WORLD_LIMITS(state, undefined)
				expect(store.state.limitX).toBe(0)
				expect(store.state.limitY).toBe(0)
			})

			it("should NOT set the limits if the x limit is undefined", () => {
				shipStore.mutations.SET_WORLD_LIMITS(state, { limitY: 100 })
				expect(store.state.limitX).toBe(0)
				expect(store.state.limitY).toBe(0)
			})


			it("should NOT set the limits if the y limit is undefined", () => {
				shipStore.mutations.SET_WORLD_LIMITS(state, { limitY: 100 })
				expect(store.state.limitX).toBe(0)
				expect(store.state.limitY).toBe(0)
			})

			it("should NOT set the limits if the x limit is > 50", () => {
				shipStore.mutations.SET_WORLD_LIMITS(state, { limitX: 51, limitY: 2 })
				expect(store.state.limitX).toBe(0)
				expect(store.state.limitY).toBe(0)
			})

			it("should NOT set the limits if the y limit is > 50", () => {
				shipStore.mutations.SET_WORLD_LIMITS(state, { limitX: 1, limitYy: 52 })
				expect(store.state.limitX).toBe(0)
				expect(store.state.limitY).toBe(0)
			})

			it("should NOT set the limits if the x limit is not a number", () => {
				shipStore.mutations.SET_WORLD_LIMITS(state, { limitX: "B", limitY: 5 })
				expect(store.state.limitX).toBe(0)
				expect(store.state.limitY).toBe(0)
			})

			it("should NOT set the limits if the y limit is not a number", () => {
				shipStore.mutations.SET_WORLD_LIMITS(state, { limitX: 1, limitY: "A" })
				expect(store.state.limitX).toBe(0)
				expect(store.state.limitY).toBe(0)
			})

			it("should set the limits if both limits are within range", () => {
				const newLimits = { limitX: 1, limitY: 3 }
				shipStore.mutations.SET_WORLD_LIMITS(state, newLimits)
				expect(store.state.limitX).toBe(newLimits.limitX)
				expect(store.state.limitY).toBe(newLimits.limitY)
			})
		})

		describe("testing SET_WORLD", () => {
			it("should NOT set the world if the parameter is undefined", () => {
				shipStore.mutations.SET_WORLD(state, undefined)
				expect(store.state.world).toEqual([])
			})

			it("should overwrite the world with the paramter matrix", () => {
				const newWorld = Array.from({ length: 2 }, () => Array.from({ length: 3 }, () => 0))
				shipStore.mutations.SET_WORLD(state, newWorld)
				expect(store.state.world).toEqual(newWorld)
			})
		})

		describe("testing SET_WARNING", () => {
			let newWorld = Array.from({ length: 2 }, () => Array.from({ length: 3 }, () => 0))

			it("should NOT set the world if the coordinate parameter is undefined", () => {
				shipStore.mutations.SET_WORLD(state, newWorld)
				shipStore.mutations.SET_WARNING(state, undefined)
				expect(store.state.world).toEqual(newWorld)
			})

			it("should NOT set the world if the coordinate parameter has the x coordinate undefined", () => {
				shipStore.mutations.SET_WORLD(state, newWorld)
				shipStore.mutations.SET_WARNING(state, { y: 2 })
				expect(store.state.world).toEqual(newWorld)
			})

			it("should NOT set the world if the coordinate parameter has the y coordinate undefined", () => {
				shipStore.mutations.SET_WORLD(state, newWorld)
				shipStore.mutations.SET_WARNING(state, { x: 2})
				expect(store.state.world).toEqual(newWorld)
			})

			it("should NOT set the world if the coordinate parameter has the x coordinate > 50", () => {
				shipStore.mutations.SET_WORLD(state, newWorld)
				shipStore.mutations.SET_WARNING(state, { x: 51, y: 2})
				expect(store.state.world).toEqual(newWorld)
			})

			it("should NOT set the world if the coordinate parameter has the y coordinate >50", () => {
				shipStore.mutations.SET_WORLD(state, newWorld)
				shipStore.mutations.SET_WARNING(state, { x: 2, y: 52 })
				expect(store.state.world).toEqual(newWorld)
			})

			it("should mark the exact coordinate with a number 1, if it exists on the matrix", () => {
				shipStore.mutations.SET_WORLD(state, newWorld)
				shipStore.mutations.SET_WARNING(state, { x: 2, y: 1 })
				newWorld[2, 1] = 1
				expect(store.state.world).toEqual(newWorld)
			})
		})

		describe("testing RESET_WARNINGS", () => {
			it("should reset the warning set to empty", () => {
				shipStore.mutations.SET_WARNING(state, { 
					coordinates: { x: 1, y: 2 } , 
					orientation: "E" 
				})
				shipStore.mutations.RESET_WARNINGS(state)
				expect(store.state.warnings).toEqual([])
			})
		})
		
		describe("testing SET_MOVED_SHIP", () => {
			it("should NOT set the currentShip if the parameter is undefined", () => {
				shipStore.mutations.SET_MOVED_SHIP(state, undefined)
				expect(store.state.currentShip).toEqual(defaultShip)
			})

			it("should set the currentShip if the parameter is not undefined", () => {
				const newShip = {
					x: 10,
					y: 1,
					orientation: "W",
					status: "OK"
				}
				shipStore.mutations.SET_MOVED_SHIP(state, newShip)
				expect(store.state.currentShip).toEqual(newShip)
			})
		})

		describe("testing ACTIONS", () => {
		
			describe("testing createWorld", () => {
				beforeEach(() => initialization())

				it("should NOT create a new world or commit mutations, if the limits are undefined", async() => {
					const commit = jest.fn()
					try {
						await shipStore.actions.createWorld({ commit }, undefined)
					} catch(error) {}	
					expect(commit).toHaveBeenCalledTimes(0)
				})

				it("should NOT create a new world or commit mutations, if the X limit is undefined", async() => {
					const commit = jest.fn()
					try {
						await shipStore.actions.createWorld({ commit }, { limitY: 4 })
					} catch(error) {}	
					expect(commit).toHaveBeenCalledTimes(0)
				})

				it("should NOT create a new world or commit mutations, if the Y limit is undefined", async() => {
					const commit = jest.fn()
					try {
						await shipStore.actions.createWorld({ commit }, { limitX: 4 })
					} catch(error) {}	
					expect(commit).toHaveBeenCalledTimes(0)
				})

				it("should create a new world and commit 2 mutations with the right paramters", async() => {
					const commit = jest.fn()
					const limitX = 2
					const limitY = 3
					const world = Array.from({ length: limitY + 1 }, () => Array.from({ length: limitX + 1 }, () => 0))

					await shipStore.actions.createWorld({ commit }, { limitX, limitY })

					expect(commit).toHaveBeenCalledTimes(2)
					expect(commit).toHaveBeenNthCalledWith(1, "SET_WORLD", world)
					expect(commit).toHaveBeenNthCalledWith(2, "SET_WORLD_LIMITS", { limitX: limitX + 1, limitY: limitY + 1 })
				})
			})

			describe("testing moveShip", () => {
				const limitX = 2
				const limitY = 3
				const world = Array.from({ length: limitY }, () => Array.from({ length: limitX }, () => 0))

				const ship = {
					x: 1, 
					y: 2,
					orientation: "S",
					status: "OK"
				}
				beforeEach(() => {
					jest.clearAllMocks()
					executeOneInstruction.mockReset()
					initialization(world, limitX, limitY)
				})

				it("should NOT execute instructions or commit mutations, if the limits are not defined on the state yet", async() => {
					const commit = jest.fn()
					try {
						await shipStore.actions.moveShip({ commit }, undefined)
					} catch(error) {}	
					expect(commit).toHaveBeenCalledTimes(0)
				})

				it("should NOT execute instructions or commit mutations, if the ship and instructions are undefined", async() => {
					const commit = jest.fn()
					try {
						await shipStore.actions.moveShip({ commit }, undefined)
					} catch(error) {}	
					expect(commit).toHaveBeenCalledTimes(0)
				})

				it("should NOT execute instructions or commit mutations, if the instructions are undefined", async() => {
					const commit = jest.fn()
					try {
						await shipStore.actions.moveShip({ commit }, { ship, instructions: undefined })
					} catch(error) {}	
					expect(commit).toHaveBeenCalledTimes(0)
				})


				it("should NOT execute instructions or commit mutations, if the instructions are empty", async() => {
					const commit = jest.fn()
					try {
						await shipStore.actions.moveShip({ commit }, { ship, instructions: [] })
					} catch(error) {}	
					expect(commit).toHaveBeenCalledTimes(0)
				})

				it("should NOT execute instructions or commit mutations, if the ship is undefined", async() => {
					const commit = jest.fn()
					try {
						await shipStore.actions.moveShip({ commit }, { instructions: [] })
					} catch(error) {}
					expect(commit).toHaveBeenCalledTimes(0)
				})

				it("should execute as many instructions as specified on the array and commit once", async() => {
					const mockedMovedShip = {
						x: 1,
						y:3,
						orientation: "N",
						status: "OK"
					}
					executeOneInstruction.mockImplementation(() => Promise.resolve(mockedMovedShip))

					const commit = jest.fn()
					try {
						await shipStore.actions.moveShip({ state, commit }, { ship, instructions: ["L", "L"] })
					} catch(error) {}
					expect(commit).toHaveBeenCalledTimes(1)
					expect(executeOneInstruction).toHaveBeenCalledTimes(2)
				})
			})
		})
	})
})

function initialization(newWorld, limitX=0, limitY=0) {
	defaultShip = {
		x: -1,
		y: -1,
		orientation: "",
		status: "",
	}

	state = { 
		limitX,
		limitY,
		world: (newWorld)? newWorld : [],
		currentShip: { ...defaultShip },
		warnings: [],
		processedShips: [],
	}

	store = new Vuex.Store({
		state,
		getters   : shipStore.getters,
		actions   : shipStore.actions,
		mutations : shipStore.mutations
	})
}
