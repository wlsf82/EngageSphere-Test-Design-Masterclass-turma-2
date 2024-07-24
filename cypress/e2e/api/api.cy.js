/// <reference types="Cypress"/>

const API_URL = Cypress.env('API_URL')

describe('Verificar API', () => {
    it('Ao enviar uma solicitação GET', () => {
        cy.api({
            url: `${API_URL}/customers`,
            method: 'GET'
        }).should(({status}) => {
            expect(status).to.eq(200)
        })
    })

    it('Pagina a lista de clientes corretamente', () => {
        cy.api({
            url:`${API_URL}/customers?page=1`,
            method: 'GET'
        }).should(({body, status}) => {
            const { pageInfo } = body
            expect(status).to.eq(200)
            expect(pageInfo).to.have.property('currentPage', '1')
        })
    });

    it('Filtra clientes por tamanho corretamente', () => {
        cy.api({
            url:`${API_URL}/customers?size=Medium`,
            method: 'GET'
        }).then(response => {
            expect(response.status).to.eq(200)
            response.body.customers.forEach(customer => {
                expect(customer.size).to.eq('Medium')
            });
        })
    });

    it('Retorna a estrutura correta da resposta', () => {
        cy.api({
            url:`${API_URL}/customers?page=1&limit=1&size=All`,
            method: 'GET'
        }).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('customers')
            expect(response.body.pageInfo).to.have.property('currentPage')
            expect(response.body.pageInfo).to.have.property('totalPages')
            expect(response.body.pageInfo).to.have.property('totalCustomers')
        })
    });

    it('Solicitação com página negativa', () => {
        cy.api({
            url:`${API_URL}/customers?page=-1&limit=1&size=All`,
            method: 'GET',
            failOnStatusCode: false
        }).should(({body, status})=> {
            expect(status).to.eq(400)
            expect(body).to.property("error")
        })
    });

    it('Solicitação com limite negativa', () => {
        cy.api({
            url:`${API_URL}/customers?page=1&limit=-10&size=All`,
            method: 'GET',
            failOnStatusCode: false
        }).should(({body, status})=> {
            expect(status).to.eq(400)
            expect(body).to.property("error")
        })
    });

    it('Solicitação com página com string', () => {
        cy.api({
            url:`${API_URL}/customers?page=string&limit=1&size=All`,
            method: 'GET',
            failOnStatusCode: false
        }).should(({body, status})=> {
            expect(status).to.eq(400)
            expect(body).to.property("error")
        })
    });


    it('Solicitação com limite com booleano', () => {
        cy.api({
            url:`${API_URL}/customers?page=10&limit=true&size=All`,
            method: 'GET',
            failOnStatusCode: false
        }).should(({body, status})=> {
            expect(status).to.eq(400)
            expect(body).to.property("error")
        })
    });


    it('Solicitação com size não suportado', () => {
        cy.api({
            url:`${API_URL}/customers?page=10&limit=true&size=`,
            method: 'GET',
            failOnStatusCode: false
        }).should(({body, status})=> {
            expect(status).to.eq(400)
            expect(body).to.property("error")
        })
    });
})


