
describe('GET /customers', () => {

  beforeEach(() => {
    //  cy.visit('/');
  })
  it('Successfully retrieves customers', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3001/customers?page=1&limit=10&size=All'
    }).then((response) => {
      // Check response status
      expect(response.status).to.eq(200);

      });
  });
  function testPage(page, limit, expectedCount) {
    // Define the API endpoint with dynamic page and limit
    const apiUrl = `http://localhost:3001/customers?page=${page}&limit=${limit}&size=All`;

    // Perform a GET request to the API endpoint
    cy.request(apiUrl)
      .then((response) => {
      

        // Verify the response body contains an array of customers
        expect(response.body).to.have.property('customers');
        expect(response.body.customers).to.be.an('array');

        // Verify the number of customers matches the expected count
        expect(response.body.customers.length).to.eq(expectedCount);

        // Optional: You can add more specific checks on the customer objects
        // For example, check that each customer has an ID and a name
        response.body.customers.forEach((customer) => {
          expect(customer).to.have.property('id');
          expect(customer).to.have.property('name');
        });
      });
  }

  // Test cases
  it('Check the first page with a limit of 5', () => {
    testPage(1, 5, 5);
  });

  it('Check the second page with a limit of 5', () => {
    testPage(2, 5, 5);
  });

  it('Check the first page with a larger limit of 20', () => {
    testPage(1, 20, 20);
  });

  
  it('Verify the correct pageInfo in the API response', () => {
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

  it('Should fetch customers for the first page with 20 customers per page', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3001/customers?page=1&limit=20&size=All'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('customers');
      expect(response.body.customers).to.be.an('array');
      expect(response.body.customers).to.have.lengthOf(20);
      //  expect(response.body.pageInfo).to.have.property('currentPage', 1);
      expect(response.body.pageInfo).to.have.property('totalPages', 3);
      expect(response.body.pageInfo).to.have.property('totalCustomers', 50);
    });
  });

  it('Should handle invalid page numbers gracefully', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3001/customers?page=-1&limit=10&size=All',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming the API returns 400 for invalid page numbers
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.contain('Invalid page or limit. Both must be positive numbers');
    });
  });
/*
  it('Check individual properties', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3001/customers?page=1&limit=10&size=All',
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

       // expect(customer.address).to.have.property('street').that.is.a('string');
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
  });*/
});