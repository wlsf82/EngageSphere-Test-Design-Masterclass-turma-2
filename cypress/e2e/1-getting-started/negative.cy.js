describe('API Pagination Tests', () => {
    const baseUrl = 'http://localhost:3001/customers?';
  
    it('should fetch customers for the first page with 20 customers per page', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}?page=1&limit=20&size=All`
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('customers');
        expect(response.body.customers).to.be.an('array');
        expect(response.body.customers).to.have.lengthOf(20);
        expect(response.body.pageInfo).to.have.property('currentPage', 1);
        expect(response.body.pageInfo).to.have.property('totalPages', 3);
        expect(response.body.pageInfo).to.have.property('totalCustomers', 50);
      });
    });
  
    it('should handle invalid page numbers gracefully', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}page=-1&limit=5&size=All`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400); // Assuming the API returns 400 for invalid page numbers
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.contain('Invalid page or limit. Both must be positive numbers');
      });
    });
  });