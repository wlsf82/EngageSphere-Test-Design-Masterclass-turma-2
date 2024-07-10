import CustomerDetails from '../../src/components/CustomerDetails';

describe('<CustomerDetails />', () => {
  const customerWithContactAndAddress = {
    name: 'Acme Corp',
    employees: 100,
    size: 'Medium',
    contactInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    }
  };

  const customerWithoutContact = {
    ...customerWithContactAndAddress,
    contactInfo: null,
  };

  const customerWithoutAddress = {
    ...customerWithContactAndAddress,
    address: null,
  };

  context('Rendering customer details', () => {
    it('renders customer details correctly', () => {
      cy.mount(<CustomerDetails customer={customerWithContactAndAddress} onClick={cy.stub()} />);
      cy.contains('Customer Details').should('be.visible');
      cy.contains('Company name: Acme Corp').should('be.visible');
      cy.contains('Number of employees: 100').should('be.visible');
      cy.contains('Size: Medium').should('be.visible');
    });
  });

  context('Contact information', () => {
    it('renders contact info if available', () => {
      cy.mount(<CustomerDetails customer={customerWithContactAndAddress} onClick={cy.stub()} />);
      cy.contains('Contact name: John Doe').should('be.visible');
      cy.contains('Contact email: john.doe@example.com').should('be.visible');
    });

    it('renders "No contact info available" if no contact info', () => {
      cy.mount(<CustomerDetails customer={customerWithoutContact} onClick={cy.stub()} />);
      cy.contains('No contact info available').should('be.visible');
    });
  });

  context('Address information', () => {
    it('shows address when "Show address" button is clicked', () => {
      cy.mount(<CustomerDetails customer={customerWithContactAndAddress} onClick={cy.stub()} />);
      cy.contains('Show address').click();
      cy.contains('Street: 123 Main St').should('be.visible');
      cy.contains('City: Anytown').should('be.visible');
      cy.contains('State: CA').should('be.visible');
      cy.contains('Zip code: 12345').should('be.visible');
      cy.contains('Country: USA').should('be.visible');
    });

    it('renders "No address available" if no address', () => {
      cy.mount(<CustomerDetails customer={customerWithoutAddress} onClick={cy.stub()} />);
      cy.contains('Show address').click();
      cy.contains('No address available').should('be.visible');
    });

    it('hides address when "Hide address" button is clicked', () => {
      cy.mount(<CustomerDetails customer={customerWithContactAndAddress} onClick={cy.stub()} />);
      cy.contains('Show address').click();
      cy.contains('Street: 123 Main St').should('be.visible');
      cy.contains('Hide address').click();
      cy.contains('Street: 123 Main St').should('not.exist');
    });
  });

  context('Interaction', () => {
    it('calls onClick when "Back" button is clicked', () => {
      const onClick = cy.stub();
      cy.mount(<CustomerDetails customer={customerWithContactAndAddress} onClick={onClick} />);
      cy.contains('Back').click();
      cy.wrap(onClick).should('have.been.called');
    });
  });
});
