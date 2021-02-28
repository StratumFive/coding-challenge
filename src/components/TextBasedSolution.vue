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
    <div>
      <p>The answer is:</p>
      <div>{{ shipsOutput }}</div>
    </div>
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
      const parsedCommand = parseCommand(this.commandInput);
      Ship.max = { x: parsedCommand.maxX, y: parsedCommand.maxY };
      console.log("calculateShips - Ship.max", Ship.max);
      const instantiatedShips = parsedCommand.ships.map((ship) => ({
        ship: new Ship({
          startingCoords: ship.startingCoords,
          startingDirection: ship.startingDirection,
        }),
        command: ship.commands,
      }));
      let results = [];
      for (const instance of instantiatedShips) {
        instance.ship.executeCommands(instance.command);
        const { coords, direction, isLost } = instance.ship;
        results.push({ coords, direction, isLost });
      }
      console.log("calculateShips - results", results);
      this.shipsOutput = results
        .map(
          (result) =>
            `${result.coords.x} ${result.coords.y} ${result.direction}${
              result.isLost ? " LOST" : ""
            }`
        )
        .join("\n");
      this.commandInput = "";
      console.log("calculateShips - this.shipsOutput", this.shipsOutput);
    },
  },
};
</script>

<style scoped></style>
