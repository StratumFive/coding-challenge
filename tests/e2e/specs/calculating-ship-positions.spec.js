describe("Calculating ship positions", () => {
  it("calculates the final position and orientation of a ship", () => {
    const sampleInput =
      "5 3 \n 1 1 E \n RFRFRFRF \n\n 3 2 N \n FRRFLLFFRRFLL \n\n 0 3 W \n LLFFFLFLFL";
    cy.visit("/");
    cy.get("#text-input").type(sampleInput);
    // TODO Refactor this test for greater specificity on the order of outputs: ie An edge-case could pass this test with incorrect order of ships in the output.
    // For now I know that if this test passes I've done many things right.
    cy.contains("1 1 E");
    cy.contains("3 3 N LOST");
    cy.contains("2 3 S");
  });
});
