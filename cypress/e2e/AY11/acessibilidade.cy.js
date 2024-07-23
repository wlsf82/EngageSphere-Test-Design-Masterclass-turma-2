/// <reference types="cypress" />
import 'cypress-axe'

describe('ACCESSIBILITY TESTS', () => {

  context('CHECK ACCESSIBLITY IN DARK MODE', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.injectAxe()
      cy.get('#theme-toggle-button').click()
      cy.get('[data-theme="dark"]').should('exist')
    });

    it('CHECK ACCESSIBILITY IN DARK MODE IN DIFFERENT VIEWPORTS', () => {
      cy.pageAccessibility();
    });

    it('DO NOT FIND AY11 ERRORS IN CLIENT DETAILS WITH DARK MODE', () => {
      cy.get('tbody').first().click()
      cy.checkA11y()
    });

    it('DO NOT FIND AY11 ERRORS IN ADDRESS DETAIL WITH DARK MODE', () => {
      cy.get('tbody').first().click()
      cy.get('.show-address-btn').click()
      cy.checkA11y()
    });
  })

  context('CHECK ACCESSIBLITY IN LIGHT MODE', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('[data-theme="light"]').should('exist')
      cy.injectAxe()
    });

    it('CHECK ACCESSIBILITY IN LIGHT MODE IN DIFFERENT VIEWPORTS', () => {
      cy.pageAccessibility();
    });

    it('DO NOT FIND AY11 ERRORS IN CLIENT DETAILS WITH LIGHT MODE', () => {
      cy.get('tbody').first().click()
      cy.checkA11y()
    });

    it('DO NOT FIND AY11 ERRORS IN ADDRESS DETAIL WITH LIGHT MODE', () => {
      cy.get('tbody').first().click()
      cy.get('.show-address-btn').click()
      cy.checkA11y()
    });
  })
});
