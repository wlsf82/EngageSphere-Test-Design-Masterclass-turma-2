describe('Home Page Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Renders the header with an h1 and theme toggle', () => {
        cy.get('h1').should('exist').and('have.text', 'EngageSphere');

        cy.get('.theme-toggle-container').should('be.visible');
    })

    it('Shows the default greeting (i.e., Hi there! ...)', () => {
        cy.get('[data-testid="name"]').should('have.value', '');
        cy.contains('there').should('be.visible');
    })

    it('Shows a customized greeting (e.g., Hi Joe! ...)', () => {
        cy.get('[data-testid="name"]').should('have.value', '');

        cy.get('[data-testid="name"]').type('Thay')
        cy.contains('Thay').should('be.visible');
    })

    it('Changes the theme to dark mode, ensuring it persists in the local storage', () => {
        cy.get('#theme-toggle-button').click()
        cy.get('[data-theme="dark"]').should('exist')

        cy.getAllLocalStorage()
        cy.reload()

        cy.get('[data-theme="dark"]').should('exist')
    })

    it('Changes the theme to light mode, ensuring it persists in the local storage', () => {
        cy.get('[data-theme="light"]').should('exist')

        cy.getAllLocalStorage()
        cy.reload()

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

        cy.get('table tbody tr').should('have.length', 5);

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

        cy.get('table tbody tr').should('have.length', 5);

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

        cy.get('table tbody tr').should('have.length', 5);

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

        cy.get('tbody tr').should('be.exist')
        cy.get('table tbody tr').should('not.be.empty');

    });

    it('Configures a new pagination limit (e.g., from 10 to 50), ensuring it persists in the local storage', () => {
        cy.get('table tbody tr').should('have.length', 10);

        cy.get('select[aria-label="Pagination limit"]').select('50')
        cy.get('table tbody tr').should('have.length', 50);

        cy.getAllLocalStorage()

        cy.reload()

        cy.get('table tbody tr').should('have.length', 50);
    });
})