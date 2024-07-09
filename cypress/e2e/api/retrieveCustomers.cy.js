
describe('Successfully retrieves customers (e.g., checks for the 200 status code)', () => {

    it('successfully retrieves a list of customers', () => {
        cy.api_retrieveCustomers()
            .then(response => {
            expect(response.status).to.equal(200)
        })

    })
    
    // TODO
    // it("Paginates the customer list correctly when fetching products for page 2 with limit 10", () => {
    //     cy.api_retrieveCustomers()
    //     .then(response => {
    //         expect(response.status).to.equal(200)
    //         //expect(response).to.have.property()
    //     } )
    // })
})
