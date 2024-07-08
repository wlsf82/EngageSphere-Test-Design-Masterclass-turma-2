
describe('Successfully retrieves customers (e.g., checks for the 200 status code)', () => {

    it('successfully retrieves a list of customers', () => {
        cy.api_retrieveCustomers().then(response => {
            expect(response.status).to.equal(200)
        })

    })
})
