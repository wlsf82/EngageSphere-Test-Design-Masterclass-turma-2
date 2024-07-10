describe('API /customers Test', () => {
    const CUSTOMERS_API = `${Cypress.env('API_URL')}/customers`

    it('Successfully retrieves customers', () => {
        cy.request('GET', CUSTOMERS_API).as('getCustomers')

        cy.get('@getCustomers').should((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Paginates the customer list correctly', () => {
        cy.request('GET', `${CUSTOMERS_API}?page=5&limit=10`).as('getCustomersFivePages')

        cy.get('@getCustomersFivePages').should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('pageInfo')

            expect(response.body.pageInfo.currentPage).to.eq('5')
            expect(response.body.pageInfo.totalPages).to.eq(5)
        })
    })

    it('Filters customers by size correctly', () => {
        cy.request('GET', `${CUSTOMERS_API}?page=1&limit=50&size=Small`).as('getSmallCustomers')

        cy.get('@getSmallCustomers').should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('customers')
            response.body.customers.forEach(customer => {
                expect(customer).to.have.property('size').and.to.eq('Small')
            })
        })
    })

    it('Returns the correct structure of the response (i.e., customers and pageInfo properties)', () => {
        cy.request('GET', CUSTOMERS_API).as('getCustomers')

        cy.get('@getCustomers').should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('customers')
            response.body.customers.forEach(customer => {
                expect(customer).to.have.property('id')
                expect(customer).to.have.property('name')
                expect(customer).to.have.property('employees')
                expect(customer).to.have.property('contactInfo')
                expect(customer).to.have.property('address')
            })

            expect(response.body).to.have.property('pageInfo')
            expect(response.body.pageInfo).to.have.property('currentPage')
            expect(response.body.pageInfo).to.have.property('totalPages')
            expect(response.body.pageInfo).to.have.property('totalCustomers')
        })
    })

    it('Handles invalid requests gracefully (e.g., negative limit)', () => {
        cy.request({
            method: 'GET',
            url: `${CUSTOMERS_API}?page=1&limit=-1&size=All`,
            failOnStatusCode: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(400)
            expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
    })

    it('Handles invalid requests gracefully (e.g., negative page )', () => {
        cy.request({
            method: 'GET',
            url: `${CUSTOMERS_API}?page=-1&limit=1&size=All`,
            failOnStatusCode: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(400)
            expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
    })

    it('Handles invalid requests gracefully (e.g., page as a string)', () => {
        cy.request({
            method: 'GET',
            url: `${CUSTOMERS_API}?page=joao&limit=1&size=All`,
            failOnStatusCode: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(400)
            expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
    })

    it('Handles invalid requests gracefully (e.g., page as a boolean)', () => {
        cy.request({
            method: 'GET',
            url: `${CUSTOMERS_API}?page=false&limit=1&size=All`,
            failOnStatusCode: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(400)
            expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
    })

    it('Handles invalid requests gracefully (e.g., unsupported size)', () => {
        cy.request({
            method: 'GET',
            url: `${CUSTOMERS_API}?page=5,4&limit=1&size=All`,
            failOnStatusCode: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(400)
            expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
    })
})