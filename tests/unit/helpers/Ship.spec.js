import Ship from "@/helpers/Ship";

describe("The Ship Class", () => {
  let testShip;
  beforeEach(() => {
    const shipValuesFromParsedInput = {
      commands: "RFRFRFRF",
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
    // For a happy path, chosen the third ship, because:
    // - The first one ends where it started, so not ideal for accurate failing tests.
    // - The second one needs to deal with falling off the world.
    const thirdShipAttributes = {
      commands: "LLFFFLFLFL",
      startingCoords: {
        x: 0,
        y: 3,
      },
      startingDirection: "W",
    };
    const thirdShip = new Ship(thirdShipAttributes);
    thirdShip.executeCommands();
    expect(thirdShip.coords).toEqual({
      x: 2,
      y: 4, // My current manual understanding. TODO: Adjust based on new insight.
    });
    expect(thirdShip.direction).toBe("S");
  });
  it("can execute a string of commands - own manual check", () => {
    const ownShipAttributes = {
      commands: "FRFLFRF",
      startingCoords: {
        x: 1,
        y: 1,
      },
      startingDirection: "N",
    };
    const ownShip = new Ship(ownShipAttributes);
    ownShip.executeCommands();
    expect(ownShip.coords).toEqual({
      x: 3,
      y: 3,
    });
    expect(ownShip.direction).toBe("E");
  });
  it("emits its location via a callback every time it moves forward", () => {
    const ownShipAttributes = {
      commands: "FFFF",
      startingCoords: {
        x: 0,
        y: 0,
      },
      startingDirection: "E",
    };
    let message = ownShipAttributes.startingCoords;
    const ownShip = new Ship(ownShipAttributes, (coords) => {
      message = coords;
      console.log("ownShip - message", message);
    });
    ownShip.executeCommands();
    expect(message).toEqual(ownShip.coords);
  });
});
