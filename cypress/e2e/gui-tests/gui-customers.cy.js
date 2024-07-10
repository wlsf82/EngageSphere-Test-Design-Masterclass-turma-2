describe('Customers', () => {
    beforeEach(() => {
      cy.visit('/')
    });
  
    context('Filtering Customers', () => {
      it('filters and shows only Small customers', () => { 
        cy.get('[data-testid="filter"]').select('Small');
        cy.wait(1500);
        cy.get('[data-testid="table"] tbody tr').each(($row) => {
          cy.wrap($row).find('td').eq(3).should('contain.text', 'Small');
        });
      });
  
      it('filters and shows only Medium customers', () => { 
        cy.get('[data-testid="filter"]').select('Medium');
        cy.wait(1500);
        cy.get('[data-testid="table"] tbody tr').each(($row) => {
          cy.wrap($row).find('td').eq(3).should('contain.text', 'Medium');
        });
      });
  
      it('filters and shows only Enterprise customers', () => { 
        cy.get('[data-testid="filter"]').select('Enterprise');
        cy.wait(1500);
        cy.get('[data-testid="table"] tbody tr').each(($row) => {
          cy.wrap($row).find('td').eq(3).should('contain.text', 'Enterprise');
        });
      });
  
      it('filters and shows only Large Enterprise customers', () => { 
        cy.get('[data-testid="filter"]').select('Large Enterprise');
        cy.wait(1500);
        cy.get('[data-testid="table"] tbody tr').each(($row) => {
          cy.wrap($row).find('td').eq(3).should('contain.text', 'Large Enterprise');
        });
      });
  
      it('filters and shows only Very Large Enterprise customers', () => { 
        cy.get('[data-testid="filter"]').select('Very Large Enterprise');
        cy.wait(1500);
        cy.get('[data-testid="table"] tbody tr').each(($row) => {
          cy.wrap($row).find('td').eq(3).should('contain.text', 'Very Large Enterprise');
        });
      });
    });
  
    context('No Customers Available', () => {
      it('should display "No customers available." message when there are no customers in the database', () => {
        cy.simulateNoCustomers();
        cy.get('span').should('have.text', 'No customers available.');
      });
  
      it.skip('Disables the text input field when there are no customers in the database', () => {
        cy.simulateNoCustomers();
        cy.get('[data-testid="name"]').should('be.disabled');
      });
    });
  });
  