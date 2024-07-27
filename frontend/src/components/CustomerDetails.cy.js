import CustomerDetails from './CustomerDetails';

describe('<CustomerDetails />', () => {
  context('Rendering customer details', () => {
    it('renders customer details correctly', () => {
      cy.fixture('customerWithContactAndAddress.json').then((customer) => {
        cy.mount(<CustomerDetails customer={customer} onClick={cy.stub()} />);
        cy.contains('Customer Details').should('be.visible');
        cy.contains('Company name: Acme Corp').should('be.visible');
        cy.contains('Number of employees: 100').should('be.visible');
        cy.contains('Size: Medium').should('be.visible');
      });
    });
  });

  context('Contact information', () => {
    it('renders contact info if available', () => {
      cy.fixture('customerWithContactAndAddress.json').then((customer) => {
        cy.mount(<CustomerDetails customer={customer} onClick={cy.stub()} />);
        cy.contains('Contact name: John Doe').should('be.visible');
        cy.contains('Contact email: john.doe@example.com').should('be.visible');
      });
    });

    it('renders "No contact info available" if no contact info', () => {
      cy.fixture('customerWithoutContact.json').then((customer) => {
        cy.mount(<CustomerDetails customer={customer} onClick={cy.stub()} />);
        cy.contains('No contact info available').should('be.visible');
      });
    });
  });

  context('Address information', () => {
    it('shows address when "Show address" button is clicked', () => {
      cy.fixture('customerWithContactAndAddress.json').then((customer) => {
        cy.mount(<CustomerDetails customer={customer} onClick={cy.stub()} />);
        cy.contains('Show address').click();
        cy.contains('Street: 123 Main St').should('be.visible');
        cy.contains('City: Anytown').should('be.visible');
        cy.contains('State: CA').should('be.visible');
        cy.contains('Zip code: 12345').should('be.visible');
        cy.contains('Country: USA').should('be.visible');
      });
    });

    it('renders "No address available" if no address', () => {
      cy.fixture('customerWithoutAddress.json').then((customer) => {
        cy.mount(<CustomerDetails customer={customer} onClick={cy.stub()} />);
        cy.contains('Show address').click();
        cy.contains('No address available').should('be.visible');
      });
    });

    it('hides address when "Hide address" button is clicked', () => {
      cy.fixture('customerWithContactAndAddress.json').then((customer) => {
        cy.mount(<CustomerDetails customer={customer} onClick={cy.stub()} />);
        cy.contains('Show address').click();
        cy.contains('Street: 123 Main St').should('be.visible');
        cy.contains('Hide address').click();
        cy.contains('Street: 123 Main St').should('not.exist');
      });
    });
  });
});
