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
  const ownShipAttributes = {
    startingCoords: {
      x: 0,
      y: 0,
    },
    startingDirection: "E",
  };
  let ownShip, message;
  let handleMessage = (shipState) => {
    message = shipState;
  };
  beforeEach(() => {
    ownShip = new Ship(ownShipAttributes, handleMessage);
  });
  it("emits its state via a callback for every command it receives", () => {
    // Why not only emit it's finishing state upon finishing?
    // Calling the callback for each command allows us to more easily observe what's happening in the ship.
    // A future user of the Ship class can use the handler for all sorts of interesting functionality,
    // without needing to change the class itself.
    ownShip.executeCommands("FFF");
    expect(message.coords).toEqual(ownShip.coords);
  });
  it("handles falling off the top/right extremes of the grid", () => {
    Ship.max = { x: 5, y: 3 };
    Ship.warningPoints = [{ x: 5, y: 1 }];
    ownShip.coords = { x: 0, y: 0 };
    ownShip.executeCommands("LFFFFFFF"); // Fall off the world at (0, 3) and try to keep going.
    expect(ownShip.coords).toEqual({ x: 0, y: 3 });
    expect(ownShip.isLost).toBe(true);
    expect(Ship.warningPoints[1]).toEqual({ x: 0, y: 3 });
  });
  it("handles falling off the bottom/left extremes of the grid", () => {
    Ship.warningPoints = [{ x: 5, y: 1 }];
    ownShip.coords = { x: 2, y: 2 };
    ownShip.executeCommands("RFFFFF"); // Fall off the world at (0, 3) and try to keep going.
    console.log("it - ownShip.coords", ownShip.coords);
    expect(ownShip.coords).toEqual({ x: 2, y: 0 });
    expect(ownShip.isLost).toBe(true);
    expect(Ship.warningPoints[1]).toEqual({ x: 2, y: 0 });
  });
});
