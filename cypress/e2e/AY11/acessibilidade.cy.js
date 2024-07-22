/// <reference types="cypress" />
import 'cypress-axe'

describe('TESTES DE ACESSIBILIDADE', () => {

  context('VERIFICA ACESSIBLIDADE NO MODO DARK', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.injectAxe()
      cy.get('#theme-toggle-button').click()
      cy.get('[data-theme="dark"]').should('exist')
    });

    it('VERIFICA ACESSIBILIDADE NO MODO DARK', () => {
      cy.pageAccessibility();
    });

    it('NÃO ENCONTRA ERROS DE AY11 EM DETALHES DO CLIENTE COM MODO DARK', () => {
      cy.get('tbody').first().click()
      cy.checkA11y()
    });

    it('NÃO ENCONTRA ERROS DE AY11 NO DETALHE DO ENDEREÇO COM MODO DARK', () => {
      cy.get('tbody').first().click()
      cy.get('.show-address-btn').click()
      cy.checkA11y()
    });
  })

  context('VERIFICA ACESSIBLIDADE NO MODO LIGHT', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.injectAxe()
    });

    it('VERIFICA ACESSIBILIDADE NO MODO DARK', () => {
      cy.pageAccessibility();
    });

    it('NÃO ENCONTRA ERROS DE AY11 EM DETALHES DO CLIENTE COM MODO DARK', () => {
      cy.get('tbody').first().click()
      cy.checkA11y()
    });

    it('NÃO ENCONTRA ERROS DE AY11 NO DETALHE DO ENDEREÇO COM MODO DARK', () => {
      cy.get('tbody').first().click()
      cy.get('.show-address-btn').click()
      cy.checkA11y()
    });
  })
});
