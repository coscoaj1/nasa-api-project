describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should find our home page", () => {
    cy.get("h1").contains("My SpaceBook");
  });
  it("dark/light mode button works", () => {
    cy.get('[data-testid="theme-toggle"]').wait(1000).click();
  });
  it("like button working", () => {
    cy.get('[ data-testid="like-button"]').click();
  });
  it("next image button working", () => {
    cy.get('[data-testid="decrement-button"]').click();
  });
});

describe("previous button", () => {
  it("previous image button working", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="decrement-button"]')
      .click()
      .get("#previous-image")
      .click();
  });
});
