export default class Ship {
  constructor(attributes) {
    this.startingCoords = attributes.startingCoords;
    this.startingDirection = attributes.startingDirection;
    this.commands = attributes.commands;
  }
}
