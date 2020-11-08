<template>
  <div>{{ `${id}: ${x} ${y} ${orientation}` }}</div>
</template>

<script>
import { LEFT_TURNS, MOVES, RIGHT_TURNS } from '@/constants/instructions'
import { mapState } from 'vuex'

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
  computed: {
    isLost() {
      return (
        this.x < 0 ||
        this.x > this.gridWidth ||
        this.y < 0 ||
        this.y > this.gridHeight
      )
    },
    ...mapState(['gridHeight', 'gridWidth']),
  },
  created() {
    for (const instruction of this.instructions) {
      this.followInstruction(instruction)
    }

    this.$emit('signal-final-position', {
      id: this.id,
      isLost: this.isLost,
      orientation: this.orientation,
      x: this.x,
      y: this.y,
    })
  },
  methods: {
    followInstruction(instruction) {
      if (this.isLost) {
        return
      }

      if (instruction === 'F') {
        this.move()
      } else if (instruction === 'L') {
        this.orientation = LEFT_TURNS[this.orientation]
      } else if (instruction === 'R') {
        this.orientation = RIGHT_TURNS[this.orientation]
      }
    },
    move() {
      const [xDiff, yDiff] = MOVES[this.orientation]
      this.x += xDiff
      this.y += yDiff
    },
  },
}
</script>
