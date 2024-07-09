describe('Check specific properties of the API response', () => {
  it('Check individual properties', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3001/customers?page=1&limit=10&size=All'
    }).then((response) => {
      // Check response status
      expect(response.status).to.eq(200);

      // Check that the response has 'customers' and 'pageInfo'
      expect(response.body).to.have.property('customers').that.is.an('array').with.length(10);
      expect(response.body).to.have.property('pageInfo');

      // Check each customer object in the array
      response.body.customers.forEach((customer, index) => {
        expect(customer).to.have.property('id').that.is.a('number');
        expect(customer).to.have.property('name').that.is.a('string');
        expect(customer).to.have.property('employees').that.is.a('number');

        if (customer.contactInfo) {
          expect(customer.contactInfo).to.have.property('name').that.is.a('string');
          expect(customer.contactInfo).to.have.property('email').that.is.a('string');
        } else {
          expect(customer).to.have.property('contactInfo', null);
        }

        expect(customer.address).to.have.property('street').that.is.a('string');
        expect(customer.address).to.have.property('city').that.is.a('string');
        expect(customer.address).to.have.property('state').that.is.a('string');
        expect(customer.address).to.have.property('zipCode').that.is.a('string');
        expect(customer.address).to.have.property('country').that.is.a('string');

        expect(customer).to.have.property('size').that.is.a('string');
      });

      // Additional checks on the 'pageInfo' object
      expect(response.body.pageInfo).to.have.property('currentPage').that.is.a('string');
      expect(response.body.pageInfo).to.have.property('totalPages').that.is.a('number');
      expect(response.body.pageInfo).to.have.property('totalCustomers').that.is.a('number');
    });
  });
});