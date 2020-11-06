<template>
  <div id="app">
    <div class="header">
      <img
        alt="Stratum Five Logo"
        src="@/assets/stratum-five-logo.png"
        class="logo"
      />
      <p>Survey Ships</p>
    </div>

    <WorldGrid />
  </div>
</template>

<script>
import WorldGrid from '@/components/WorldGrid'

export default {
  name: 'App',

  components: {
    WorldGrid
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  display: block;
  height: 30px;
  margin: 0 auto;
}
</style>
