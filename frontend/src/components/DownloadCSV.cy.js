import DownloadCSVButton from './DownloadCSV';

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

  it('initiates CSV file download on button click', () => {
    cy.mount(<DownloadCSVButton customers={customers} />);

    cy.get('.download-csv-button').click();
    cy.readFile('cypress/downloads/customers.csv').should('contain', '"Cadê meu inseto"');
  });
});
