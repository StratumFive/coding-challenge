import Ship from "@/helpers/Ship";

describe("The Ship Class", () => {
  const shipValuesFromParsedInput = {
    commands: "RFRFRFRF",
    startingCoords: {
      x: 1,
      y: 1,
    },
    startingDirection: "E",
  };
  const testShip = new Ship(shipValuesFromParsedInput);
  it("exists as an object", () => {
    expect(typeof testShip).toBe("object");
  });
  it("can turn left", () => {
    testShip.turnLeft();
    expect(testShip.direction).toBe("N");
    testShip.turnLeft();
    expect(testShip.direction).toBe("W");
  });
});
