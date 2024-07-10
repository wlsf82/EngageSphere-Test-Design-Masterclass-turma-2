describe('Filter and Order Customers API Test', () => {
    it('should fetch customers with size = "Small" and order them', () => {
      cy.request('GET', 'http://localhost:3001/customers?page=1&limit=10&size=All')
      .then(response => {
        expect(response.status).to.eq(200);
  
        // Filter customers with size = "Small"
        const smallCustomers = response.body.customers.filter(customer => customer.size === 'Small');
  
        // Sort small customers by name
        smallCustomers.sort((a, b) => a.name.localeCompare(b.name));
  
        // Assert that all filtered customers have size = "Small"
        expect(smallCustomers.every(customer => customer.size === 'Small')).to.be.true;
  
        // Log the sorted small customers
        cy.log('Sorted Small Customers:', smallCustomers);

        // Assertions for the ordered small customers
        expect(orderedSmallCustomers).to.have.lengthOf(smallCustomers.length);
        for (let i = 0; i < orderedSmallCustomers.length - 1; i++) {
          expect(orderedSmallCustomers[i].id).to.be.lessThan(orderedSmallCustomers[i + 1].id);
        }
  
       // expect(smallCustomers.length).to.be.greaterThan(0);
      });
    });
  });