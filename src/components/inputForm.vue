<template>
  <div class="form-wrap">
    <form>
        <label for="northBorder">North border: </label>
        <input type="number" name="northBorder" v-model="northBorder" />
        <label for="eastBorder" class="label-2">East border: </label>
        <input type="number" name="eastBorder" v-model="eastBorder" />
        <label for="xValue">X: </label>
        <input
          type="number"
          name="xValue"
          placeholder="X coordinate"
          v-model="xValue"
        />
        <label for="yValue" class="label-2">Y: </label>
        <input
          type="number"
          name="yValue"
          placeholder="Y coordinate"
          v-model="yValue"
        />
        <label for="direction">Direction: </label>
        <select name="direction" v-model="direction">
          <option value="N">North</option>
          <option value="E">East</option>
          <option value="S">South</option>
          <option value="W">West</option>
        </select>
        <label for="instruction">Instruction: </label>
        <input
          type="text"
          name="instruction"
          placeholder="Instructions"
          class="instr-input"
          v-model="instructions"
        />
    <button class="reset-btn">Reset</button>
    <button @click="calculateData" class="calculate-btn">Calculate</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Ship } from "../navigate";

@Component
export default class App extends Vue {
  eastBorder: number = 0;
  northBorder: number = 0;
  xValue: number = 0;
  yValue: number = 0;
  direction: string = "N";
  instructions: string = "";

  calculateData() {
    const grid = [this.northBorder, this.eastBorder];
    const shipInfo: Ship = {
      coordinates: `${this.xValue} ${this.yValue} ${this.direction}`,
      instructions: this.instructions,
    };
    console.log(grid);
    this.$store.dispatch("calculateOutput", {
      gridEdge: grid,
      ship: shipInfo,
    });
  }
}
</script>

<style>
.form-wrap {
    display: flex;
    justify-content: center;
}
form {
    display: grid;
    grid-template-columns: 100px 100px 100px 100px;
    grid-template-rows: 30px 30px 30px 30px;
}
label {
    grid-column-start: 1;
    grid-column-start: 1;
}
.label-2 {
    grid-column-start: 3;
    grid-column-end: 3;
}
select, .instr-input {
    grid-column-start: 2;
    grid-column-end: 5;
}
.reset-btn {
    grid-column-start: 3;
    grid-column-end: 4;
}
</style>