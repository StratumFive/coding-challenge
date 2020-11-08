<template>
  <div id="app" class="min-h-screen gradient-ocean">
    <div class="grid grid-cols-2 gap-8 p-8">
      <Card title="Input">
        <pre><code>{{ input }}</code></pre>
      </Card>
      <Card title="Output"></Card>
      <Card title="Grid" class="col-span-2"></Card>
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
    this.input = input
  },
}
</script>

<style scoped>
.gradient-ocean {
  background-image: linear-gradient(135deg, #90cdf4 35%, #38b2ac 100%);
}
</style>
