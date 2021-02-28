<template>
  <div>
    <div>I'm a text-based solution</div>
    <v-textarea
      id="text-input"
      label="Input"
      v-model="commandInput"
    ></v-textarea>
    <v-btn @click="calculateShips" id="calculate-button" color="success"
      >Calculate Ship Positions</v-btn
    >
  </div>
</template>

<script>
import parseCommand from "@/helpers/parseCommand";
import Ship from "@/helpers/Ship";

export default {
  data() {
    return {
      // commandInput:
      //   "5 3 \n 1 1 E \n RFRFRFRF \n\n 3 2 N \n FRRFLLFFRRFLL \n\n 0 3 W \n LLFFFLFLFL",
      commandInput: "",
      shipsOutput: "",
    };
  },
  methods: {
    calculateShips() {
      const parsedCommand = parseCommand(this.commandInput);
      console.log("calculateShips - parsedCommand", parsedCommand);
      this.shipsOutput = "Early Days";
    },
  },
};
</script>

<style scoped></style>
