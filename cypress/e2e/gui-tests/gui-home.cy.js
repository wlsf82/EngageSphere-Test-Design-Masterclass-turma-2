describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Initial Load', () => {
    it('should display a "Loading..." fallback initially', () => {
      cy.contains('Loading...').should('be.visible');
      cy.get('[data-testid="customer-list"]').should('not.exist');
    });
  });

  context('Customer Selection', () => {
    it('should disable input field after selecting a company', () => {
      cy.get('[data-testid="name"]').should('not.be.disabled');
      cy.get('[data-testid="name"]').type('Gabriel Logan');
      cy.contains('Lowe Co').click();
      cy.get('[data-testid="name"]').should('be.disabled');
    });
  });
});
