describe('API Pagination Tests', () => {
    const baseUrl = 'http://localhost:3001/customers';

    const testPage = (page, limit, expectedCustomers) => {
        it('should display customers on page ${page} with limit ${limit}', () => {
            cy.request({
                method: 'GET',
                url: `${baseUrl}?page=${page}&limit=${limit}&size=All`
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.customers).to.have.length(expectedCustomers);
                expect(response.body.pageInfo.currentPage).to.eq(page.toString());
                expect(response.body.pageInfo.totalPages).to.be.greaterThan(0);
                expect(response.body.pageInfo.totalCustomers).to.be.greaterThan(0);
            });
        });
    };

    // Test the first page
    testPage(1, 5, 5);

    // Test the second page
    testPage(2, 5, 5);

    // Test the first page with a larger limit
    testPage(1, 20, 20);

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