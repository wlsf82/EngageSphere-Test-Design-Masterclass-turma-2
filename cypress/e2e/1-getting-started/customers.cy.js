describe('API Test for Customers', () => {
    it('Should get the correct customers without checking the address', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3001/customers?page=1&limit=10&size=All'
      }).then((response) => {
        // Check response status
        expect(response.status).to.eq(200);
  
        // Check that the response has 'customers'
        expect(response.body).to.have.property('customers');
  
        const customers = response.body.customers;
  
        // Expected customers without address
        const expectedCustomers = [
          {
            id: 1,
            name: "Jacobs Co",
            employees: 99,
            contactInfo: null,
            size: "Small"
          },
          {
            id: 2,
            name: "Kilback Co",
            employees: 100,
            contactInfo: {
              name: "Daija",
              email: "Daija_Gislason93@gmail.com"
            },
            size: "Medium"
          },
          {
            id: 3,
            name: "Parisian Co",
            employees: 999,
            contactInfo: {
              name: "Alysson",
              email: "Alysson.Lang@hotmail.com"
            },
            size: "Medium"
          },
          {
            id: 4,
            name: "Wilderman Co",
            employees: 1000,
            contactInfo: {
              name: "Brando",
              email: "Brando_Kozey48@gmail.com"
            },
            size: "Enterprise"
          },
          {
            id: 5,
            name: "Runolfsson Co",
            employees: 9999,
            contactInfo: null,
            size: "Enterprise"
          },
          {
            id: 6,
            name: "Littel Co",
            employees: 10000,
            contactInfo: {
              name: "Selena",
              email: "Selena.Gleichner7@gmail.com"
            },
            size: "Large Enterprise"
          },
          {
            id: 7,
            name: "Weber Co",
            employees: 49999,
            contactInfo: {
              name: "Malika",
              email: "Malika16@hotmail.com"
            },
            size: "Large Enterprise"
          },
          {
            id: 8,
            name: "Lowe Co",
            employees: 50000,
            contactInfo: null,
            size: "Very Large Enterprise"
          },
          {
            id: 9,
            name: "Feeney, Stark and Gorczany",
            employees: 29290,
            contactInfo: null,
            size: "Large Enterprise"
          },
          {
            id: 10,
            name: "Lind - Barton",
            employees: 99516,
            contactInfo: null,
            size: "Very Large Enterprise"
          }
        ];
  
        // Check that each customer's properties (excluding address) match the expected customers
        customers.forEach((customer, index) => {
          const { id, name, employees, contactInfo, size } = expectedCustomers[index];
          expect(customer).to.include({ id, name, employees, size });
          expect(customer.contactInfo).to.deep.equal(contactInfo);
        });
      });
    });
  });