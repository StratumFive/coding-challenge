<template>
  <div
    class="vessel"
    :style="computedStyle"
  >
    <p :style="{ transform: `rotate(${-this.heading}deg)` }">
      {{ id }}
    </p>
  </div>
</template>

<script>
import { kGridSize, kZeroPosition } from '@/constants/grid'
import {
  kAvailableMoves,
  kMoveMap,
  kRotationMap,
  kSequenceStepDuration
} from '@/constants/moves'

export default {
  props: {
    dangerZones: {
      type: Array,
      required: true
    },

    edgeOfTheWorldCoordinates: {
      type: Object,
      required: true
    },

    id: {
      type: String,
      required: true
    },

    initialPosition: {
      type: Object,
      required: true
    },

    lost: {
      type: Boolean,
      required: true
    },

    running: {
      type: Boolean,
      required: true
    },

    sequence: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      position: { x: this.initialPosition.x, y: this.initialPosition.y },
      heading: this.initialPosition.heading,
      sequenceInterval: null
    }
  },

  computed: {
    computedStyle () {
      const { x, y } = this.position

      return {
        top: `${kZeroPosition.y - kGridSize * y}px`,
        left: `${kZeroPosition.x + kGridSize * x}px`,
        transform: `rotate(${this.heading}deg)`
      }
    },

    forbiddenHeading () {
      const { x, y } = this.position

      return this.dangerZones.find(zone => {
        return zone.coordinates.x === x && zone.coordinates.y === y
      })?.heading
    }
  },

  watch: {
    running (value) {
      if (value) {
        this.runSequence()
      }
    }
  },

  beforeDestroy () {
    this.clearInterval()
  },

  methods: {
    checkIfLost (initialPosition) {
      const { x, y } = this.position
      const { x: edgeX, y: edgeY } = this.edgeOfTheWorldCoordinates

      if (
        x < 0 ||
        y < 0 ||
        x > edgeX ||
        y > edgeY
      ) {
        this.$emit('lost', {
          coordinates: initialPosition,
          heading: this.heading,
          vesselId: this.id
        })
      }
    },

    clearInterval () {
      clearInterval(this.sequenceInterval)
      this.sequenceInterval = null
    },

    consumeSequenceStep (sequenceStep) {
      if (sequenceStep === kAvailableMoves.get('goAhead')) {
        this.moveVessel()
      } else {
        this.rotateVessel(sequenceStep)
      }
    },

    moveVessel () {
      if (this.heading === this.forbiddenHeading) {
        return
      }

      const { xDiff, yDiff } = kMoveMap.get(this.heading)
      const initialPosition = { ...this.position }

      this.position.x += xDiff
      this.position.y += yDiff

      this.checkIfLost(initialPosition)
    },

    rotateVessel (direction) {
      if (this.heading === 0 && direction === kAvailableMoves.get('turnLeft')) {
        // Prevent negative heading value in case of 270 deg
        this.heading += kRotationMap.get(direction) + 360
      } else if (this.heading === 270 && direction === kAvailableMoves.get('turnRight')) {
        // Prevent 360 deg which is equal to 0 deg
        this.heading = 0
      } else {
        this.heading += kRotationMap.get(direction)
      }
    },

    runSequence () {
      const sequence = this.sequence
      let sequenceStepIndex = -1

      this.sequenceInterval = setInterval(() => {
        sequenceStepIndex++

        // Prevent sending second report when the vessel is lost already.
        // The report is send on lost event.
        // Send report on sequence finished only if the vessel is still on the grid.
        if (sequenceStepIndex >= sequence.length && !this.lost) {
          this.$emit('sendReport', {
            vesselId: this.id,
            coordinates: this.position,
            heading: this.heading
          })
        }

        if (this.lost || sequenceStepIndex >= sequence.length) {
          this.clearInterval()
        } else {
          this.consumeSequenceStep(sequence[sequenceStepIndex])
        }
      }, kSequenceStepDuration)
    }
  }
}
</script>

<style lang="scss" scoped>
.vessel {
  position: absolute;
  width: 30px;
  height: 50px;
  background: #A9A9A9;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 500ms;
}

.vessel:before {
  content: "";
  position: absolute;
  right: 0;
  top: -10px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid #A9A9A9;
}
</style>
