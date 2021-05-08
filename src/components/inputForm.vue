<template>
  <div class="form-wrap">
    <form>
      <label for="eastBorder">East border: </label>
      <input type="number" name="eastBorder" v-model="eastBorder" />
      <label for="northBorder" class="label-2">North border: </label>
      <input type="number" name="northBorder" v-model="northBorder" />
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
      <button @click.prevent="resetData" class="reset-btn">Reset</button>
      <button @click.prevent="calculateData" class="calculate-btn">
        Calculate
      </button>
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
      console.log(this.$store.state.bannedMoves)
    const grid = [this.eastBorder, this.northBorder];
    const shipInfo: Ship = {
      coordinates: `${this.xValue} ${this.yValue} ${this.direction}`,
      instructions: this.instructions,
    };
    this.$store.dispatch("calculateOutput", {
      gridEdge: grid,
      ship: shipInfo,
    });
  }

  resetData() {
    this.eastBorder = 0;
    this.northBorder = 0;
    this.xValue = 0;
    this.yValue = 0;
    this.direction = "N";
    this.instructions = "";
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
select,
.instr-input {
  grid-column-start: 2;
  grid-column-end: 5;
}
.reset-btn {
  grid-column-start: 3;
  grid-column-end: 4;
  background-color: rgb(255, 112, 77);
  color: white;
  border: none;
}
.reset-btn:hover {
  background-color: rgba(255, 112, 77, 0.8);
  cursor: pointer;
}
.calculate-btn {
  background-color: rgb(51, 153, 255);
  color: white;
  border: none;
}
.calculate-btn:hover {
  background-color: rgba(51, 153, 255, 0.8);
  cursor: pointer;
}
</style>