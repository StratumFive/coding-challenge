<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
	<div class="ship-input-container">
		<div class="ship-preferences title">
			<label>Limits: </label>
		</div>
		<div class="ship-preferences">
			<label>Limit X: </label>
			<input v-model="limitX" placeholder="limitX">
			<label>Limit Y: </label>
			<input v-model="limitY" placeholder="limitY">
			<button class="basic-button" @click="setWorldLimits">Create World</button>
		</div>
		<div class="ship-preferences title">
			<label>Ship: </label>
		</div>
		<div class="ship-preferences">
			<label>Coord X: </label>
			<input v-model="initialX" placeholder="Horizontal coordinate">
			<label>Coord Y: </label>
			<input v-model="initialY" placeholder="Vertical coordinate">
		</div>
		<div class="ship-preferences">
			<label>Orientation: </label>
			<input v-model="orientation" placeholder="Orientation">
		</div>
		<div class="ship-preferences">
			<label>Instructions: </label>
			<input v-model="instructions" placeholder="instructions">
			<button class="basic-button" @click="executeInstructions()">MoveShip</button>
		</div>
		<div class="results">
			<div class="ship-preferences title">
				<label>Results: </label>
			</div>
			<div class="ship-preferences">
				<label> {{ results }} </label>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
	name: "Home",

	data: () => ({
		limitX: 5,
		limitY: 3,
		initialX: 1,
		initialY: 1,
		orientation: "E",
		instructions: "RFRFRFRF",
		movedShip: {},
		results: ""
	}),

	computed: {
		...mapGetters({
			currentShip: "currentShip",
		}),
	},

	methods: {
		...mapActions({
			createWorld: "createWorld",
			moveShip: "moveShip",
		}),

		setWorldLimits() {
			try {
				this.createWorld({ 
					limitX: Number(this.limitX), 
					limitY: Number(this.limitY)
				})
				this.results = "The world has been created!|"
			} catch(error) {
				this.results = error
			}
		},

		executeInstructions() {
			const ship = {
				x: Number(this.initialX),
				y: Number(this.initialY),
				orientation: this.orientation,
				status: "OK"
			}
			const instructions = Array.from(this.instructions)

			try {
				this.moveShip({ ship, instructions })
				this.results = `Coordinates: ${this.currentShip.x} ${this.currentShip.y}
							- Orientation: ${this.currentShip.orientation}
							Status: ${this.currentShip.status}`
			} catch(error) {
				this.results = error
			}

		}
	}

};
</script>

<style lang="scss" scoped>
	.ship-input-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		.ship-preferences {
			display: flex;
			flex-direction: row;
			margin: 0.5rem 2rem;
			padding: 0 1rem;

			> label {
				margin: 0 1rem;
			}
		}

		.title {
			font-weight: bold;
		}

		.basic-button {
			font-weight: bold;
			margin: 0 1rem;
		}

		.results {
			display: flex;
			flex-direction: column;
			margin: 2rem 4rem;
			box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
			border-radius: 10px;
		}
	}
</style>
