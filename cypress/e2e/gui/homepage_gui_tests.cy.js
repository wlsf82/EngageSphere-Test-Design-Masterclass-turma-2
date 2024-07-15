
describe('EngageSphere', () => {

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

        cy.contains('p', `Hi there! It is now ${formattedDate}.`)
            .should('be.visible')
    })

    it('Homepage shows a customized greeting (e.g., Hi Joe! ...) *', () => {
        const customerName = 'Lucas'

        cy.get('[data-testid="name"]')
            .type(customerName)

        cy.contains('p', `Hi ${customerName}! It is now ${formattedDate}.`)
            .should('be.visible')
    })
})