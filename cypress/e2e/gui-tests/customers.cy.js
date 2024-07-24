describe('Customers Tests', () => {
  const CUSTOMERS_API = `${Cypress.env('API_URL')}/customers`

  beforeEach(() => {
    cy.visit('/')
  })

  it('Shows a list of customers when theres data in the database', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Small`,
      { fixture: 'smallCustomers' }
    ).as('getSmallCustomers')

    cy.get('[data-testid="filter"]').select('Small')

    cy.wait('@getSmallCustomers')

    cy.get('tbody tr').should('exist')
    cy.get('tbody tr').should('have.length', 5)
  })

  it('Shows the image of an empty box and the text No customers available. when there are no customers in the database', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers**`,
      { body: '' }
    ).as('getEmptyCustomers')

    cy.visit('/')
    cy.wait('@getEmptyCustomers')

    cy.get('svg[alt="image of an empty box"]').should('be.visible')
    cy.contains('span', 'No customers available.').should('be.visible')
  })


  it('Disables the text input field when there are no customers in the database', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers**`,
      { body: '' }
    ).as('getEmptyCustomers')

    cy.visit('/')
    cy.wait('@getEmptyCustomers')

    cy.get('[data-testid="name"]').should('be.disabled')
  })

  it('Disables the text input field when in the customer details page', () => {
    cy.get('tbody tr').first().click()

    cy.get('[data-testid="name"]').should('be.disabled')
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

  it('filters by All sizes', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=All`,
      { fixture: 'allCustomers' }
    ).as('getAllCustomers')

    cy.get('[data-testid="filter"]').select('All')
    cy.wait('@getAllCustomers')

    cy.get('tbody tr').should('have.length', 10)
  })

  it('filters by Small size', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Small`,
      { fixture: 'smallCustomers' }
    ).as('getSmallCustomers')

    cy.get('[data-testid="filter"]').select('Small')

    cy.wait('@getSmallCustomers')

    cy.get('tbody tr').should('have.length', 5)
  })

  it('filters by Medium size', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Medium`,
      { fixture: 'mediumCustomers' }
    ).as('getMediumCustomers')

    cy.get('[data-testid="filter"]').select('Medium')

    cy.wait('@getMediumCustomers')

    cy.get('tbody tr').should('have.length', 5)
  })

  it('filters by Enterprise size', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Enterprise`,
      { fixture: 'enterpriseCustomers' }
    ).as('getEnterpriseCustomers')

    cy.get('[data-testid="filter"]').select('Enterprise')

    cy.wait('@getEnterpriseCustomers')

    cy.get('tbody tr').should('have.length', 1)
  })

  it('filters by Large Enterprise size', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Large%20Enterprise`,
      { fixture: 'largeEnterpriseCustomers' }
    ).as('getLargeEnterpriseCustomers')

    cy.get('[data-testid="filter"]').select('Large Enterprise')

    cy.wait('@getLargeEnterpriseCustomers')

    cy.get('tbody tr').should('have.length', 3)
  })

  it('filters by Very Large Enterprise size', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Very%20Large%20Enterprise`,
      { fixture: 'veryLargeEnterpriseCustomers' }
    ).as('getVeryLargeEnterpriseCustomers')

    cy.get('[data-testid="filter"]').select('Very Large Enterprise')

    cy.wait('@getVeryLargeEnterpriseCustomers')

    cy.get('tbody tr').should('have.length', 9)
  })

  it('Correctly downloads a list of customers as a CSV file', () => {
    cy.readFile('cypress/downloads/customers.csv').should('not.exist')
    cy.get('.download-csv-button').click()

    cy.readFile('cypress/downloads/customers.csv').should('be.exist').then((fileContent) => {
      expect(fileContent).to.not.be.null
    })
  })

  it('Shows the contact info of a specific customer', () => {
    cy.get('tbody tr').should('be.exist')
    cy.get('[data-testid="filter"]').select('Small')

    cy.contains('td', 'Jacobs Co').click()

    cy.get('h2').should('exist').and('have.text', 'Customer Details');
    cy.get('.customer-details > :nth-child(2)').should('exist').and('have.text', 'Company name: Jacobs Co');
  });

  it('Shows "No contact info available" for a customer without contact information', () => {
    cy.get('[data-testid="filter"]').select('Small')
    cy.contains('td', 'Jacobs Co').click()

    cy.get('.customer-details > :nth-child(5)').should('exist').and('have.text', 'No contact info available');
  });

  it('Shows customer address', () => {
    cy.get('[data-testid="filter"]').select('Small')
    cy.contains('td', 'Jacobs Co').click()

    cy.get('.show-address-btn').click()
    cy.get('h3').should('exist').and('have.text', 'Address')
  });

  it('Hides customer address', () => {
    cy.get('[data-testid="filter"]').select('Small')
    cy.get('table tbody tr').should('be.visible');
    cy.contains('td', 'Jacobs Co').click()

    cy.get('.show-address-btn').click()
    cy.get('h3').should('exist').and('have.text', 'Address')
    cy.get('.show-address-btn').should('not.exist')

    cy.get('.hide-address-btn').click()
    cy.get('.show-address-btn').should('be.exist')
  });
})