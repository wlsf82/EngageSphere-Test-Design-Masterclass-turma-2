/// <reference types="cypress" />

describe('Teste de API', () => {
  it('GET - Recupera clientes com sucesso', () => {
    cy.request('http://localhost:3001/customers')
    .should((response)=>{
      // Verifica se o status da resposta é 200
      expect(response.status).to.equal(200)

    })
  })
})