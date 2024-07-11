describe('Handles invalid requests gracefully', () => {

  it('When send negative page', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3001/customers',
      failOnStatusCode: false,
      headers: {
        accept: 'application/json'
      },
      qs: {
        page: -1,
        limit: 10,
        size: 'All'
      }
    })
      .then((response) => {
        expect(response.status).to.eq(400)
      })
  })
})
