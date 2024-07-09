
describe('Homepage GUI validations', () => {

    const today = new Date(2024, 6, 9) // July 9, 2024
    const formattedDate = today.toDateString()

    beforeEach(() => {
        cy.visit('/')
    })

    it('Homepage renders the header with an h1 and theme toggle*', () => {

        cy.get('h1').should('exist')
            .and('contain.text', 'EngageSphere')
            .and('be.visible')

        cy.get('#theme-toggle-button').should('exist')
            .and('be.visible')
    })
    it.only('Homepage shows the default greeting (i.e., Hi there! ...) *', () => {
        cy.clock(today.getTime()) // Freeze the clock to July 9, 2024

        cy.get('[data-testid="table"].table-container')
            .should('contain.text', `Hi there! It is now ${formattedDate}.Below is our customer list.Click on each of them to view their contact details.`)
    })

    it.only('Homepage shows a customized greeting (e.g., Hi Joe! ...) *', () => {
        const customerName = 'Lucas'

        cy.get('[data-testid="name"]')
            .type(customerName)

        cy.get('[data-testid="table"].table-container')
            .should('contain.text', `Hi ${customerName}! It is now ${formattedDate}.Below is our customer list.Click on each of them to view their contact details.`)
    })

})
