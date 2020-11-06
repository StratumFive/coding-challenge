<template>
  <div
    v-if="!lost"
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
import { kMoveMap, kRotationMap, kSequenceStepDuration } from '@/constants/moves'

export default {
  props: {
    delay: {
      type: Number,
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

    sequence: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      position: { x: this.initialPosition.x, y: this.initialPosition.y },
      heading: this.initialPosition.heading,
      sequenceInterval: null,
      sequenceDelayTimeout: null
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
    }
  },

  mounted () {
    this.sequenceDelayTimeout = setTimeout(() => {
      this.runSequence()
    }, this.delay)
  },

  beforeDestroy () {
    this.clearInterval()
    this.clearTimeout(this.sequenceDelayTimeout)
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
      if (sequenceStep === 'F') {
        this.moveVessel()
      } else {
        this.rotateVessel(sequenceStep)
      }
    },

    moveVessel () {
      const { xDiff, yDiff } = kMoveMap.get(this.heading)
      const initialPosition = { ...this.position }

      this.position.x += xDiff
      this.position.y += yDiff

      this.checkIfLost(initialPosition)
    },

    rotateVessel (direction) {
      if (this.heading === 0 && direction === 'L') {
        this.heading += kRotationMap.get(direction) + 360
      } else if (this.heading === 270 && direction === 'R') {
        this.heading = 0
      } else {
        this.heading += kRotationMap.get(direction)
      }
    },

    runSequence () {
      const sequence = this.sequence
      let sequenceStepIndex = -1

      this.sequenceInterval = setInterval(() => {
        ++sequenceStepIndex

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
