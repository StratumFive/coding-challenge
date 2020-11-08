<template>
  <div class="flex flex-col">
    <svg :height="this.yMax * 40" class="border border-black rounded w-full">
      <g v-for="y in yMax + 1" :key="y">
        <circle
          v-for="x in xMax + 1"
          :key="x"
          :cx="`${(100 / (xMax + 2)) * x}%`"
          :cy="`${(100 / (yMax + 2)) * y}%`"
          r="4"
          class="fill-current text-black"
        />
      </g>
      <ShipIcon
        :orientation="orientation"
        :x="x"
        :y="y"
        class="w-8"
        :class="isLost ? { 'text-red-500': true } : { 'text-green-500': true }"
      />
    </svg>
    <div class="mt-8 flex justify-between">
      <Button
        @click.native="reset()"
        class="bg-teal-200 border border-teal-700 hover:bg-teal-100 w-32"
      >
        Reset
      </Button>
      <Button
        @click.native="followNextInstruction"
        class="bg-teal-200 border border-teal-700 hover:bg-teal-100 w-32"
      >
        Next
      </Button>
    </div>
  </div>
</template>

<script>
import ShipIcon from './ShipIcon'
import Button from '@/components/Form/Button'
import { LEFT_TURNS, MOVES, RIGHT_TURNS } from '@/constants/instructions'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Ship',
  components: {
    Button,
    ShipIcon,
  },
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
      instructionsFollowed: 0,
      orientation: this.initialOrientation,
      x: this.initialX,
      y: this.initialY,
    }
  },
  computed: {
    // Returns coordinates within the frame of the grid, even if this ship fell off
    boundedCoordinates() {
      return {
        x: Math.max(0, Math.min(this.x, this.xMax)),
        y: Math.max(0, Math.min(this.y, this.yMax)),
      }
    },
    isCurrentPositionDangerous() {
      return this.getLostShips(this.id).some(
        ({ orientation, x, y }) =>
          orientation === this.orientation && x === this.x && y === this.y
      )
    },
    isLost() {
      return (
        this.x < 0 || this.x > this.xMax || this.y < 0 || this.y > this.yMax
      )
    },
    ...mapState(['xMax', 'yMax']),
    ...mapGetters(['getLostShips']),
  },
  created() {
    for (const instruction of this.instructions) {
      this.followInstruction(instruction)
    }

    this.$emit('signal-final-position', {
      ship: {
        id: this.id,
        isLost: this.isLost,
        orientation: this.orientation,
        ...this.boundedCoordinates,
      },
    })

    this.reset()
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
    followNextInstruction() {
      this.followInstruction(this.instructions[this.instructionsFollowed])
      this.instructionsFollowed++
    },
    move() {
      if (this.isCurrentPositionDangerous) {
        return
      }

      const [xDiff, yDiff] = MOVES[this.orientation]
      this.x += xDiff
      this.y += yDiff
    },
    reset() {
      this.instructionsFollowed = 0
      this.orientation = this.initialOrientation
      this.x = this.initialX
      this.y = this.initialY
    },
  },
}
</script>
