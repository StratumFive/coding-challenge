<template>
  <div
    class="vessel"
    :style="computedStyle"
  ></div>
</template>

<script>
import { kGridSize, kZeroPosition } from '@/constants/grid'

export default {
  props: {
    heading: {
      type: String,
      required: true
    },

    position: {
      type: Object,
      required: true
    }
  },

  computed: {
    computedStyle () {
      const { x, y } = this.position

      return {
        top: `${kZeroPosition.y - kGridSize * y}px`,
        left: `${kZeroPosition.x + kGridSize * x}px`,
        transform: 'rotate(0deg)'
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
