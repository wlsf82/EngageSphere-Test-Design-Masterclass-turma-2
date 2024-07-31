describe('Engage Sphere', () => {
  const now = new Date(2024, 6, 29)

  beforeEach(() => {
    cy.visit('/')
  })

  it('Shows a list of customers when theres data in the database', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=All`,
      { fixture: 'allSizeCustomers' }
    ).as('getAllSizeCustomers')

    cy.get('[data-testid="filter"]').select('All')

    cy.wait('@getAllSizeCustomers')


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
    cy.contains('button', 'Download CSV').click()

    cy.readFile('cypress/downloads/customers.csv').should('exist').then((fileContent) => {
      expect(fileContent).to.not.be.null
    })
  })

  it('Shows the contact info of a specific customer', () => {
    cy.get('tbody tr').should('exist')
    cy.get('[data-testid="filter"]').select('Small')

    cy.contains('td', 'Jacobs Co').click()

    cy.get('h2').should('exist').and('have.text', 'Customer Details');
    cy.contains('Company name: Jacobs Co').should('be.visible')
  });

  it('Shows "No contact info available" for a customer without contact information', () => {
    cy.get('[data-testid="filter"]').select('Small')
    cy.contains('td', 'Jacobs Co').click()

    cy.contains('No contact info available').should('be.visible')
  });

  it('Shows customer address', () => {
    cy.get('[data-testid="filter"]').select('Small')
    cy.contains('td', 'Jacobs Co').click()

    cy.get('.show-address-btn').click()
    cy.contains('h3', 'Address').should('be.visible')
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

  it('Renders the header with an h1 and theme toggle', () => {
    cy.contains('h1', 'EngageSphere').should('be.visible');
    cy.get('.theme-toggle-container').should('be.visible');
  })

  it('Shows the default greeting (i.e., Hi there! ...)', () => {
    cy.clock(now)
    cy.get('[data-testid="name"]').should('have.value', '');
    cy.contains('Hi there! It is now Mon Jul 29 2024').should('be.visible');
  })

  it('Shows a customized greeting (e.g., Hi Joe! ...)', () => {
    cy.clock(now)
    cy.get('[data-testid="name"]').should('have.value', '');

    cy.get('[data-testid="name"]').type('Thay')
    cy.contains('Hi Thay! It is now Mon Jul 29 2024').should('be.visible');
  })

  it('Changes the theme to dark mode, ensuring it persists in the local storage', () => {
    cy.get('#theme-toggle-button').click()
    cy.get('[data-theme="dark"]').should('exist')

    cy.getAllLocalStorage()
      .then((result) => {
        const pageTheme = result[Cypress.config('baseUrl')].theme
        expect(pageTheme).to.equal('dark')
      })
    cy.reload()

    cy.get('[data-theme="dark"]').should('exist')

    cy.get('#theme-toggle-button').click()

    cy.get('[data-theme="light"]').should('exist')
  })

  it('Sorts by Number of employees in ascending order', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Small`,
      { fixture: 'smallCustomers' }
    ).as('getSmallCustomers')

    cy.get('[data-testid="filter"]').select('Small')

    cy.wait('@getSmallCustomers')

    cy.get('tr:contains(Number of employees)').children().eq(2).click()
    cy.get('tr:contains(Number of employees)').children().eq(2).click()

    cy.get('tr:contains(32)')
      .find('td:contains(57)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(22)')
      .find('td:contains(68)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(38)')
      .find('td:contains(70)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(35)')
      .find('td:contains(71)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(1)')
      .find('td:contains(99)')
      .parent()
      .children()
      .first()
  })

  it('Sorts by Number of employees in descending order', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=Small`,
      { fixture: 'smallCustomers' }
    ).as('getSmallCustomers')

    cy.get('[data-testid="filter"]').select('Small')

    cy.wait('@getSmallCustomers')

    cy.get('tr:contains(Number of employees)').children().eq(2).click()

    cy.get('table tbody tr').should('have.length', 5);

    cy.get('tr:contains(1)')
      .find('td:contains(99)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(35)')
      .find('td:contains(71)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(38)')
      .find('td:contains(70)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(22)')
      .find('td:contains(68)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(32)')
      .find('td:contains(57)')
      .parent()
      .children()
      .first()
  })

  it('Validates sizes in a table column are in ascending order', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=All`,
      { fixture: 'allSizeCustomers' }
    ).as('getAllSizeCustomers')

    cy.get('[data-testid="filter"]').select('All')

    cy.wait('@getAllSizeCustomers')

    cy.get('tr:contains(Number of employees)').children().eq(2).click()

    cy.get('tr:contains(1)')
      .find('td:contains(Small)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(2)')
      .find('td:contains(Medium)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(4)')
      .find('td:contains(Enterprise)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(6)')
      .find('td:contains(Large Enterprise)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(8)')
      .find('td:contains(Very Large Enterprise)')
      .parent()
      .children()
      .first()
  });

  it('Sorts by Size in descending order by default', () => {
    cy.intercept(
      'GET',
      `${Cypress.env('API_URL')}/customers?page=1&limit=10&size=All`,
      { fixture: 'allSizeCustomers' }
    ).as('getAllSizeCustomers')

    cy.get('[data-testid="filter"]').select('All')

    cy.wait('@getAllSizeCustomers')

    cy.get('tr:contains(Size)').children().eq(3).click()
    cy.get('tr:contains(Size)').children().eq(3).click()

    cy.get('tr:contains(8)')
      .find('td:contains(Very Large Enterprise)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(6)')
      .find('td:contains(Large Enterprise)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(4)')
      .find('td:contains(Enterprise)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(2)')
      .find('td:contains(Medium)')
      .parent()
      .children()
      .first()

    cy.get('tr:contains(1)')
      .find('td:contains(Small)')
      .parent()
      .children()
      .first()
  });

  it('Goes back to the customers list when clicking the "Back" button', () => {
    cy.get('tbody tr').first().click()

    cy.get('tbody tr').should('not.exist')

    cy.contains('button', 'Back').click()

    cy.get('tbody tr').should('exist')
    cy.get('table tbody tr').should('not.be.empty');

  });

  it('Configures a new pagination limit (e.g., from 10 to 50), ensuring it persists in the local storage', () => {
    cy.get('select[aria-label="Pagination limit"]').select('50')
    cy.get('table tbody tr').should('have.length', 50);

    cy.getAllLocalStorage()
      .then((result) => {
        const limit = result[Cypress.config('baseUrl')].paginationLimit
        expect(limit).to.equal('50')
      })

    cy.reload()

    cy.get('table tbody tr').should('have.length', 50);
  });
})
