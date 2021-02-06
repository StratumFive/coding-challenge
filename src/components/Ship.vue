<template>
	<v-form
		ref="form"
		v-model="valid"
		lazy-validation
		class="ship-container"
	>
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
			label="Add Insrtuctions"
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
				<v-icon right>
					fas fa-ship sm
				</v-icon>
		</v-btn>
		
		<v-alert
			:value="showMessage"
			border="top"
			class="mt-3"
			colored-border
			:type="alertType"
			elevation="2"
			transition="scale-transition"
			dismissible
			>	{{ results }}
		</v-alert>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { orientation } from "@services/shipUtils"

export default {
	name: "Settings",
	
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
		showMessage: false,
		alertType: "success",
		results: "",
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
		},

		addInstruction(instruction) {
			this.instructions.push(instruction)
		},

		async executeInstructions() {
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
				await this.moveShip({ ship, instructions })
				this.results = `Coordinates: ${this.currentShip.x} ${this.currentShip.y}
							- Orientation: ${this.currentShip.orientation}
							Status: ${this.currentShip.status}`
				this.showMessage = true
				this.alertType = "success"

				// reset the form
				this.$refs.form.reset()
				this.$emit("newShip")
			} catch(error) {
				this.results = error
				this.showMessage = true
				this.alertType = "error"
				console.log("FULL ERR", error)
			}

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