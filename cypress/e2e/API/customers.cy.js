/// <reference types="Cypress" />

describe('GET /customers', () => {
    const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}`
    it('Validar a lista de clientes com sucesso', () => {
      cy.request(
        'GET',
        `${CUSTOMERS_API_URL}customers?page=1&limit=10&size=All`
      ).then(({ status }) => {
        expect(status).to.eq(200)
      })
    })
  
    it('Validar filtro pelo tamanho da empresa', () => {
      const tamanhos = [
        'Small',
        'Medium',
        'Enterprise',
        'Large Enterprise',
        'Very Large Enterprise',
      ]
  
      tamanhos.forEach((tamanho) => {
        cy.request(
          'GET',
          `${CUSTOMERS_API_URL}customers?page=1&limit=10&size=${tamanho}`
        ).then(({ body }) => {
          body.customers.forEach((customer) => {
            expect(customer.size).to.eq(tamanho)
          })
        })
      })
    })
  
    it('Validar filtro por paginação', () => {
      const qtdePaginas = ['5', '10', '20', '50']
      const totalDePagPorLimite = [10, 5, 3, 1]
  
      qtdePaginas.forEach((limite, indice) => {
        cy.request(
          'GET',
          `${CUSTOMERS_API_URL}customers?page=1&limit=${limite}&size=All`
        ).then(({ body }) => {
          expect(body.customers).to.have.length(limite)
          expect(body.pageInfo.totalPages).to.eq(totalDePagPorLimite[indice])
        })
      })
    })
  
    it('Valider as propriedades customer e pagInfo da resposta', () => {
      cy.request(
        'GET',
        `${CUSTOMERS_API_URL}customers?page=1&limit=5&size=All`
      ).then(({ body }) => {
        expect(body).to.have.property('customers')
        expect(body).to.have.property('pageInfo')
        expect(body.customers).to.be.an('array')
        expect(body.customers.length).to.be.greaterThan(0)
  
        body.customers.forEach((customer) => {
          expect(customer).to.have.property('id')
          expect(customer).to.have.property('name')
          expect(customer).to.have.property('employees')
          expect(customer).to.have.property('size')
          expect(customer).to.have.property('address')
          expect(customer).to.have.property('contactInfo')
        })
        expect(body.pageInfo).to.have.property('currentPage')
        expect(body.pageInfo).to.have.property('totalPages')
        expect(body.pageInfo).to.have.property('totalCustomers')
      })
    })
  
    context('Validar solicitações inválidas', () => {
      it('Por filtrar página negativa', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}customers?page=-3&limit=5&size=Large%20Enterprise`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal(
            'Invalid page or limit. Both must be positive numbers.'
          )
        })
      })
  
      it('Por filtrar limite negativo', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}customers?page=1&limit=-10&size=All`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal(
            'Invalid page or limit. Both must be positive numbers.'
          )
        })
      })
  
      it('Por filtrar página como uma string', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}customers?page=one&limit=10&size=All`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal(
            'Invalid page or limit. Both must be positive numbers.'
          )
        })
      })
  
      it('Por filtrar limite como um booleano', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}customers?page=1&limit=True&size=All`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal(
            'Invalid page or limit. Both must be positive numbers.'
          )
        })
      })
  
      it('Por filtrar tamanho não suportado', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}customers?page=1&limit=5&size=Full`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal(
            'Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.'
          )
        })
      })
  
      it('Não fornecer valores obrigatórios nos campos de página, limite e tamanho', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}customers?page=&limit=&size=`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal(
            'Invalid page or limit. Both must be positive numbers.'
          )
        })
      })
  
      it('Por filtrar limite com valor igual a 0', () => {
        cy.request({
          method: 'GET',
          url: `${CUSTOMERS_API_URL}customers?page=1&limit=0&size=All`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body.error).to.equal(
            'Invalid page or limit. Both must be positive numbers.'
          )
        })
      })
    })
  })

