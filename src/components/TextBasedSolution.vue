<template>
  <v-card class="text-solution">
    <v-card-title>Text Based Solution</v-card-title>
    <v-card-text>
      <v-textarea
        id="text-input"
        class="fixed-height"
        label="Input"
        v-model="commandInput"
      ></v-textarea>
      <v-btn dark color="#015a8d" @click="calculateShips" id="calculate-button">
        Calculate Ship Positions
      </v-btn>
      <div>
        <p>The answer is:</p>
        <p class="ma-0" v-for="ship in shipsOutput" :key="ship">{{ ship }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import parseCommand from "@/helpers/parseCommand";
import Ship from "@/helpers/Ship";

export default {
  data() {
    return {
      commandInput:
        "5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL",
      shipsOutput: [],
    };
  },
  computed: {
    singleStringOutput() {
      return this.shipsOutput.join("\n");
    },
  },
  methods: {
    calculateShips() {
      const parsedCommand = parseCommand(this.commandInput);
      Ship.max = { x: parsedCommand.maxX, y: parsedCommand.maxY };
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
      this.shipsOutput = results.map(
        (result) =>
          `${result.coords.x} ${result.coords.y} ${result.direction}${
            result.isLost ? " LOST" : ""
          }`
      );
      this.commandInput = "";
      Ship.warningPoints = [];
    },
  },
};
</script>

<style scoped>
.text-solution {
  /* min-height: 700px; */
  width: 350px;
  min-height: 580px;
  margin: auto 0;
  align-self: center;
  justify-self: center;
  transition: all 1s ease-in-out;
}
</style>
<style>
.fixed-height.v-textarea textarea {
  min-height: 300px;
}
</style>
