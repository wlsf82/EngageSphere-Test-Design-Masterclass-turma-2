describe('Customers return 200', () => {


  it('Successfully retrieves customers', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3001/customers',
      headers: {
        accept: 'application/json'
      },
      qs: {
        page: 1,
        limit: 10,
        size: 'All'
      }
    })
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })
})
