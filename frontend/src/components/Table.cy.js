import Table from './Table';

describe('<Table />', () => {
  const customers = [
    { id: 1, name: 'Company A', employees: 50, size: 'Small' },
    { id: 2, name: 'Company B', employees: 200, size: 'Medium' },
  ];

  beforeEach(() => {
    cy.mount(<Table customers={customers} />);
  });

  it('renders the table with correct headers', () => {
    cy.get('th').eq(0).should('have.text', 'ID');
    cy.get('th').eq(1).should('have.text', 'Company name');
    cy.get('th').eq(2).should('contain.text', 'Number of employees');
    cy.get('th').eq(3).should('contain.text', 'Size');
  });

  context('sorting by Number of employees', () => {
    it('sorts by number of employees in descending order', () => {
      cy.get('th').contains('Number of employees').click();
      cy.get('tbody tr').eq(0).should('contain.text', '200');
      cy.get('tbody tr').eq(1).should('contain.text', '50');
    });

    it('sorts by number of employees in ascending order', () => {
      cy.get('th').contains('Number of employees').click();
      cy.get('th').contains('Number of employees').click();
      cy.get('tbody tr').eq(0).should('contain.text', '50');
      cy.get('tbody tr').eq(1).should('contain.text', '200');
    });
  });

  context('sorting by size', () => {
    it('sorts by size in ascending order', () => {
      cy.get('th').contains('Size').click();
      cy.get('tbody tr').eq(0).should('contain.text', 'Small');
      cy.get('tbody tr').eq(1).should('contain.text', 'Medium');
    });

    it('sorts by size in descending order', () => {
      cy.get('th').contains('Size').click();
      cy.get('th').contains('Size').click();
      cy.get('tbody tr').eq(0).should('contain.text', 'Medium');
      cy.get('tbody tr').eq(1).should('contain.text', 'Small');
    });
  });
});
