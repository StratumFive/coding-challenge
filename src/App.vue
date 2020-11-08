<template>
  <div id="app" class="min-h-screen gradient-ocean">
    <div class="grid grid-cols-2 gap-8 p-8">
      <Card title="Input">
        <pre><code>{{ input }}</code></pre>
      </Card>
      <Card title="Output"></Card>
      <Card title="Grid" class="col-span-2">{{ ships }}</Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card/Card'
import input from '@/constants/input'

export default {
  name: 'App',
  components: { Card },
  created() {
    const [gridSize, ...shipsData] = input.split('\n')
    const [gridWidth, gridHeight] = gridSize.split(' ')

    // Each entry has 1 line for start pos, 1 line for instructions, and a separating newline, so divide by 3
    const numberOfShips = shipsData.length / 3

    const ships = Array.from({ length: numberOfShips }, (_, index) => {
      const [x, y, orientation] = shipsData[index * 3].split(' ')
      const instructions = shipsData[index * 3 + 1]

      return {
        id: index,
        instructions,
        orientation,
        x: Number(x),
        y: Number(y),
      }
    })

    this.gridHeight = Math.min(Number(gridHeight), 50)
    this.gridWidth = Math.min(Number(gridWidth), 50)
    this.input = input
    this.ships = ships
  },
}
</script>

<style scoped>
.gradient-ocean {
  background-image: linear-gradient(135deg, #90cdf4 35%, #38b2ac 100%);
}
</style>
