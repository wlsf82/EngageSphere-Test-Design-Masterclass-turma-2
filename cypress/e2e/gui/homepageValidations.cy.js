
describe('Homepage GUI validations', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Homepage renders the header with an h1 and theme toggle', () => {
   
        cy.get('h1').should('exist')
          .and('contain.text', 'EngageSphere')
          .and('be.visible') 
        
        cy.get('#theme-toggle-button').should('exist')
          .and('be.visible') 
    })
})
