<template>
	<v-card class="mt-0 pt-0">
		<div class="main-layout">
			<div class="components">
				<v-card-title class="pb-0">World Settings</v-card-title>
				<settings @createdWorld="loadGrid" @resetWorld="resetWorld" />
				
				<v-divider class="mt-4" />
				<v-card-title class="pt-5 pb-0">Add Ship</v-card-title>
				<ship @newShip="updateGrid" />

			</div>
			<div class="components">
				<map-grid
					:key="gridComponentKey"
					v-show="showMapGrid"
					:rows="limitY"
					:columns="limitX"
				/>
			</div>
		</div>
	</v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Settings from "@components/Settings"
import Ship from "@components/Ship"
import MapGrid from "@components/MapGrid"

export default {
	name: "Home",

	components: {
		Settings,
		Ship,
		MapGrid,
	},

    data: () => ({
		showMapGrid: false,
		limitX: 0,
		limitY: 0,
		gridComponentKey: 0
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

		loadGrid(limits) {
			if (limits) {
				this.limitX = parseInt(limits.limitX, 10)
				this.limitY = parseInt(limits.limitY, 10)
				this.gridComponentKey += 1
				this.showMapGrid = true
			}
		},

		resetWorld(){
			this.showMapGrid = false
			this.limitX = 0
			this.limitY = 0
		},

		updateGrid(){
			this.gridComponentKey += 1
		},
	}

};
</script>

<style lang="scss" >
	.main-layout {
		display: grid;
		grid-template-columns: 20% 80%;
	}

	.components {
		margin-bottom: 2rem;
	}
</style>