/// <reference types="Cypress" />

describe("EngageSphere", () => {
  beforeEach(() => {
    cy.visit("https://engage-sphere.vercel.app/");
  });

  it("Renderiza o cabeçalho com um h1 e alternância de tema", () => {
    cy.get("h1").contains("EngageSphere");
    cy.get("#theme-toggle-button").should("be.visible").click();
    cy.get("h1").contains("EngageSphere");
  });
  it("Exibe a saudação padrão", () => {
    cy.get("p").eq(0).contains("Hi there!");
  });
  it("Exibe a saudação personalizada", () => {
    cy.get('[data-testid="name"]').type("Renan Dezotti");
    cy.get("p").eq(0).contains("Hi Renan Dezotti!");
  });
  it("Desativa o campo de entrada de texto na página de detalhes do cliente", () => {
    cy.get('[data-testid="name"]').type("Renan Dezotti");
    cy.contains("button", "Jacobs Co").click();
    cy.get('[data-testid="name"]').should("be.disabled");
  });
  it("Volta para a lista de clientes ao clicar no botão Voltar", () => {
    cy.contains("button", "Jacobs Co").click();
    cy.contains("button", "Back").click();
    cy.get("p").eq(0).contains("Hi there!");
  });
  it.only("Mostra o rodapé e seus links", () => {
    cy.get('[data-testid="footer"]').should("be.visible");
    cy.get(
      '[data-testid="footer"] a[href="https://hotmart.com/pt-br/club/talking-about-testing"]'
    ).should("contain", "Hotmart");
    cy.get(
      '[data-testid="footer"] a[href="https://udemy.com/user/walmyr"]'
    ).should("contain", "Udemy");
    cy.get(
      '[data-testid="footer"] a[href="https://talkingabouttesting.com"]'
    ).should("contain", "Blog");
    cy.get(
      '[data-testid="footer"] a[href="https://youtube.com/@talkingabouttesting"]'
    ).should("contain", "YouTube");
  });
});
