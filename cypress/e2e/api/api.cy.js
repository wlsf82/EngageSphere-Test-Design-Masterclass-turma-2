/// <reference types="Cypress"/>

const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`
const message = "Invalid page or limit. Both must be positive numbers."

describe('EngageSphere Customers API', () => {
    it('Envia uma solicitação GET e retorna sucesso status code 200', () => {
        cy.api({
            url: `${CUSTOMERS_API_URL}`,
            method: 'GET'
        }).should(({status}) => {
            expect(status).to.eq(200)
        })
    })

    it('Pagina a lista de clientes corretamente', () => {
        cy.api({
            url:`${CUSTOMERS_API_URL}?page=1`,
            method: 'GET'
        }).should(({body, status}) => {
            const { pageInfo } = body
            expect(status).to.eq(200)
            expect(pageInfo).to.have.property('currentPage', '1')
        })
    });

    it('Filtra clientes por tamanho corretamente', () => {
        cy.api({
            url:`${CUSTOMERS_API_URL}?size=Medium`,
            method: 'GET'
        }).then(({body, status}) => {
            expect(status).to.eq(200)
            body.customers.forEach(customer => {
                expect(customer.size).to.eq('Medium')
            });
        })
    });

    it('Retorna a estrutura correta da resposta', () => {
        cy.api({
            url:`${CUSTOMERS_API_URL}?page=1&limit=1&size=All`,
            method: 'GET'
        }).then(({body, status}) => {
            expect(status).to.eq(200)
            expect(body).to.have.property('customers')
            expect(body.customers).to.be.an('array')

            // Validar o primeiro customer no array
            const customer = body.customers[0];
            expect(customer).to.have.property('id', 1);
            expect(customer).to.have.property('name', 'Jacobs Co');
            expect(customer).to.have.property('employees', 99);
            expect(customer).to.have.property('contactInfo', null);
            
            // Validar a estrutura do endereço
            expect(customer).to.have.property('address');
            expect(customer.address).to.have.property('street', '988 Kimberly Fort Apt. 921');
            expect(customer.address).to.have.property('city', 'Lake Tracy');
            expect(customer.address).to.have.property('state', 'Connecticut');
            expect(customer.address).to.have.property('zipCode', '07115');
            expect(customer.address).to.have.property('country', 'United States of America');

            expect(body.pageInfo).to.have.property('currentPage')
            expect(body.pageInfo).to.have.property('totalPages')
            expect(body.pageInfo).to.have.property('totalCustomers')
        })
    });

    it('Solicitação com página negativa', () => {
        cy.api({
            url:`${CUSTOMERS_API_URL}?page=-1`,
            method: 'GET',
            failOnStatusCode: false
        }).should(({body, status})=> {
            expect(status).to.eq(400)
            expect(body).to.property("error", `${message}`)
        })
    });

    it('Solicitação com limite negativa', () => {
        cy.api({
            url:`${CUSTOMERS_API_URL}?&limit=-10`,
            method: 'GET',
            failOnStatusCode: false
        }).should(({body, status})=> {
            expect(status).to.eq(400)
            expect(body).to.property("error", `${message}`)
        })
    });

    it('Solicitação com página com string', () => {
        cy.api({
            url:`${CUSTOMERS_API_URL}?page=string`,
            method: 'GET',
            failOnStatusCode: false
        }).should(({body, status})=> {
            expect(status).to.eq(400)
            expect(body).to.property("error", `${message}`)
        })
    });

    it('Solicitação com limite com booleano', () => {
        cy.api({
            url:`${CUSTOMERS_API_URL}?&limit=true`,
            method: 'GET',
            failOnStatusCode: false
        }).should(({body, status})=> {
            expect(status).to.eq(400)
            expect(body).to.property("error", `${message}`)
        })
    });

    it('Solicitação com size não suportado', () => {
        cy.api({
            url:`${CUSTOMERS_API_URL}?size=d`,
            method: 'GET',
            failOnStatusCode: false
        }).should(({body, status})=> {
            expect(status).to.eq(400)
            expect(body).to.property("error", "Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.")
        })
    });
})
