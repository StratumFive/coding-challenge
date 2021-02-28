describe("Calculating ship positions", () => {
  it("calculates the final position and orientation of a ship", () => {
    const sampleInput =
      "5 3\n1 1 E\nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W\nLLFFFLFLFL";
    cy.visit("/");
    cy.get("#text-input").type(sampleInput);
    cy.get("#calculate-button").click();
    // TODO Refactor this test for greater specificity on the order of outputs: ie An edge-case could pass this test with incorrect order of ships in the output.
    // For now I know that if this test passes I've done many things right. ie. The odds of getting the solution strings the same - even if they're in a different order are minute.
    cy.contains("1 1 E");
    cy.contains("3 3 N LOST");
    cy.contains("2 3 S");
  });
});
