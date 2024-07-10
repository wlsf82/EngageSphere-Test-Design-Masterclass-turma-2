describe('Customers Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Shows a list of customers when theres data in the database', () => {
        cy.get('tbody tr').should('be.exist')
        cy.get('table tbody tr').should('not.be.empty');
    })

    it('Shows the image of an empty box and the text No customers available. when there are no customers in the database', () => {
        cy.noCustomerAvailable()

        cy.get('svg[alt="image of an empty box"]').should('be.visible')
        cy.contains('span', 'No customers available.').should('be.visible')
    })

    // aguardando fix do front
    it.skip('Disables the text input field when there are no customers in the database', () => {
        cy.noCustomerAvailable()

        cy.get('[data-testid="name"]').should('be.disabled')
    })

    it('Disables the text input field when in the customer details page', () => {
        cy.get('tbody tr').first().click()

        cy.get('[data-testid="name"]').should('be.disabled')
    })

    it('Filter customers by all size', () => {
        const expectedSizes = ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise'];
        const foundSizes = [];

        cy.get('select[aria-label="Pagination limit"]').select('50');

        cy.get('table tbody tr td:nth-child(4)').each(($element) => { // eslint-disable-line
            const size = $element.text().trim();

            if (expectedSizes.includes(size) && !foundSizes.includes(size)) {
                foundSizes.push(size);
            }
        }).then(() => {
            expect(foundSizes).to.have.lengthOf(expectedSizes.length);
            expect(foundSizes).to.have.members(expectedSizes);
        });
    });


    it('Filter customers by small size', () => {
        const expectedSize = 'Small';
        let allSizesAreSmall = true;

        cy.get('[data-testid="filter"]').select('Small')
        cy.wait(3000) // eslint-disable-line

        cy.get('table tbody tr td:nth-child(4)').each(($element) => { // eslint-disable-line
            const size = $element.text().trim();

            if (size !== expectedSize) {
                allSizesAreSmall = false;
            }
        }).then(() => {
            expect(allSizesAreSmall).to.be.true;
        });
    });

    it('Filter customers by medium size', () => {
        const expectedSize = 'Medium';
        let allSizesAreMedium = true;

        cy.get('[data-testid="filter"]').select('Medium')
        cy.wait(3000) // eslint-disable-line

        cy.get('table tbody tr td:nth-child(4)').each(($element) => { // eslint-disable-line 
            const size = $element.text().trim();

            if (size !== expectedSize) {
                allSizesAreMedium = false;
            }
        }).then(() => {
            expect(allSizesAreMedium).to.be.true;
        });
    });

    it('Filter customers by enterprise size', () => {
        const expectedSize = 'Enterprise';
        let allSizesAreEnterprise = true;

        cy.get('[data-testid="filter"]').select('Enterprise')
        cy.wait(3000) // eslint-disable-line

        cy.get('table tbody tr td:nth-child(4)').each(($element) => { // eslint-disable-line
            const size = $element.text().trim();

            if (size !== expectedSize) {
                allSizesAreEnterprise = false;
            }
        }).then(() => {
            expect(allSizesAreEnterprise).to.be.true;
        });
    });

    it('Filter customers by large enterprise size', () => {
        const expectedSize = 'Large Enterprise';
        let allSizesAreLargeEnterprise = true;

        cy.get('[data-testid="filter"]').select('Large Enterprise')
        cy.wait(3000) // eslint-disable-line

        cy.get('table tbody tr td:nth-child(4)').each(($element) => { // eslint-disable-line 
            const size = $element.text().trim();

            if (size !== expectedSize) {
                allSizesAreLargeEnterprise = false;
            }
        }).then(() => {
            expect(allSizesAreLargeEnterprise).to.be.true;
        });
    });

    it('Filter customers by very large enterprise size', () => {
        const expectedSize = 'Very Large Enterprise';
        let allSizesAreVeryLargeEnterprise = true;

        cy.get('[data-testid="filter"]').select('Very Large Enterprise')
        cy.wait(3000) // eslint-disable-line

        cy.get('table tbody tr td:nth-child(4)').each(($element) => { // eslint-disable-line
            const size = $element.text().trim();
        
            if (size !== expectedSize) {
                allSizesAreVeryLargeEnterprise = false;
            }
        }).then(() => {
            cy.wrap(allSizesAreVeryLargeEnterprise).should('be.true');
        });
    });

    it('Correctly downloads a list of customers as a CSV file', () => {
        cy.readFile('cypress/downloads/customers.csv').should('not.exist')
        cy.get('.download-csv-button').click()

        cy.readFile('cypress/downloads/customers.csv').should('be.exist').then((fileContent) => {
            expect(fileContent).to.not.be.null
        });
    });

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

    it('Shows "No address available" for a customer without address information', () => {
        cy.get('[data-testid="filter"]').select('Enterprise')
        cy.get('table tbody tr').should('be.visible');
        cy.wait(3000) // eslint-disable-line

        cy.contains('td', 'Dickinson - Kutch').click()
        cy.get('.show-address-btn').click()

        cy.contains('.customer-details', 'No address available').should('be.exist')       
    });
})