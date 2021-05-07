<template>
  <div id="app">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {/* compassNavigation, Compass, */ calculatePosition, shipInfo} from './navigate'

@Component

export default class App extends Vue {
  mounted() {
    calculatePosition([5,3], shipInfo)
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
