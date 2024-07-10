/// <reference types="Cypress" />

describe('Testando a aplicação EngageSphere', () => {

    // Executa antes de cada teste
    beforeEach(() => {
        // Define uma data e hora fixa para os testes passarem sempre
        const fixedDate = new Date(2024, 6, 10); 
        cy.clock(fixedDate.getTime());
        cy.visit('http://localhost:3000')
      })
  
   
    it('Testando o componente Header', () => {
      cy.get('h1').should('have.text', 'EngageSphere')
      cy.get('[data-testid="table"] > :nth-child(1)').should('have.text', 'Hi there! It is now Wed Jul 10 2024.')
    })
  
    it('Testando o componente Input', () => {
      cy.get('[data-testid="name"]').type('Joe')
      cy.get('[data-testid="table"] > :nth-child(1)').should('have.text', 'Hi Joe! It is now Wed Jul 10 2024.')
    })
  
    it('Testando o componente checkbox', () => {
      cy.get('[data-testid="filter"]').select('Small')
      cy.contains('Jacobs Co').should('be.visible')
    })
  
    it('Verifica se o arquivo CSV é baixado corretamente', () => {
      
      const fileName = 'customers.csv';
      const downloadsFolder = Cypress.config('downloadsFolder');
  
      
      cy.get('.download-csv-button').should('be.visible').click();
  
      cy.wait(2000);
  
      // Assert
      cy.readFile(`${downloadsFolder}/${fileName}`).should('exist');
    })
  
  })
  