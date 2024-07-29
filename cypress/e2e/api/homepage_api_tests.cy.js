
describe('EngageSphere', () => {
    it('successfully retrieves a list of customers', () => {
        const queryParams = {
            page: 1,
            limit: 10,
            size: 'All'
        }
        cy.request('GET', `${Cypress.env('API_URL')}/customers?page=${queryParams.page}&limit=${queryParams.limit}&size=${queryParams.size}`)
            .then(({status}) => {
                expect(status).to.eq(200)
            })
    })

    it('Paginates the customer list correctly', () => {
        const queryParams = {
            page: 2,
            limit: 10,
            size: 'All'
        }

        cy.request('GET', `${Cypress.env('API_URL')}/customers?page=${queryParams.page}&limit=${queryParams.limit}&size=${queryParams.size}`)
            .then(({status,body}) => {
                expect(status).to.eq(200)

                // Assert that the returned page info matches the expected values
                const pageInfo = body.pageInfo
                expect(pageInfo.currentPage).to.be.eq('2')
                expect(pageInfo).to.have.property('totalPages').to.eq(5)
                expect(pageInfo).to.have.property('totalCustomers').to.eq(50)
            })
    })
})
