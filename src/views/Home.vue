<template>
	<v-card class="mt-0 pt-0">
		<div name="mainHomeComponent" class="main-home-component">
			<div name="worldSettingsComponentContainer" class="components">
				<v-card-title class="pb-0">World Settings</v-card-title>
				<settings @createdWorld="loadGrid" @resetWorld="resetWorld" />
				
				<v-divider class="mt-4" />
				<v-card-title class="pt-5 pb-0">Add Ship</v-card-title>
				<ship @newShip="updateGrid" />
			</div>
			<div name="mapGridComponentContainer" class="components">
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

		/**
		 * * [ loadGrid: This method is triggered from the child component Settings once the user has 
		 * 		successfully created a new world. With the limits already set by the user, this method enforces a new load of 
		 * 		the MapGrid component with the new world just created. ]
		 * @param {[Object]} limits	[ represents maximum x and y coordinate for any ship (to create  new world) ]
		 */
		loadGrid(limits) {
			if (limits && limits.limitX > 0 && limits.limitY > 0) {
				this.limitX = parseInt(limits.limitX, 10)
				this.limitY = parseInt(limits.limitY, 10)
				this.gridComponentKey += 1
				this.showMapGrid = true
			}
		},

		/**
		 * * [ resetWorld: This method is triggered from the child component Settings once the user has 
		 * 		successfully reset the active world. This method enforces to hide the map component. ]
		 */
		resetWorld(){
			this.showMapGrid = false
			this.limitX = 0
			this.limitY = 0
		},

		/**
		 * * [ updateGrid: This method is triggered from the child Ship component once the user has 
		 * 		successfully added a new ship instruction. This method enforces to hide the map component
		 * 		to show the new ship on it. ]
		 */
		updateGrid(){
			this.gridComponentKey += 1
		},
	}

};
</script>

<style lang="scss" >
	.main-home-component {
		display: grid;
		grid-template-columns: 20% 80%;
	}

	.components {
		margin-bottom: 2rem;
	}
</style>