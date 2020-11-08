<template>
  <div id="app" class="min-h-screen gradient-ocean">
    <div class="grid grid-cols-2 gap-8 p-8">
      <Card title="Input"></Card>
      <Card title="Output"></Card>
      <Card title="Grid" class="col-span-2"></Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card/Card'

export default {
  name: 'App',
  components: { Card },
}
</script>

<style scoped>
.gradient-ocean {
  background-image: linear-gradient(135deg, #90cdf4 35%, #38b2ac 100%);
}
</style>
