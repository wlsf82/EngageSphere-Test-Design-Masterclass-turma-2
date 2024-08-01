/// <reference types="Cypress" />
import '../support/e2e.js'

describe('A11y Test Suite', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.injectAxe()
    })
    
    context('Light Mode', ()=>{
    it('finds no a11y issues in light mode', () => {
            cy.checkA11y()
        
    })
    it('finds no a11y issues in light mode, considering customer details and address', ( ) => {
        cy.get('tbody tr').first().click()
        cy.get('.show-address-btn').click()
            cy.checkA11y()

    })
    })
    
    context('Dark Mode', ()=>{
        beforeEach(() => {
            cy.get('#theme-toggle-button').click()

        })
    it('finds no a11y issues in dark mode', () => {
            cy.checkA11y()

    })
    it('finds no a11y issues in dark mode, considering customer details and address', () => {
        cy.get('tbody tr').first().click()
        cy.get('.show-address-btn').click()
            cy.checkA11y()

    })
    })
})