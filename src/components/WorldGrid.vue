<template>
  <div class="grid-container">
    <div
      v-for="gridItem in gridItems"
      :key="gridItem.id"
      class="grid-item"
      :class="{ 'grid-item--danger': checkZone(gridItem) }"
    >
      {{ gridItem.x }}, {{ gridItem.y }}
    </div>

    <Vessel
      v-for="vessel in filteredVessels"
      :key="vessel.id"
      v-bind="vessel"
      :danger-zones="dangerZones"
      :edge-of-the-world-coordinates="edgeOfTheWorldCoordinates"
      class="vessel"
      @lost="setDangerZone"
      @sendReport="collectReport"
    />
  </div>
</template>

<script>
import { kHeadingsMap, kSequenceStepDuration } from '@/constants/moves'
import Vessel from '@/components/Vessel'

export default {
  name: 'WorldGrid',

  components: {
    Vessel
  },

  data () {
    return {
      dangerZones: [],
      vessels: [],
      edgeOfTheWorldCoordinates: {
        x: 5,
        y: 3
      },
      removeVesselTimeout: null,
      reports: []
    }
  },

  computed: {
    filteredVessels () {
      return this.vessels.filter((vessel) => !vessel.lost)
    },

    gridItems () {
      return [
        { id: 1, x: 0, y: 3 },
        { id: 2, x: 1, y: 3 },
        { id: 3, x: 2, y: 3 },
        { id: 4, x: 3, y: 3 },
        { id: 5, x: 4, y: 3 },
        { id: 6, x: 5, y: 3 },
        { id: 7, x: 0, y: 2 },
        { id: 8, x: 1, y: 2 },
        { id: 9, x: 2, y: 2 },
        { id: 10, x: 3, y: 2 },
        { id: 11, x: 4, y: 2 },
        { id: 12, x: 5, y: 2 },
        { id: 13, x: 0, y: 1 },
        { id: 14, x: 1, y: 1 },
        { id: 15, x: 2, y: 1 },
        { id: 16, x: 3, y: 1 },
        { id: 17, x: 4, y: 1 },
        { id: 18, x: 5, y: 1 },
        { id: 19, x: 0, y: 0 },
        { id: 20, x: 1, y: 0 },
        { id: 21, x: 2, y: 0 },
        { id: 22, x: 3, y: 0 },
        { id: 23, x: 4, y: 0 },
        { id: 24, x: 5, y: 0 }
      ]
    }
  },

  created () {
    // Fetch data from the API
    const data = [
      '1 1 E\nRFRFRFRF',
      '3 2 N\nFRRFLLFFRRFLL',
      '0 3 W\nLLFFFLFLFL'
    ]

    this.vessels = this.parseInput(data)
  },

  beforeDestroy () {
    clearTimeout(this.removeVesselTimeout)
  },

  methods: {
    checkZone (gridItem) {
      return this.dangerZones.filter(zone => {
        return zone.coordinates.x === gridItem.x && zone.coordinates.y === gridItem.y
      }).length > 0
    },

    collectReport (report) {
      this.reports.push(report)
    },

    parseInput (data) {
      let sequenceStepsFromBeginning = 0

      return data.map((vesselInput, index) => {
        const [initialPositionInput, sequence] = vesselInput.split('\n')
        const [x, y, heading] = initialPositionInput.split(' ')

        const vessel = {
          id: `V${index + 1}`,
          initialPosition: { x: Number(x), y: Number(y), heading: kHeadingsMap.get(heading) },
          sequence: [...sequence],
          delay: (sequenceStepsFromBeginning + 1) * kSequenceStepDuration,
          lost: false
        }

        sequenceStepsFromBeginning += sequence.length

        return vessel
      })
    },

    removeVessel (vesselId) {
      this.removeVesselTimeout = setTimeout(() => {
        this.vessels.find((vessel) => vessel.id === vesselId).lost = true
      }, kSequenceStepDuration / 2)
    },

    setDangerZone ({ coordinates, heading, vesselId }) {
      this.dangerZones.push({ coordinates, heading })
      this.removeVessel(vesselId)
      this.collectReport({ coordinates, heading, vesselId, lost: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-container {
  position: relative;
  display: inline-grid;
  grid-template-columns: 100px 100px 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-gap: 1px;
  background-color: #0F5E9C;
  padding: 1px;

  .grid-item {
    font-size: 12px;
    background-color: #B5D3E7;
    text-align: left;
    padding: 3px;

    &--danger {
      background: repeating-linear-gradient(
        45deg,
        #FFCCCB,
        #FFCCCB 10px,
        #DE1738 10px,
        #DE1738 20px
      );
    }
  }
}
</style>
