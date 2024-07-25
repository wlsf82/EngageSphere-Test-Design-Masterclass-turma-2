/// <reference types="Cypress" />

describe('EngageSphere', ()=> {
  beforeEach(()=> {
    cy.visit('/')
  })
  
  context('Heading', ()=> {

    it('Shows the heading and the theme button', ()=> {
      cy.contains('h1','EngageSphere')
        .should('be.visible')
      cy.get('[id="theme-toggle-button"]')
        .should('be.visible')
    })
  })

  context('Greeting', ()=>{

    it('Validate default greting', ()=>{
      const pastDate = new Date(Date.UTC(1988, 3, 23))
      cy.clock(pastDate)
      cy.visit('/')
      cy.contains('Hi there! It is now Fri Apr 22 1988')
        .should('be.visible')
    })

    it('Validate personal greting', ()=>{
      cy.get('[data-testid="name"]').type('Caio')
      cy.contains('Hi Caio')
        .should('be.visible')
    })
  })
  context('Customer details modal', ()=>{

    beforeEach(()=> {
      cy.get('tbody tr').first().click()
    })

    it('goes back to the customer list when clicking the back button', ()=>{
      cy.get('.customer-details')
        .should('be.visible')
      cy.contains('Back').click()
      cy.get('[data-testid="table"]')
        .should('be.visible')

    })

    it('shows and hides cliente address', ()=> {
      cy.get('.show-address-btn').click()
      cy.get('.address-info')
        .should('be.visible')
      cy.get('.hide-address-btn').click()
      cy.get('.show-address-btn')
        .should('be.visible')
    })

    it('Validate if name field is disabled after open client details', ()=> {
      cy.get('.show-address-btn').click()
      cy.get('[data-testid="name"]')
        .should('be.disabled')
    })
  })
  context('Footer', ()=>{

    it('Validate links', ()=> {
      cy.contains('p', 'Copyright 2024 - Talking About Testing')
        .should('be.visible')
      cy.contains('a', 'Hotmart')
        .should('be.visible')
        .and('have.attr', 'href', 'https://hotmart.com/pt-br/club/talking-about-testing')
      cy.contains('a', 'Udemy')
        .should('be.visible')
        .and('have.attr', 'href', 'https://udemy.com/user/walmyr')
      cy.contains('a', 'Blog')
        .should('be.visible')
        .and('have.attr', 'href', 'https://talkingabouttesting.com')
      cy.contains('a', 'YouTube')
        .should('be.visible')
        .and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
    })
  })
  
})

