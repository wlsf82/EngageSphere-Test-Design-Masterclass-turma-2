/// <reference types="Cypress" />

describe('GET /customers', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
      })

    const CUSTOMERS_API = 'http://localhost:3001/'
    it('Listar Customers de uma pagina de clientes com sucesso', () => {
      cy.request(
        'GET',
        `${CUSTOMERS_API}customers?page=1&limit=10&size=All`
      ).then(({ status }) => {
        expect(status).to.eq(200)
      })
    })
    it('Validar os filtros pelos tamanhos da empresa', () => {
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
            `${CUSTOMERS_API}customers?page=1&limit=10&size=${tamanho}`
          ).then(({ body }) => {
            body.customers.forEach((customer) => {
              expect(customer.size).to.eq(tamanho)
            })
          })
        })
      })

      it('Validar filtros de paginação', () => {
        const qtPaginas = ['5', '10', '20', '50']
        const totalPages = [10, 5, 3, 1]
    
        qtPaginas.forEach((limite, indice) => {
          cy.request(
            'GET',
            `${CUSTOMERS_API}customers?page=1&limit=${limite}&size=All`
          ).then(({ body }) => {
            expect(body.customers).to.have.length(limite)
            expect(body.pageInfo.totalPages).to.eq(totalPages[indice])
          })
        })
      })

      it('Validar as propriedades customer e pagInfo da resposta', () => {
        cy.request(
          'GET',
          `${CUSTOMERS_API}customers?page=1&limit=5&size=All`
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
    
          expect(body.pageInfo).to.have.property('totalPages')
        })
      })

  })