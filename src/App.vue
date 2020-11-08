<template>
  <div id="app" class="min-h-screen gradient-ocean">
    <div class="grid grid-cols-2 gap-8 p-8">
      <Card title="Input">
        <pre><code>{{ input }}</code></pre>
      </Card>
      <Card title="Output">
        <pre><code>{{ output }}</code></pre>
      </Card>
      <Card title="Grid" class="col-span-2">
        <Ship
          v-for="ship in ships"
          :key="ship.id"
          v-bind="ship"
          @signal-final-position="addToOutput"
        />
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card/Card'
import Ship from '@/components/Ship/Ship'
import input from '@/constants/input'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  components: { Card, Ship },
  data() {
    return {
      output: [],
    }
  },
  created() {
    const [gridSize, ...shipsData] = input.split('\n')
    const [gridWidth, gridHeight] = gridSize.split(' ')

    // Each entry has 1 line for start pos, 1 line for instructions, and a separating newline, so divide by 3
    const numberOfShips = shipsData.length / 3

    const ships = Array.from({ length: numberOfShips }, (_, index) => {
      const [initialX, initialY, initialOrientation] = shipsData[
        index * 3
      ].split(' ')
      const instructions = shipsData[index * 3 + 1]

      return {
        id: index,
        instructions,
        initialOrientation,
        initialX: Number(initialX),
        initialY: Number(initialY),
      }
    })

    this.input = input
    this.ships = ships

    this.setGridHeight({
      height: Math.min(Number(gridHeight), 50),
    })
    this.setGridWidth({
      width: Math.min(Number(gridWidth), 50),
    })
  },
  methods: {
    addToOutput(ship) {
      this.output.push(ship)
    },
    ...mapMutations(['setGridHeight', 'setGridWidth']),
  },
}
</script>

<style scoped>
.gradient-ocean {
  background-image: linear-gradient(135deg, #90cdf4 35%, #38b2ac 100%);
}
</style>
