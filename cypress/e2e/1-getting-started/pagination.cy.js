describe('API Test for pageInfo', () => {
    it('Should get the correct pageInfo in the API response', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3001/customers?page=1&limit=10&size=All'
      }).then((response) => {
        // Check response status
        expect(response.status).to.eq(200);
  
        // Check that the response has 'pageInfo'
        expect(response.body).to.have.property('pageInfo');
  
        // Check properties of 'pageInfo'
        const pageInfo = response.body.pageInfo;
        expect(pageInfo).to.have.property('currentPage', '1');
        expect(pageInfo).to.have.property('totalPages', 5);
        expect(pageInfo).to.have.property('totalCustomers', 50);
      });
    });
  });