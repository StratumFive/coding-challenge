<template>
  <div class="output">
    <h2>Your output will be here:</h2>
    <p>{{ outputValue }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  get outputValue() {
    return this.$store.state.output;
  }
}
</script>

<style>
.output {
  width: 300px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>