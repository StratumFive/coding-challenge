<template>
  <div id="mapGrid" ref="mapGrid" class="map-grid-container">
    <div
		v-for="r in rows"
		:key="r"
		class="rowCSS"
	>
		<div 
			v-for="c in columns"
			:key="c"
			class="cellCSS"
			:style="cellSize"
			:id="c"
		>
			<i
				v-if="cellHasShipInCoordinates(r, c )"
				class="fas fa-ship has-ship-icon" :class="iconSize">
			</i>
			<i
				v-else
				class="fas fa-ship" :class="iconSize">
			</i>
		</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "MapGrid",
	
	props: {
		rows: {
			type     : Number,
			required : true
		},

		columns: {
			type     : Number,
			required : true
		}
	},

	computed: {
		...mapGetters({
			hasShipInCoordinates: "hasShipInCoordinates",
			hasWarningInCoordinates: "hasWarningInCoordinates",
		}),

		calculateWidth() {
			return (this.$refs.mapGrid && this.$refs.mapGrid.clientWidth) ? 
				this.$refs.mapGrid.clientWidth / (this.columns + 2)
				: (950 / (this.columns + 2) )
		},

		cellSize() {
			let size = this.calculateWidth
			let margin = "10px"
			let padding = "30px"
			if (this.calculateWidth >= 220) size = this.calculateWidth - 30
			else if (this.calculateWidth >= 180) size = this.calculateWidth - 20
			else if (this.calculateWidth >= 130) size = this.calculateWidth - 10
			else if (this.calculateWidth >= 90) {
				size = this.calculateWidth - 8
				padding = "20px"
			} else if (this.calculateWidth >= 50) {
				size = this.calculateWidth - 4
				margin = "5px"
				padding = "15px"
			} else if (this.calculateWidth >= 30) {
				size = this.calculateWidth
				margin = "2px"
				padding = "10px"
			} else if (this.calculateWidth >= 10) {
				size = this.calculateWidth + 1
				margin = "2px"
				padding = "3px"
			} else {
				size = this.calculateWidth + 2
				margin = "2px"
				padding = "5px"
			}

			return {
				width: `${size}px`,
				height: `${size}px`,
				margin,
				padding
			}
		},

		iconSize() {
			if (this.calculateWidth >= 220) return "fa-7x"
			if (this.calculateWidth >= 150) return "fa-5x"
			if (this.calculateWidth >= 90) return "fa-3x"
			if (this.calculateWidth >= 70) return "fa-2x"
			if (this.calculateWidth >= 50) return "fa-lg"
			if (this.calculateWidth >= 30) return "fa-sm"
			return "fa-xs"
		}
	},

	methods: {
		cellHasShipInCoordinates(row, column) {
			const x = column - 1
			const y = this.rows - row
			return this.hasShipInCoordinates( { x, y })
		}
	}
}
</script>

<style lang="scss" >
	.map-grid-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		border-radius: 10px;
		margin-top: 0;
	}

	.rowCSS {
		display: flex !important;
	}

	.cellCSS {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		background-color: #0077BE !important;
		padding: 5px;
		margin: 2px;
		border-radius: 5px;
		color: lightgray;
	}

	.has-ship-icon {
		color: darkgoldenrod !important;
	}

	.has-warning-icon {
		color: lightsalmon;
	}
</style>