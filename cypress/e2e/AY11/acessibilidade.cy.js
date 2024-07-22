/// <reference types="cypress" />
import 'cypress-axe'

describe('TESTE DE ACESSIBILIDADE', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  });
  // Basic usage
  it('VERIFICA A11Y E FINALIZA', () => {
    // Test the page at initial load
    cy.checkA11y()
  })

  it('VERIFICA ACESSIBILIDADE NO MODO DARK', () => {
    cy.get('#theme-toggle-button').click()
    cy.pageAccessibility();

  });

  // // Applying a context and run parameters
  it('VERIFICA ACESSIBILIDADE DE UMA CLASSE OU ID ESPECÍFICO', () => {
    // Test the page at initial load (with context and options)
    cy.checkA11y('.container', {
      runOnly: {
        type: 'tag',
        values: ["wcag2a", "wcag244", "wcag412"]
      }
    })
  })

  it('ERROS CRÍTICOS', () => {
    // Test on initial load, only report and assert for critical impact items
    cy.checkA11y(null, {
      includedImpacts: ['critical']
    })
  })

  it('FINALIZA O TESTE MESMO QUE HAJA ERROS', () => {
    // Do not fail the test when there are accessibility failures
    cy.checkA11y(null, null, null, true)
  })

  it('VALIDAÇÃO TOTAL DE ACESSIBILIDADE', () => {
    cy.pageAccessibility();
  });
});
