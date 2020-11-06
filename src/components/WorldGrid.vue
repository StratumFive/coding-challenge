<template>
  <div>
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
        :edge-of-the-world-coordinates="edgeOfTheWorldCoordinates"
        :danger-zones="dangerZones"
        class="vessel"
        @lost="setDangerZone"
        @sendReport="collectReport"
      />
    </div>

    <VesselReports
      :reports="reports"
      class="vessel-reports"
    />
  </div>
</template>

<script>
import { kHeadingsMap, kSequenceStepDuration } from '@/constants/moves'
import Vessel from '@/components/Vessel'
import VesselReports from '@/components/VesselReports'

export default {
  name: 'WorldGrid',

  components: {
    Vessel,
    VesselReports
  },

  data () {
    return {
      currentVesselIndex: -1,
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
      let id = 0
      const gridItemsArray = []

      for (let y = 3; y > -1; y--) {
        for (let x = 0; x < 6; x++) {
          gridItemsArray.push({ id: id++, x, y })
        }
      }

      return gridItemsArray
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

  mounted () {
    this.runNextVessel()
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
      this.reports.push({ ...report, output: this.createReportOutput(report) })
      this.runNextVessel()
    },

    createReportOutput (report) {
      const { coordinates: { x, y }, heading, lost } = report

      let reportOutput = `${x} ${y} ${kHeadingsMap.get(heading)}`

      if (lost) {
        reportOutput += ' LOST'
      }

      return reportOutput
    },

    parseInput (data) {
      return data.map((vesselInput, index) => {
        const [initialPositionInput, sequence] = vesselInput.split('\n')
        const [x, y, heading] = initialPositionInput.split(' ')

        return {
          id: `V${index + 1}`,
          initialPosition: { x: Number(x), y: Number(y), heading: kHeadingsMap.get(heading) },
          sequence: [...sequence],
          lost: false,
          running: false
        }
      })
    },

    removeVessel (vesselId) {
      this.removeVesselTimeout = setTimeout(() => {
        this.vessels.find((vessel) => vessel.id === vesselId).lost = true
      }, kSequenceStepDuration / 2)
    },

    runNextVessel () {
      if (this.currentVesselIndex < this.vessels.length - 1) {
        this.currentVesselIndex++
        this.vessels[this.currentVesselIndex].running = true
      }
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

.vessel-reports {
  margin: 16px auto 0;
}
</style>
