describe('API /customers', () => {
  const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`;

  context('Successful Data Retrieval', () => {
    it('should retrieve the list of customers successfully with valid structure', () => {
      cy.request('GET', CUSTOMERS_API_URL)
      .then(({ status, body }) => {
          expect(status).to.eq(200);
          expect(body.customers).to.be.an('array');
          expect(body.pageInfo).to.be.an('object');
      });
  });
});
  context('Pagination', () => {
    it('should paginate the customer list correctly with valid page parameter', () => {
      cy.request('GET', `${CUSTOMERS_API_URL}?page=1`)
        .then(({ status, body }) => {
          expect(status).to.eq(200);
          expect(body.customers).to.have.length(10);
          expect(body.pageInfo.currentPage).to.eq('1');
        });
    });
  });

  context('Filtering', () => {
    it('filters customers by size correctly', () => {
      const sizes = ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise'];
      const limitOfEmployessPerSize = [99, 999, 9999, 49999, 999999];

      sizes.forEach((size, index) => {
        cy.request('GET', `${CUSTOMERS_API_URL}?size=${size}`).as('getSizedCustomers');

        cy.get('@getSizedCustomers')
          .its('body.customers')
          .each(({ size: customerSize, employees }) => {
            expect(customerSize).to.eq(size);
            expect(employees).to.be.lte(limitOfEmployessPerSize[index]);
          });
      });
    });
  });

  context('Invalid Requests', () => {
    it('should handle invalid request when page parameter is negative', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?page=-1`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
        expect(body.error).to.equal('Invalid page or limit. Both must be positive numbers.');
      });
    });

    it('should handle invalid request when limit parameter is negative', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?limit=-10`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
      });
    });

    it('should handle invalid request when page parameter is a string', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?page=abc`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
      });
    });

    it('should handle invalid request when limit parameter is a boolean', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?limit=true`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
      });
    });

    it('should handle invalid request when size parameter is unsupported', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?size=extra-large`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
      });
    });

    it('should handle invalid request when page parameter is zero', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?page=0`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
        expect(body.error).to.equal('Invalid page or limit. Both must be positive numbers.');
      });
    });

    it('should handle invalid request when limit parameter is zero', () => {
      cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?limit=0`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.equal(400);
        expect(body).to.have.property('error');
        expect(body.error).to.equal('Invalid page or limit. Both must be positive numbers.');
      });
    });
  });
});
