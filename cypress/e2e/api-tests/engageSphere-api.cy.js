describe('API /customers', () => {
    const CUSTOMERS_API = `${Cypress.env('API_URL')}/customers`

    it('Successfully retrieves customers', () => {
        cy.request('GET', CUSTOMERS_API).as('getCustomers')

        cy.get('@getCustomers')
            .its('status')
            .should('eq', 200)
    })

    it('Paginates the customer list correctly', () => {
        cy.request('GET', `${CUSTOMERS_API}?page=5`).as('getCustomersPageFive')

        cy.get('@getCustomersPageFive').should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('pageInfo')
        })
    })

    it('Filters customers by size correctly', () => {
        cy.request('GET', `${CUSTOMERS_API}?size=Small`).as('getSmallCustomers')

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

                if (customer.contactInfo) {
                    expect(customer.contactInfo).to.have.property('name')
                    expect(customer.contactInfo).to.have.property('email')
                }

                if (customer.address) {
                    expect(customer.address).to.have.property('street')
                    expect(customer.address).to.have.property('city')
                    expect(customer.address).to.have.property('state')
                    expect(customer.address).to.have.property('zipCode')
                    expect(customer.address).to.have.property('country')
                }
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
            url: `${CUSTOMERS_API}?limit=-1`,
            failOnStatusCode: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(400)
            expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
    })

    it('Handles invalid requests gracefully (e.g., negative page )', () => {
        cy.request({
            method: 'GET',
            url: `${CUSTOMERS_API}?page=-1`,
            failOnStatusCode: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(400)
            expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
    })

    it('Handles invalid requests gracefully (e.g., limit 0 )', () => {
        cy.request({
            method: 'GET',
            url: `${CUSTOMERS_API}?limit=0`,
            failOnStatusCode: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(400)
            expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
    })

    it('Handles invalid requests gracefully (e.g., page 0 )', () => {
        cy.request({
            method: 'GET',
            url: `${CUSTOMERS_API}?page=0`,
            failOnStatusCode: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(400)
            expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
    })

    it('Handles invalid requests gracefully (e.g., page as a string)', () => {
        cy.request({
            method: 'GET',
            url: `${CUSTOMERS_API}?page=joao`,
            failOnStatusCode: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(400)
            expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
    })

    it('Handles invalid requests gracefully (e.g., page as a boolean)', () => {
        cy.request({
            method: 'GET',
            url: `${CUSTOMERS_API}?page=false`,
            failOnStatusCode: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(400)
            expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
    })

    it('Handles invalid requests gracefully (e.g., unsupported size)', () => {
        cy.request({
            method: 'GET',
            url: `${CUSTOMERS_API}?page=TEST`,
            failOnStatusCode: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(400)
            expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
    })

    it('filters customers by size correctly', () => {
        const sizes = ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise']
        const limitOfEmployessPerSize = [99, 999, 9999, 49999, 999999] // Assuming that there aren't companies with more than 999999 employess in the database
    
        sizes.forEach((size, index) => {
          cy.request('GET', `${CUSTOMERS_API}?size=${size}`).as('getSizedCustomers')
    
          cy.get('@getSizedCustomers')
            .its('body.customers')
            .each(customer => {
              expect(customer.size).to.eq(size)
              expect(customer.employees).to.be.lte(limitOfEmployessPerSize[index])
            })
        })
      })
})
