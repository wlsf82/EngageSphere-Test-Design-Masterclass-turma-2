
describe('Just testing this', () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
      });

      it('testing this thing'), () => {
        cy.api_retrieveCustomers()
            .then(response => {
                expect(response.status).to.equal(200)
            //expect(response).to.have.property()
        } )
    }
   
})
