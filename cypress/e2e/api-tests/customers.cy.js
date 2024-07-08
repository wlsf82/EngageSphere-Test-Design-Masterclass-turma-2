describe('API /customers Test', () => {
    const CUSTOMERS_API = `${Cypress.env('API_URL')}/customers`


    it('Successfully retrieves customers', () => {
        cy.request('GET', CUSTOMERS_API).as('getCustomers')

        cy.get('@getCustomers').should((response) => {
            expect(response.status).to.eq(200)
        })
    })
})