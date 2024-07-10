describe('EngageSphere Home', () => {
    const sizes = [
        'All',
        'Small',
        'Medium',
        'Enterprise',
        'Large Enterprise',
        'Very Large Enterprise'
    ];

    beforeEach(() => {
        cy.visit('/');
    });

    it('Should render the header with an h11', () => {
        cy.contains('h1', 'EngageSphere').should('be.visible');
    });

    it('Should toggle theme when toggle button is clicked', () => {
        cy.get('#theme-toggle-button').should('be.visible').click();
        cy.get('body').should('have.attr', 'data-theme', 'dark');

    });
    it('Must have all size options available in the filter and filter correctly', () => {
        cy.get('[data-testid="filter"]').find('option').then(options => {
            const currentSizes = [...options].map(option => option.value);
            expect(currentSizes).to.deep.equal(sizes);
        });

        sizes.forEach(size => {
            cy.get('[data-testid="filter"]').select(size).should('have.value', size);
            cy.get('body').then(($body) => {
                if ($body.find('.customer').length > 0) {
                    cy.get('.customer').should('have.length.greaterThan', 0).each($el => {
                        if (size !== 'All') {
                            cy.wrap($el).should('contain.text', size);
                        }
                    });
                } else {
                    cy.get('.customer').should('not.exist');
                }
            });
        });
    });
});
