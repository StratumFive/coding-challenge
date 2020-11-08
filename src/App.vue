<template>
  <div id="app" class="min-h-screen gradient-ocean">
    <div class="grid grid-cols-2 gap-8 p-8">
      <div class="bg-white rounded-lg p-6 border shadow-xl">Input</div>
      <div class="bg-white rounded-lg p-6 border shadow-xl">Output</div>
      <div class="bg-white col-span-2 rounded-lg p-6 border shadow-xl">
        Grid
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
.gradient-ocean {
  background-image: linear-gradient(135deg, #90cdf4 35%, #38b2ac 100%);
}
</style>
