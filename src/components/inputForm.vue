<template>
  <div>
      <form>
          <label for="xValue">X: </label>
          <input type="number" name="xValue" placeholder="X coordinate" v-model="xValue">
          <label for="yValue">Y: </label>
          <input type="number" name="yValue" placeholder="Y coordinate">
          <label for="yValue">Direction: </label>
          <input type="text" name="direction" placeholder="Direction">
          <label for="instruction">Direction: </label>
          <input type="text" name="instruction" placeholder="Instructions">
      </form>
          <button>OK</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';

@Component

export default class App extends Vue {
  xValue : number = 0 
}
</script>

<style>

</style>