<template>
  <div id="app">
    <input-form />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {/* compassNavigation, Compass, */ calculatePosition, shipInfo} from './navigate'
import inputForm from './components/inputForm.vue'

@Component({
  components: {
    inputForm
  }
})

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
