<template>
	<v-form
		ref="form"
		v-model="valid"
		lazy-validation
		class="ship-container"
	>
		<h2 class="mt-2"> Enter all instructions </h2>
		
		<v-textarea
			clearable
			clear-icon="mdi-close-circle"
			label="Add Instructions"
			v-model="inputInstructions"
			class="mt-2 text-left"
			rows="10"
			row-height="15"
		></v-textarea>

		<v-btn
			color="error"
			class="mr-2 mb-4"
			@click="reset"
        >
			<v-icon small>fa-refresh </v-icon>
		</v-btn>

		<v-btn
			color="warning"
			class="mr-4 mb-4"
			@click="readInput"
		>
			Run instructions
				<v-icon right>
					fas fa-ship sm
				</v-icon>
		</v-btn>
 
		<v-textarea
			prepend-inner-icon="mdi-comment"
			clear-icon="fa-list-alt"
			label="Results"
			v-model="results"
			class="mt-2"
			rows="5"
			row-height="20"
			disabled
			auto-grow
			filled
			shaped
		></v-textarea>
		
		<v-alert
			:value="showAlert"
			border="top"
			class="mt-3"
			colored-border
			:type="alertType"
			elevation="2"
			transition="scale-transition"
			dismissible
			@click="closeAlert"
			>	{{ alertMessage }}
		</v-alert>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { validateOrientation, validateSetOfInstructions } from "@services/shipUtils"

export default {
	name: "ShipInstructionsSet",
	
    data: () => ({
		valid: true,
		inputInstructions: "",
		processedInput: [],
		instructions: [],
		results: "",
		worldCreated: false,
		alertMessage: "",
		alertType: "success",
		showAlert: false,
    }),

	computed: {
		...mapGetters({
			currentShip: "currentShip",
			processedShips: "processedShips",
		}),
	},

    methods: {
		...mapActions({
			createWorld: "createWorld",
			moveShip: "moveShip",
			resetWorld: "resetWorld"
		}),

		/**
		 * * [ reset: This method resets the form inputs, plus all the Vuex state and emits an 
		 * 		event to clean the map grid from the screen. ]
		 */
		reset () {
			this.$refs.form.reset()
			this.resetWorld()
			this.$emit("resetWorld")
		},

		/**
		 * * [ buildWorld: This method triggers an action to create the new world and set its boundaries.
		 * 		Shows an alert error, if something went wrong. 
		 * 		The parameters were already controlled when the inputs were parsed. ]
		 */
		async buildWorld(limitX, limitY) {
			try {
				await this.createWorld({ 
					limitX: Number(limitX), 
					limitY: Number(limitY)
				})
				this.$emit("createdWorld")
				this.worldCreated = true 
			} catch(error) {
				this.alertMessage = error
				this.showAlert = true
				this.alertType = "error"
				this.worldCreated = false
			}
		},

		/**
		 * * [ executeShipInstruction: This method triggers an action to execute one ship instruction.
		 * 		Shows an alert error, if something went wrong. 
		 * 		The parameters were already controlled when the inputs were parsed. ]
		 */
		async executeShipInstruction(coordinateX, coordinateY, orientation, instructions) {
			const ship = {
				x: Number(coordinateX),
				y: Number(coordinateY),
				orientation,
				status: "OK",
			}

			try {
				await this.moveShip({ ship, instructions })
			} catch(error) {
				this.showMessage = true
				this.alertType = "error"
			}
		},

		/**
		 * * [ readInput: This method processes the instructions entered by the user on the screen.
		 * 		Shows an alert error, if there are no instructions or if something went wrong. 
		 * 		The inputs to be parsed are expected in the following structure:
		 * 		- X Y  (first line indicating 2 numbers under 50 to create the world) ]
		 * 		- one or many pairs of lines for the ships with the following structure
		 * 			- X Y O (X coordinate, Y coordinate, orientation)
		 * 			- a list of instructions which can be: L, R or F
		 * 
		 * 		If all the instructions were entered correctly, then they are passed on an array of instructions
		 * 		to be actually executed.
		 */
		readInput() {
			this.resetWorld()

			if (this.inputInstructions.length > 0){
				this.processedInput = []
				let lineCount = 1
				let readShipCoordinates = true
				let readShipInstructions = false
				let coordinateX, coordinateY, orientation, instructions
				let error = false
				// parsing the input lines
				let lines = this.inputInstructions.match(/^.*((\r\n|\n|\r)|$)/gm)
				for (let line of lines) {
					line = line.replace(/\n/g,"")
					if (line !== "" && line !== "\n") {
						// acting on the inputs
						if (lineCount === 1) {
							// the first line should to be the limits for the world
							let limits = line.split(" ")
							const limitX = limits[0]
							const limitY = limits[1]
							if (limitX && limitY && limitX <= 50 && limitY <= 50) 
								this.processedInput.push({ type: "WORLD", limitX, limitY })
							else error = true
						} else if (!error && readShipCoordinates) {
							// read ship coordinates only if there world was correctly created
							let inputLine = line.split(" ")
							coordinateX = inputLine[0]
							coordinateY = inputLine[1]
							orientation = inputLine[2]

							if (coordinateX && coordinateY && orientation && validateOrientation(orientation)) {
								// iterate to next step
								readShipInstructions = true
								readShipCoordinates = false
							} else error = true
						} else if (!error && readShipInstructions) {
							// read ship coordinates only if there world was correctly created
							instructions =  Array.from(line)
							if (instructions && validateSetOfInstructions(instructions)) {
								// execute instruction set
								this.processedInput.push({ type: "SHIP", coordinateX, coordinateY, orientation, instructions })

								// iterate to next step
								readShipInstructions = false
								readShipCoordinates = true
								coordinateX = ""
								coordinateY = ""
								orientation = ""
							} else error = true
						}	
					}
					lineCount += 1
				}
				if (!error) this.executeAllInstructions()
				else {
					this.alertMessage = "There was an error while parsing the instructions."
					this.alertType = "error"
					this.showAlert = true	
				}
			} else {
				this.alertMessage = "Please enter the instructions first."
				this.alertType = "error"
				this.showAlert = true
			}
		},

		/**
		 * * [ executeAllInstructions: This method executes all the instructions set on the "processedInput"
		 * 		array. Each of them triger an action and the results are set on another result array.createWorld
		 * 		Finally all the processed instruction results are shown.
		 */
		async executeAllInstructions() {
			this.processedInput.forEach(instruction => {
				switch (instruction.type) {
					case "WORLD":
						this.buildWorld(instruction.limitX, instruction.limitY)
						break
					case "SHIP":
						this.executeShipInstruction(instruction.coordinateX, instruction.coordinateY, instruction.orientation, instruction.instructions)
						break
				}
			})

			// show all the processed ship and their results
			this.results = ""
			this.processedShips.forEach(ship => {
				this.results += `* ${ship.x} ${ship.y} ${ship.orientation} ${ship.status} \n`
			})
			this.$emit("updateGrid")
		},

		closeAlert() {
			this.alertMessage = ""
			this.showAlert = false
			this.alertType = "success"
		}
    },
  }
</script>

<style lang="scss" scoped>
	.ship-container {
		max-width: 300px;
		margin-left: 1rem;
	}
</style>