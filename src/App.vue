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
        <h2 class="text-md text-center">
          Width: {{ gridWidth }} | Height: {{ gridHeight }}
        </h2>
        <div class="grid grid-cols-6 mt-4">
          <div>
            <Select
              v-model.number="selectedShipId"
              class="hover:border-gray-500 focus:border-teal-300"
            >
              <option disabled value="">Select a ship to view</option>
              <option v-for="ship in ships" :key="ship.id" :value="ship.id">
                {{
                  `${ship.id}: Starting at ${ship.initialX} ${ship.initialY} ${ship.initialOrientation}`
                }}
              </option>
            </Select>
          </div>
          <div class="col-span-5">
            <Ship
              v-for="ship in ships"
              v-show="ship.id === selectedShipId"
              :key="ship.id"
              v-bind="ship"
              @signal-final-position="addFinalShipPosition"
            />
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card/Card'
import Select from '@/components/Form/Select'
import Ship from '@/components/Ship/Ship'
import input from '@/constants/input'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'App',
  components: { Card, Select, Ship },
  data() {
    return {
      selectedShipId: 0,
    }
  },
  computed: {
    output() {
      return this.finalShipPositions
        .map(
          ({ isLost, orientation, x, y }) =>
            `${x} ${y} ${orientation}${isLost ? ' LOST' : ''}`
        )
        .join('\n')
    },
    ...mapState(['finalShipPositions', 'gridHeight', 'gridWidth']),
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
    ...mapMutations(['addFinalShipPosition', 'setGridHeight', 'setGridWidth']),
  },
}
</script>

<style scoped>
.gradient-ocean {
  background-image: linear-gradient(135deg, #90cdf4 35%, #38b2ac 100%);
}
</style>
