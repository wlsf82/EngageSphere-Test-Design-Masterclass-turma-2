import DownloadCSVButton from '../components/DownloadCSV';

describe('<DownloadCSVButton />', () => {
  const customers = [
    {
      id: 1,
      name: "Cadê meu inseto",
      employees: 100,
      size: "Large",
      contactInfo: { name: "Gabriel Logan", email: "test@companyone.com" },
      address: { street: "123 Main St", city: "Metropolis", state: "NY", zipCode: "12345", country: "USA" }
    }
  ];

  beforeEach(() => {
    cy.mount(<DownloadCSVButton customers={customers} />);
  });

  context('Rendering', () => {
    it('renders the download button', () => {
      cy.get('.download-csv-button').should('be.visible');
    });
  });

  context('Functionality', () => {
    it('initiates CSV file download on button click', () => {
      cy.get('.download-csv-button').click();
      cy.readFile('cypress/downloads/customers.csv').should('exist');
    });
  });
});
