
describe('Successfully retrieves customers (e.g., checks for the 200 status code)', () => {

    it('successfully retrieves a list of customers*', () => {
        cy.api_retrieveCustomers()
            .then(response => {
                expect(response.status).to.eq(200)
            })
    })

    it.only('Paginates the customer list correctly when fetching products for page 2 with limit 10**', () => {
        const queryParams = {
            page: 2,
            limit: 10,
            size: 'All'
        }

        cy.api_retrieveCustomers(queryParams)
            .then(response => {

                expect(response.status).to.eq(200)

                // Assert that the response contains the expected structure
                expect(response.body).to.have.property('customers').that.is.an('array')
                expect(response.body).to.have.property('pageInfo').that.is.an('object')

                // Assert that the returned page info matches the expected values
                const pageInfo = response.body.pageInfo
                expect(pageInfo.currentPage).to.be.eq('2')
                expect(pageInfo).to.have.property('totalPages').to.eq(5) 
                expect(pageInfo).to.have.property('totalCustomers').to.eq(50)

                // Assert specific details about the customers array
                const customers = response.body.customers
                expect(customers).to.have.lengthOf.at.least(1) // Assuming at least one customer per page
            })
    })
})
