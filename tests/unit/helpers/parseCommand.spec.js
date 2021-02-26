import parseCommand from "@/helpers/parseCommand";

describe("parseCommand", () => {
  it("returns an array", () => {
    expect(typeof parseCommand("Hello\nWorld")).toBe("object");
  });
});
