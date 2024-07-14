
describe('EngageSphere, () => {

    // Constants used across multiple tests
    const today = new Date(2024, 6, 9) // July 9, 2024
    const formattedDate = today.toDateString()

    beforeEach(() => {
        cy.visit('/')
        cy.clock(today.getTime())
    })

    it('Homepage renders the header with an h1 and theme toggle*', () => {

        cy.contains('h1', 'EngageSphere')
            .should('be.visible')

        cy.get('#theme-toggle-button')
            .should('be.visible')
    })
    
    it('Homepage shows the default greeting (i.e., Hi there! ...) *', () => {

        cy.contains('p', 'Hi there! It is now Tue Jul 9 2024.').should('be.visible')
            .should('contain.text', `Hi there! It is now ${formattedDate}.Below is our customer list.Click on each of them to view their contact details.`)
    })

    it('Homepage shows a customized greeting (e.g., Hi Joe! ...) *', () => {
        const customerName = 'Lucas' // Constant only used in this test

        cy.get('[data-testid="name"]')
            .type(customerName)

        cy.contains('p', 'Hi Lucas! It is now Tue Jul 9 2024.')
          .should('be.visible')
            .should('contain.text', `Hi ${customerName}! It is now ${formattedDate}.Below is our customer list.Click on each of them to view their contact details.`)
    })

})