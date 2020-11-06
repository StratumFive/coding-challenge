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
import { kMoveMap, kRotationMap } from '@/constants/moves'

export default {
  props: {
    id: {
      type: String,
      required: true
    },

    initialPosition: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      position: { x: this.initialPosition.x, y: this.initialPosition.y },
      heading: this.initialPosition.heading
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

  methods: {
    moveVessel () {
      const { xDiff, yDiff } = kMoveMap.get(this.heading)

      this.position.x += xDiff
      this.position.y += yDiff
    },

    rotateVessel (direction) {
      if (this.heading === 0 && direction === 'L') {
        this.heading += kRotationMap.get(direction) + 360
      } else if (this.heading === 270 && direction === 'R') {
        this.heading = 0
      } else {
        this.heading += kRotationMap.get(direction)
      }
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
