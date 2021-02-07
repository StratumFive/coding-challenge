<template>
	<v-form
		ref="form"
		v-model="valid"
		lazy-validation
		class="ship-container"
	>
		<h2 class="mt-2"> New Ship instruction </h2>
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
		<v-row>
			<v-col
				cols="12"
				md="6"
			>
				<v-text-field
					v-model="coordinateX"
					:counter="2"
					:rules="coordinatesRules"
					label="X Coordinate"
				></v-text-field>
			</v-col>
			<v-col
				cols="12"
				md="6"
			>
				<v-text-field
					v-model="coordinateY"
					:counter="2"
					:rules="coordinatesRules"
					label="Y Coordinate"
				></v-text-field>
			</v-col>
		</v-row>
		
		<v-select
			v-model="currentOrientation"
			:items="orientations"
			label="Orientation"
			item-text="label"
			item-value="value"
        ></v-select>
		
		<v-btn
			color="submit"
			class="mr-4"
			@click="addInstruction('L')"
		>L</v-btn>
		<v-btn
			color="submit"
			class="mr-4"
			@click="addInstruction('R')"
		>R</v-btn>
		<v-btn
			color="submit"
			class="mr-4"
			@click="addInstruction('F')"
		>F</v-btn>

		<v-textarea
			clearable
			clear-icon="mdi-close-circle"
			label="Add Instructions"
			v-model="instructions"
			class="mt-2"
			rows="2"
			row-height="20"
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
			@click="executeInstructions"
		>
			Add Ship
			<v-icon right>fas fa-ship sm</v-icon>
		</v-btn>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { orientation } from "@services/shipUtils"

export default {
	name: "Ship",
	
    data: () => ({
		valid: true,
		coordinateX: 1,
		coordinateY: 1,
		currentOrientation: "",
		instructions: [],
		coordinatesRules: [
			v => !!v || "Required",
			v => (v && v < 50) || "The maximum value is 50"
		],
		showAlert: false,
		alertType: "success",
		alertMessage: "",
    }),

	computed: {
		...mapGetters({
			currentShip: "currentShip",
		}),

		orientations() {
			return Object.entries(orientation).map(iter => ({
				label: iter[0],
				value: iter[1]
			}))
		}
	},

    methods: {
		...mapActions({
			moveShip: "moveShip",
		}),

		reset () {
			this.$refs.form.reset()
			this.closeAlert()
		},

		addInstruction(instruction) {
			this.instructions.push(instruction)
		},

		async executeInstructions() {
			if (this.coordinateX && this.coordinateY && orientation && this.instructions) {
				const ship = {
					x: Number(this.coordinateX),
					y: Number(this.coordinateY),
					orientation: this.currentOrientation,
					status: "OK"
				}
				let instructions
				if (Array.isArray(this.instructions)) instructions = this.instructions
				else instructions = Array.from(this.instructions)
				try {
					this.showAlert = false
					await this.moveShip({ ship, instructions })
					this.$emit("newShip")

					// show alertMessage
					this.alertMessage = `RESULT: ${this.currentShip.x} ${this.currentShip.y} ${this.currentShip.orientation}
						Status: ${this.currentShip.status}`

					this.alertType = (this.currentShip.status ==="OK") ? "success" : "error"
					this.showAlert = true

				} catch(error) {
					this.alertMessage = error
					this.showAlert = true
					this.alertType = "error"
				}
			} else {
				this.alertMessage = "Coordinates, orientation and instructions are required to move the ship."
				this.showAlert = true
				this.alertType = "error"
			}
			
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
		max-width: 250px;
		margin-left: 1rem;
	}
</style>