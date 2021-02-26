import parseCommand from "@/helpers/parseCommand";

describe("parseCommand", () => {
  it("returns an object", () => {
    expect(typeof parseCommand("Hello\nWorld")).toBe("object");
  });
  it("extracts maxY and maxX from the command", () => {
    const command =
      "5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL";
    const parsedCommand = parseCommand(command);
    expect(parsedCommand.maxY).toBe(5);
    expect(parsedCommand.maxX).toBe(3);
  });
});
