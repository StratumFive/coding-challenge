<template>
  <div>{{ `${id}: ${x} ${y} ${orientation}` }}</div>
</template>

<script>
import { LEFT_TURNS, MOVES, RIGHT_TURNS } from '@/constants/instructions'

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
  created() {
    for (const instruction of this.instructions) {
      this.followInstruction(instruction)
    }
  },
  methods: {
    followInstruction(instruction) {
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
