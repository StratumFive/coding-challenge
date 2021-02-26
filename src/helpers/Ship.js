export default class Ship {
  constructor(attributes) {
    this.coords = attributes.startingCoords;
    this.direction = attributes.startingDirection;
    this.commands = attributes.commands;
  }
  turnLeft() {}
}
const CLOCKWISE_DIRECTIONS = ["N", "E", "S", "W"];
