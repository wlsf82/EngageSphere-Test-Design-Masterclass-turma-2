describe("load page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should shows the heading and themes toggle ", () => {
    cy.get("#theme-toggle-button").should("be.visible");
  });
});