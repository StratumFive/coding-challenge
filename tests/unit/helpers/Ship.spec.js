import Ship from "@/helpers/Ship";

describe("The Ship Class - basic movements", () => {
  let testShip;
  beforeEach(() => {
    const shipValuesFromParsedInput = {
      //   commands: "RFRFRFRF",
      startingCoords: {
        x: 1,
        y: 1,
      },
      startingDirection: "E",
    };
    testShip = new Ship(shipValuesFromParsedInput);
  });
  it("exists as an object", () => {
    expect(typeof testShip).toBe("object");
  });
  it("can turn left", () => {
    testShip.turnLeft();
    expect(testShip.direction).toBe("N");
    testShip.turnLeft();
    expect(testShip.direction).toBe("W");
  });
  it("can turn right", () => {
    testShip.turnRight();
    expect(testShip.direction).toBe("S");
    testShip.turnRight();
    expect(testShip.direction).toBe("W");
    testShip.turnRight();
    expect(testShip.direction).toBe("N");
  });
  it("can go forwards from each of the cardinal directions", () => {
    testShip.direction = "N";
    testShip.coords = { x: 2, y: 2 };
    testShip.goForwards();
    expect(testShip.coords).toEqual({ x: 2, y: 3 });

    testShip.direction = "E";
    testShip.coords = { x: 2, y: 2 };
    testShip.goForwards();
    expect(testShip.coords).toEqual({ x: 3, y: 2 });

    testShip.direction = "S";
    testShip.coords = { x: 2, y: 2 };
    testShip.goForwards();
    expect(testShip.coords).toEqual({ x: 2, y: 1 });

    testShip.direction = "W";
    testShip.coords = { x: 2, y: 2 };
    testShip.goForwards();
    expect(testShip.coords).toEqual({ x: 1, y: 2 });
  });
  it("can execute a string of commands - happy path no edge commands", () => {
    const commands = "FRFLFRFLFRFL"; // Diagonal
    const thirdShipAttributes = {
      startingCoords: {
        x: 0,
        y: 3,
      },
      startingDirection: "E",
    };
    const thirdShip = new Ship(thirdShipAttributes);
    thirdShip.executeCommands(commands);
    expect(thirdShip.coords).toEqual({
      x: 3,
      y: 0,
    });
    expect(thirdShip.direction).toBe("E");
  });
});
describe("The Ship Class - event emitting and edge awareness", () => {
  const commands = "FFF";
  const ownShipAttributes = {
    startingCoords: {
      x: 0,
      y: 0,
    },
    startingDirection: "E",
  };
  let ownShip, message;
  let handleMessage = (coords) => {
    message = coords;
  };
  beforeEach(() => {
    ownShip = new Ship(ownShipAttributes, handleMessage);
  });
  it("emits its location via a callback every time it moves forward", () => {
    ownShip.executeCommands(commands);
    expect(message).toEqual(ownShip.coords);
  });
});
