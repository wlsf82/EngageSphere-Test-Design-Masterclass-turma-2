
describe('Successfully retrieves customers (e.g., checks for the 200 status code)', () => {

    it('successfully retrieves a list of customers', () => {
        cy.request('/customers?page=1&limit=50&size=All')

    })



})
