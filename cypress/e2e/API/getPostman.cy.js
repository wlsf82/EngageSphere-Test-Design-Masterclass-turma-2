/// <reference types="Cypress" />


describe('Testando o endpoint /customers', () => {

    it('Deve retornar uma lista de clientes com parâmetros de paginação e filtro', () => {
      
      const url = 'http://localhost:3001/customers?page=1&limit=10&size=Small';
      
      // Fazendo a requisição GET
      cy.request({
        method: 'GET',
        url: url,
        headers: {
          'accept': 'application/json'
        }
      }).then((response) => {
      
        expect(response.status).to.eq(200);
        
        // Verificando propriedades do response
        expect(response.body).to.have.property('customers');
        expect(response.body.customers).to.be.an('array');
        expect(response.body.customers.length).to.be.at.most(10);
        
        
        // Verificando propriedades do pageInfo
        expect(response.body).to.have.property('pageInfo');     


        // Verificando schema JSON
        expect(response.body.customers[0]).to.have.property('id').that.is.a('number');
        expect(response.body.customers[0]).to.have.property('name').that.is.a('string');
        expect(response.body.customers[0]).to.have.property('employees').that.is.a('number');
        expect(response.body.customers[0]).to.have.property('size').that.is.a('string');
        expect(response.body.customers[0]).to.have.property('contactInfo');
        
       
       
      
      });
    
      });
    });

 
  