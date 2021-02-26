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
    expect(parsedCommand.ships[1].startingCoords).toEqual({ y: 3, x: 2 });
  });
});
