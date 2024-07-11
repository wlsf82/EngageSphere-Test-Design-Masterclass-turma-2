describe('API /customers', () => {
  
  context('Successful Data Retrieval', () => {
    it('should retrieve the list of customers successfully with valid structure', () => {
      cy.getRequest(`${Cypress.env('API_URL')}/customers`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  context('Pagination', () => {
    it('should paginate the customer list correctly with valid parameters', () => {
      cy.getRequest(`${Cypress.env('API_URL')}/customers?page=1&limit=10`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.customers).to.have.length(10);
        expect(response.body.pageInfo.currentPage).to.eq('1');
      });
    });
  });

  context('Filtering', () => {
    it('should filter customers correctly by size with a valid size parameter', () => {
      cy.getRequest(`${Cypress.env('API_URL')}/customers?size=Large Enterprise`).then((response) => {
        expect(response.status).to.eq(200);
        response.body.customers.forEach((customer) => {
          expect(customer.size).to.eq('Large Enterprise');
        });
      });
    });
  });

  context('Invalid Requests', () => {
    it('should handle invalid request when page parameter is negative', () => {
      cy.getRequest(`${Cypress.env('API_URL')}/customers?page=-1`, false).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error');
      });
    });

    it('should handle invalid request when limit parameter is negative', () => {
      cy.getRequest(`${Cypress.env('API_URL')}/customers?limit=-10`, false).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error');
      });
    });

    it('should handle invalid request when page parameter is a string', () => {
      cy.getRequest(`${Cypress.env('API_URL')}/customers?page=abc`, false).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error');
      });
    });

    it('should handle invalid request when limit parameter is a boolean', () => {
      cy.getRequest(`${Cypress.env('API_URL')}/customers?limit=true`, false).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error');
      });
    });

    it('should handle invalid request when size parameter is unsupported', () => {
      cy.getRequest(`${Cypress.env('API_URL')}/customers?size=extra-large`, false).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error');
      });
    });
  });
});
