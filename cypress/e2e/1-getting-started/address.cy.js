describe('API Test for Customers', () => {
  it('Should get the correct addresses for all customers in the API response', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3001/customers?page=1&limit=10&size=All'
    }).then((response) => {
      // Check response status
      expect(response.status).to.eq(200);

      // Check that the response has 'customers'
      expect(response.body).to.have.property('customers');
      
      const customers = response.body.customers;

      // Expected addresses
      const expectedAddresses = [
        {
          street: "988 Kimberly Fort Apt. 921",
          city: "Lake Tracy",
          state: "Connecticut",
          zipCode: "07115",
          country: "United States of America"
        },
        {
          street: "5099 Murray Inlet",
          city: "South Tiffany",
          state: "Kentucky",
          zipCode: "08496",
          country: "United States of America"
        },
        {
          street: "43247 Bennett Keys Apt. 999",
          city: "New Paulside",
          state: "Connecticut",
          zipCode: "87855",
          country: "United States of America"
        },
        {
          street: "8643 Jackson Wall",
          city: "Lake Davidstad",
          state: "Minnesota",
          zipCode: "29481",
          country: "United States of America"
        },
        {
          street: "851 John Shores Suite 956",
          city: "New Mariah",
          state: "Ohio",
          zipCode: "78314",
          country: "United States of America"
        },
        {
          street: "14135 Kari Garden Suite 427",
          city: "Mooreshire",
          state: "Nevada",
          zipCode: "64043",
          country: "United States of America"
        },
        {
          street: "70738 Mike Rue",
          city: "Whitechester",
          state: "Kentucky",
          zipCode: "57787",
          country: "United States of America"
        },
        {
          street: "87908 Adkins Islands Apt. 944",
          city: "West Sarah",
          state: "Georgia",
          zipCode: "79943",
          country: "United States of America"
        },
        {
          street: "60532 Murray Overpass",
          city: "Schuppeshire",
          state: "Ohio",
          zipCode: "51772",
          country: "United States of America"
        },
        {
          street: "677 Kulas Plaza",
          city: "Malikashire",
          state: "Florida",
          zipCode: "05259-2222",
          country: "United States of America"
        }
      ];

      // Check that each customer's address matches the expected addresses
      customers.forEach((customer, index) => {
        expect(customer).to.have.property('address');
        expect(customer.address).to.deep.equal(expectedAddresses[index]);
      });
    });
  });
});