describe('Customers', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        `${Cypress.env('API_URL')}/customers**`,
        { fixture: 'customers' }
      ).as('getCustomers')
  
      cy.visit('/')
      cy.wait('@getCustomers')
    });
  
    context('Filtering', () => {
      it('filters by All sizes', () => {
        cy.intercept(
          'GET',
          `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Small`,
          { fixture: 'smallCustomers' }
        ).as('getSmallCustomers')
        // First, filter by a different size (e.g., Small)
        // So that when filtering by All, the `getCustomers` request happens again,
        // and the test can wait for it.
        cy.get('[data-testid="filter"]').select('Small')
        cy.wait('@getSmallCustomers')
        cy.get('[data-testid="filter"]').select('All')
        cy.wait('@getCustomers')
  
        cy.get('tbody tr').should('have.length', 5)
      })
  
      it('filters by Small size', () => {
        cy.intercept(
          'GET',
          `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Small`,
          { fixture: 'smallCustomers' }
        ).as('getSmallCustomers')
  
        cy.get('[data-testid="filter"]').select('Small')
  
        cy.wait('@getSmallCustomers')
  
        cy.get('tbody tr').should('have.length', 1)
      })
  
      it('filters by Medium size', () => {
        cy.intercept(
          'GET',
          `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Medium`,
          { fixture: 'mediumCustomers' }
        ).as('getMediumCustomers')
  
        cy.get('[data-testid="filter"]').select('Medium')
  
        cy.wait('@getMediumCustomers')
  
        cy.get('tbody tr').should('have.length', 1)
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
          { fixture: 'largeEnterpriseCustomers'}
        ).as('getLargeEnterpriseCustomers')
  
        cy.get('[data-testid="filter"]').select('Large Enterprise')
  
        cy.wait('@getLargeEnterpriseCustomers')
  
        cy.get('tbody tr').should('have.length', 1)
      })
  
      it('filters by Very Large Enterprise size', () => {
        cy.intercept(
          'GET',
          `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Very%20Large%20Enterprise`,
          { fixture: 'veryLargeEnterpriseCustomers'}
        ).as('getVeryLargeEnterpriseCustomers')
  
        cy.get('[data-testid="filter"]').select('Very Large Enterprise')
  
        cy.wait('@getVeryLargeEnterpriseCustomers')
  
        cy.get('tbody tr').should('have.length', 1)
      })
  })

    context('No Customers Available', () => {
      it('should display "No customers available." message when there are no customers in the database', () => {
        cy.intercept(
          'GET',
          `${Cypress.env('API_URL')}/customers**`,
          { body: '' }
        ).as('getEmptyCustomers');
      
        cy.visit('/');
        cy.wait('@getEmptyCustomers');
        cy.get('span').should('have.text', 'No customers available.');
      });
  
      it('Disables the text input field when there are no customers in the database', () => {
        cy.intercept(
          'GET',
          `${Cypress.env('API_URL')}/customers**`,
          { body: '' }
        ).as('getEmptyCustomers');
      
        cy.visit('/');
        cy.wait('@getEmptyCustomers');
        cy.get('[data-testid="name"]').should('be.disabled');
      });
    });
  });
  