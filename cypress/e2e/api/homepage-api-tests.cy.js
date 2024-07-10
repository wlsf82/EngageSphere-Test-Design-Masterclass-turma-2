
describe('Successfully retrieves customers (e.g., checks for the 200 status code)', () => {

    it('successfully retrieves a list of customers*', () => {
        cy.api_retrieveCustomers()
            .then(response => {
                expect(response.status).to.eq(200)
            })

    })

    it('Paginates the customer list correctly when fetching products for page 2 with limit 10**', () => {
        cy.api_retrieveCustomers(2, 10, 'All')
            .then(response => {

                // Assert that the response contains the expected status
                expect(response.status).to.eq(200)

                // Assert that the response contains the expected structure
                expect(response.body).to.have.property('customers').that.is.an('array')
                expect(response.body).to.have.property('pageInfo').that.is.an('object')

                // Assert that the returned page info matches the expected values
                const pageInfo = response.body.pageInfo
                expect(pageInfo.currentPage).to.be.eq(1)
                expect(pageInfo).to.have.property('totalPages').to.eq(5) 
                expect(pageInfo).to.have.property('totalCustomers').to.eq(50)

                // Assert specific details about the customers array
                const customers = response.body.customers
                expect(customers).to.have.lengthOf.at.least(1) // Assuming at least one customer per page
            })
    })
})
