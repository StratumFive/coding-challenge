export default class Ship {
  static max = {
    x: 50,
    y: 50,
  };
  constructor(attributes, callback) {
    this.coords = attributes.startingCoords;
    this.direction = attributes.startingDirection;
    this.commands = attributes.commands;
    this.callback = callback;
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
  turnRight() {
    if (this.direction === "W") {
      this.direction = "N";
      return;
    }
    this.direction =
      CLOCKWISE_DIRECTIONS[CLOCKWISE_DIRECTIONS.indexOf(this.direction) + 1];
  }
  goForwards() {
    if (this.direction === "N") {
      this.coords.y++;
    }
    if (this.direction === "S") {
      this.coords.y--;
    }
    if (this.direction === "E") {
      this.coords.x++;
    }
    if (this.direction === "W") {
      this.coords.x--;
    }
    this.callback && this.callback(this.coords); // If there's a callback use it
  }
  executeCommands() {
    let _commands = this.commands.split("");
    for (const command of _commands) {
      if (command === "F") {
        this.goForwards();
      }
      if (command === "R") {
        this.turnRight();
      }
      if (command === "L") {
        this.turnLeft();
      }
    }
  }
}
const CLOCKWISE_DIRECTIONS = ["N", "E", "S", "W"];
