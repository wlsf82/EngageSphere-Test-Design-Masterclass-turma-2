/// <reference types="Cypress" />

describe('Validate EngageSphere website', ()=> {
  beforeEach(()=> {
    cy.visit('/')
  })
  context('Title', ()=> {
    it('Validate title', ()=> {
      cy.contains('h1','EngageSphere').should('be.visible')
    })
    it('Validate theme icon', ()=>{
      cy.get('[id="theme-toggle-button"]').should('be.visible')
    })   
  })
  context('Label', ()=>{
    it('Validate default greting', ()=>{
      cy.contains('Hi there!').should('be.visible')
    })
    it('Validate personal greting', ()=>{
      cy.get('[data-testid="name"]').click().type('Caio')
      cy.contains('Hi Caio').should('be.visible')
    })
  })
  context('Modal customer details', ()=>{
    it('Validate back button', ()=>{
      cy.get('tbody > :nth-child(1) > :nth-child(1)').click()
      cy.get('.customer-details').should('be.visible')
      cy.contains('Back').click()
      cy.get('[data-testid="table"]').should('be.visible')

    })
    it('Validate client adress', ()=> {
      cy.get('tbody > :nth-child(1) > :nth-child(1)').click()
      cy.get('.show-address-btn').click()
      cy.get('.address-info').should('be.visible')
    })

    it('validate hide client adress', ()=> {
      cy.get('tbody > :nth-child(1) > :nth-child(1)').click()
      cy.get('.show-address-btn').click()
      cy.get('.address-info').should('be.visible')
      cy.get('.hide-address-btn').click()
      cy.get('.show-address-btn').should('be.visible')
    })
    it('Validate if name field is disabled after open client details', ()=> {
      cy.get('tbody > :nth-child(1) > :nth-child(1)').click()
      cy.get('.show-address-btn').click()
      cy.get('[data-testid="name"]').should('be.disabled')
    })
  })
  context('Footer', ()=>{
    it('Validate footer locators', () => {
      cy.get('[data-testid="footer"]').should('be.visible').contains('Copyright 2024 - Talking About Testing')
      cy.get('[href="https://hotmart.com/pt-br/club/talking-about-testing"]').should('be.visible')
      cy.get('[href="https://udemy.com/user/walmyr"]').should('be.visible')
      cy.get('[href="https://talkingabouttesting.com"]').should('be.visible')
      cy.get('[href="https://talkingabouttesting.com"]').should('be.visible') 
    })

    it('Validate links', ()=> {
      cy.get('[href="https://hotmart.com/pt-br/club/talking-about-testing"]').should('have.attr', 'target', '_blank')
      cy.get('[href="https://udemy.com/user/walmyr"]').should('have.attr', 'target', '_blank')
      cy.get('[href="https://talkingabouttesting.com"]').should('have.attr', 'target', '_blank')
      cy.get('[href="https://talkingabouttesting.com"]').should('have.attr', 'target', '_blank')
    })
  })
  
})

