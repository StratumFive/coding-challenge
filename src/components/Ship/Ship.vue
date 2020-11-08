<template>
  <div>{{ `${id}: ${x} ${y} ${orientation}` }}</div>
</template>

<script>
export default {
  name: 'Ship',
  props: {
    id: {
      required: true,
      type: Number,
    },
    initialOrientation: {
      required: true,
      type: String,
      validator(orientation) {
        return ['N', 'E', 'S', 'W'].includes(orientation)
      },
    },
    initialX: {
      required: true,
      type: Number,
      validator(x) {
        return x <= 50
      },
    },
    initialY: {
      required: true,
      type: Number,
      validator(y) {
        return y <= 50
      },
    },
    instructions: {
      required: true,
      type: String,
      validator(instructions) {
        return instructions.length < 100
      },
    },
  },
  data() {
    return {
      orientation: this.initialOrientation,
      x: this.initialX,
      y: this.initialY,
    }
  },
}
</script>
