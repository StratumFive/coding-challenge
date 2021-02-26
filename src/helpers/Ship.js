export default class Ship {
  constructor(attributes) {
    this.coords = attributes.startingCoords;
    this.direction = attributes.startingDirection;
    this.commands = attributes.commands;
  }
  turnLeft() {
    // Deal with the case of "N", which is at index 0 of CLOCKWISE_DIRECTIONS
    if (this.direction === "N") {
      this.direction = "W";
      return;
    }
    this.direction =
      CLOCKWISE_DIRECTIONS[CLOCKWISE_DIRECTIONS.indexOf(this.direction) - 1];
  }
}
const CLOCKWISE_DIRECTIONS = ["N", "E", "S", "W"];
