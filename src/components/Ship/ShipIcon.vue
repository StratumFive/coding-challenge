<template>
  <svg
    :x="`${(100 / (this.gridWidth + 1)) * this.x}%`"
    :y="`${(100 / (this.gridHeight + 1)) * this.y}%`"
  >
    <path :d="pathData" class="fill-current" fill-rule="evenodd" />
  </svg>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ShipIcon',
  props: {
    orientation: {
      required: true,
      type: String,
      validator(orientation) {
        return ['N', 'E', 'S', 'W'].includes(orientation)
      },
    },
    x: {
      required: true,
      type: Number,
      validator(x) {
        return x <= 50
      },
    },
    y: {
      required: true,
      type: Number,
      validator(y) {
        return y <= 50
      },
    },
  },
  computed: {
    pathData() {
      const pathStrings = {
        N:
          'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z',
        E:
          'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z',
        S:
          'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z',
        W:
          'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z',
      }
      return pathStrings[this.orientation]
    },
    ...mapState(['gridHeight', 'gridWidth']),
  },
}
</script>
