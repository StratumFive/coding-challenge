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
});
