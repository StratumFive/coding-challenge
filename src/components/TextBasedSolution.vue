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
      commandInput:
        "5 3\n1 1 E\n RFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL",
      // commandInput: "",
      shipsOutput: "",
    };
  },
  methods: {
    calculateShips() {
      console.log("Ship", Ship);
      const parsedCommand = parseCommand(this.commandInput);
      Ship.max = { x: parsedCommand.maxX, y: parsedCommand.maxY };
      for (const ship of parsedCommand.ships) {
        console.log("calculateShips - ship", ship);
      }
      this.shipsOutput = "Early Days";
    },
  },
};
</script>

<style scoped></style>
