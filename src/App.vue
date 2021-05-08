<template>
  <div id="app">
    <div class="input-wrapper">
      <div>
    <h1>Final position calculator</h1>
      </div>
    <input-form />
    <output-field />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {calculatePosition, shipInfo} from './navigate'
import inputForm from './components/inputForm.vue'
import outputField from './components/outputField.vue'

@Component({
  components: {
    inputForm,
    outputField
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
  height: 100vh;
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('https://images.theconversation.com/files/223729/original/file-20180619-126566-1jxjod2.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop')
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 500px;
  width: 70%;
  margin: 0 auto;
  background-color: rgba(255,255,255, 0.5);
  border-radius: 5%;
}
</style>
