export default class Ship {
  static max = {
    x: 50,
    y: 50,
  };
  static warningPoints = [];
  constructor(attributes, callback) {
    this.coords = attributes.startingCoords;
    this.direction = attributes.startingDirection;
    this.callback = callback;
    this.isLost = false;
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
      if (this.coords.y === Ship.max.y) {
        this.onLost();
        return;
      }
      this.coords.y++;
    }
    if (this.direction === "S") {
      if (this.coords.y === 0) {
        this.onLost();
        return;
      }
      this.coords.y--;
    }
    if (this.direction === "E") {
      if (this.coords.x === Ship.max.x) {
        this.onFalling();
        return;
      }
      this.coords.x++;
    }
    if (this.direction === "W") {
      if (this.coords.x === 0) {
        this.onLost();
        return;
      }
      this.coords.x--;
    }
  }
  executeCommands(commands) {
    let _commands = commands.split("");
    for (const command of _commands) {
      if (this.isLost) {
        break;
      }
      if (command === "F") {
        this.goForwards();
      }
      if (command === "R") {
        this.turnRight();
      }
      if (command === "L") {
        this.turnLeft();
      }
      const { coords, direction } = this;
      this.callback && this.callback({ coords, direction }); // If there's a callback use it
    }
  }
  onLost() {
    this.isLost = true;
    Ship.warningPoints.push(this.coords);
  }
}
const CLOCKWISE_DIRECTIONS = ["N", "E", "S", "W"];
