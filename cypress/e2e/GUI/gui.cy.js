/// <reference types="Cypress" />

describe('Testando a aplicação EngageSphere', () => {

  // Executa antes de cada teste
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  //Bloco de testes
  it('Testando o componente Header', () => {
    cy.get('h1').should('have.text', 'EngageSphere')
    cy.get('[data-testid="table"] > :nth-child(1)').should('have.text', 'Hi there! It is now Sun Jul 07 2024.')

  })

  it('Testando o componente Input', () => {
    cy.get('[data-testid="name"]').type('Joe')
    cy.get('[data-testid="table"] > :nth-child(1)').should('have.text', 'Hi there! It is now Sun Jul 07 2024.')
  })

  it('Testando o componente checkbox', () => {
    cy.get('[data-testid="filter"]').select('Small')
    cy.contains('Jacobs Co').should('be.visible')

  })    

  it('Verifica se o arquivo CSV é baixado corretamente', () => {
    // Define o nome do arquivo e o caminho do diretório de downloads
    const fileName = 'customers.csv';
    const downloadsFolder = Cypress.config('downloadsFolder');

    // Clique no botão de download
    cy.get('.download-csv-button').should('be.visible').click();

    // Espera um pouco para o download ser concluído
    cy.wait(2000);

    // Verifica se o arquivo foi baixado
    cy.readFile(`${downloadsFolder}/${fileName}`).should('exist');
  })

})
 
