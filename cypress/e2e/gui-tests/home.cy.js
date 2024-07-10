describe('Home Page Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Renders the header with an h1 and theme toggle', () => {
        cy.get('h1').should('exist').and('have.text', 'EngageSphere');

        cy.get('.theme-toggle-container').should('exist');
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
        cy.get('select[aria-label="Pagination limit"]').select('50')
        cy.get('[data-testid="pagination"] > :nth-child(3)').should('be.disabled')

        cy.get('thead > tr > :nth-child(3)').click()
        cy.get('thead > tr > :nth-child(3)').click()
        cy.get('span[aria-label="up arrow"]').should('exist');

        cy.get('table tbody tr').should('have.length', 50);

        cy.get('table tbody tr td:nth-child(3)')
            .then(($elements) => {
                const numericValues = $elements.map((index, element) => parseFloat(element.textContent));

                for (let i = 0; i < numericValues.length - 1; i++) {
                    expect(numericValues[i]).to.be.at.most(numericValues[i + 1]);
                }
            });
    })

    it('Sorts by Number of employees in descending order', () => {
        cy.get('select[aria-label="Pagination limit"]').select('50')
        cy.get('[data-testid="pagination"] > :nth-child(3)').should('be.disabled')

        cy.get('thead > tr > :nth-child(3)').click()
        cy.get('span[aria-label="down arrow"]').should('exist');

        cy.get('table tbody tr').should('have.length', 50);

        cy.get('table tbody tr td:nth-child(3)')
            .then(($elements) => {
                const numericValues = $elements.map((index, element) => parseFloat(element.textContent));

                for (let i = 0; i < numericValues.length - 1; i++) {
                    expect(numericValues[i]).to.be.at.least(numericValues[i + 1]);
                }
            });
    })

    it('Validates sizes in a table column are in ascending order', () => {
        const sizeOrder = {
            'Small': 0,
            'Medium': 1,
            'Enterprise': 2,
            'Large Enterprise': 3,
            'Very Large Enterprise': 4
        };

        cy.get('select[aria-label="Pagination limit"]').select('50');
        cy.get('[data-testid="pagination"] > :nth-child(3)').should('be.disabled');

        cy.get('thead > tr > :nth-child(4)').click();
        cy.get('span[aria-label="up arrow"]').should('exist');

        cy.get('table tbody tr').should('have.length', 50);

        cy.get('table tbody tr td:nth-child(4)').then(($elements) => {
            const sizeValues = $elements.map((index, element) => {
                return Cypress.$(element).text().trim();
            });

            let previousSizeOrder = Number.NEGATIVE_INFINITY;

            for (let i = 0; i < sizeValues.length; i++) {
                const currentSize = sizeValues[i];
                const currentSizeOrder = sizeOrder[currentSize];

                if (currentSizeOrder >= previousSizeOrder) {
                    previousSizeOrder = currentSizeOrder;
                } else {
                    cy.wrap(false).should('be.true');
                }
            }

            cy.wrap(true).should('be.true');
        });
    });

    it('Sorts by Size in descending order by default', () => {
        const sizeOrder = {
            'Small': 0,
            'Medium': 1,
            'Enterprise': 2,
            'Large Enterprise': 3,
            'Very Large Enterprise': 4
        };

        cy.get('select[aria-label="Pagination limit"]').select('50');
        cy.get('[data-testid="pagination"] > :nth-child(3)').should('be.disabled');

        cy.get('thead > tr > :nth-child(4)').click();
        cy.get('thead > tr > :nth-child(4)').click();
        cy.get('span[aria-label="down arrow"]').should('exist');

        cy.get('table tbody tr').should('have.length', 50);

        cy.get('table tbody tr td:nth-child(4)').then(($elements) => {
            const sizeValues = $elements.map((index, element) => {
                return Cypress.$(element).text().trim();
            });

            let previousSizeOrder = Number.POSITIVE_INFINITY;

            for (let i = 0; i < sizeValues.length; i++) {
                const currentSize = sizeValues[i];
                const currentSizeOrder = sizeOrder[currentSize];

                if (currentSizeOrder <= previousSizeOrder) {
                    previousSizeOrder = currentSizeOrder;
                } else {
                    cy.wrap(false).should('be.true');
                }
            }

            cy.wrap(true).should('be.true');
        });
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