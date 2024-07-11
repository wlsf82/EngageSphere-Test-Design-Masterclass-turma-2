/// <reference types="Cypress" />
import 'cypress-plugin-api'



describe('GET customers', ()=> {
    it('Success status', ()=>{
        cy.api({
            method: 'GET',
            url: 'http://localhost:3001/customers?page=1&limit=1&size=Small',
        }).should(( {status, body}) => {
            const customers = body
            expect(status).to.equal(200)
        })
    })
})
