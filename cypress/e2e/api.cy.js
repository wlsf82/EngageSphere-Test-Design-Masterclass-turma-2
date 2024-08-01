/// <reference types="Cypress" />

import 'cypress-plugin-api'



describe('GET customers', ()=> {
    it('Success status', ()=>{
        cy.api({
            method: 'GET',
            url: `${Cypress.env('API_URL')}/customers`,
        }).should(( {status}) => {
            expect(status).to.equal(200)
        })
    })
})
