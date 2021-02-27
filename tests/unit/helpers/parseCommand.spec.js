import parseCommand from "@/helpers/parseCommand";

describe("parseCommand", () => {
  const command =
    "5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL";
  const parsedCommand = parseCommand(command);
  it("returns an object", () => {
    expect(typeof parsedCommand).toBe("object");
  });
  it("extracts maxY and maxX from the command", () => {
    expect(parsedCommand.maxY).toBe(5);
    expect(parsedCommand.maxX).toBe(3);
  });
  it("extracts an array of ship objects from the command", () => {
    expect(Array.isArray(parsedCommand.ships)).toBe(true);
    expect(typeof parsedCommand.ships[0]).toBe("object");
  });
  it("extracts a starting position from the command for each ship", () => {
    expect(parsedCommand.ships[0].startingCoords).toEqual({ y: 1, x: 1 });
    expect(parsedCommand.ships[1].startingCoords).toEqual({ y: 2, x: 3 });
  });
  it("extracts a starting direction from the command for each ship", () => {
    expect(parsedCommand.ships[0].startingDirection).toBe("E");
    expect(parsedCommand.ships[1].startingDirection).toBe("N");
  });
  it("extracts a command list from the command for each ship", () => {
    expect(parsedCommand.ships[0].commands).toBe("RFRFRFRF");
    expect(parsedCommand.ships[1].commands).toBe("FRRFLLFFRRFLL");
  });
  it("produces an explicit array of ship objects with clear attributes", () => {
    console.log("expect - parsedCommand", parsedCommand);
    // This is a combined-view of the above tests.
    expect(parsedCommand).toEqual({
      maxX: 3,
      maxY: 5,
      ships: [
        {
          commands: "RFRFRFRF",
          startingCoords: {
            x: 1,
            y: 1,
          },
          startingDirection: "E",
        },
        {
          commands: "FRRFLLFFRRFLL",
          startingCoords: {
            x: 3,
            y: 2,
          },
          startingDirection: "N",
        },
        {
          commands: "LLFFFLFLFL",
          startingCoords: {
            x: 0,
            y: 3,
          },
          startingDirection: "W",
        },
      ],
    });
  });
});
