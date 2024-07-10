describe('Display list of customers by page, page 1 to 10 - 5 custumers per page', () => {
    it('Should display all customers from the first page, page 1 of 10', () => {
      cy.request('GET', 'http://localhost:3001/customers?page=1&limit=5&size=All')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('customers');
          expect(response.body.customers).to.be.an('array');
          expect(response.body.customers).to.have.length(5);
  
          const expectedCustomers = [
            {
              id: 1,
              name: "Jacobs Co",
              employees: 99,
              contactInfo: null,
              address: {
                street: "988 Kimberly Fort Apt. 921",
                city: "Lake Tracy",
                state: "Connecticut",
                zipCode: "07115",
                country: "United States of America"
              },
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
              address: {
                street: "5099 Murray Inlet",
                city: "South Tiffany",
                state: "Kentucky",
                zipCode: "08496",
                country: "United States of America"
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
              address: {
                street: "43247 Bennett Keys Apt. 999",
                city: "New Paulside",
                state: "Connecticut",
                zipCode: "87855",
                country: "United States of America"
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
              address: {
                street: "8643 Jackson Wall",
                city: "Lake Davidstad",
                state: "Minnesota",
                zipCode: "29481",
                country: "United States of America"
              },
              size: "Enterprise"
            },
            {
              id: 5,
              name: "Runolfsson Co",
              employees: 9999,
              contactInfo: null,
              address: {
                street: "851 John Shores Suite 956",
                city: "New Mariah",
                state: "Ohio",
                zipCode: "78314",
                country: "United States of America"
              },
              size: "Enterprise"
            }
          ];
  
          expectedCustomers.forEach((customer, index) => {
            expect(response.body.customers[index]).to.deep.equal(customer);
          });
  
          expect(response.body.pageInfo).to.deep.equal({
            currentPage: "1",
            totalPages: 10,
            totalCustomers: 50
          });
        });
    });
    it('Should display all customers from the second page, page 2 of 10', () => {
      cy.request('GET', 'http://localhost:3001/customers?page=2&limit=5&size=All')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('customers');
          expect(response.body.customers).to.be.an('array');
          expect(response.body.customers).to.have.length(5);
  
          const expectedCustomers = [
            {
              id: 6,
              name: "Littel Co",
              employees: 10000,
              contactInfo: {
                name: "Selena",
                email: "Selena.Gleichner7@gmail.com"
              },
              address: {
                street: "14135 Kari Garden Suite 427",
                city: "Mooreshire",
                state: "Nevada",
                zipCode: "64043",
                country: "United States of America"
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
              address: {
                street: "70738 Mike Rue",
                city: "Whitechester",
                state: "Kentucky",
                zipCode: "57787",
                country: "United States of America"
              },
              size: "Large Enterprise"
            },
            {
              id: 8,
              name: "Lowe Co",
              employees: 50000,
              contactInfo: null,
              address: {
                street: "87908 Adkins Islands Apt. 944",
                city: "West Sarah",
                state: "Georgia",
                zipCode: "79943",
                country: "United States of America"
              },
              size: "Very Large Enterprise"
            },
            {
              id: 9,
              name: "Feeney, Stark and Gorczany",
              employees: 29290,
              contactInfo: null,
              address: {
                street: "60532 Murray Overpass",
                city: "Schuppeshire",
                state: "Ohio",
                zipCode: "51772",
                country: "United States of America"
              },
              size: "Large Enterprise"
            },
            {
              id: 10,
              name: "Lind - Barton",
              employees: 99516,
              contactInfo: null,
              address: {
                street: "677 Kulas Plaza",
                city: "Malikashire",
                state: "Florida",
                zipCode: "05259-2222",
                country: "United States of America"
              },
              size: "Very Large Enterprise"
            }
          ];
  
          expectedCustomers.forEach((customer, index) => {
            expect(response.body.customers[index]).to.deep.equal(customer);
          });
  
          expect(response.body.pageInfo).to.deep.equal({
            currentPage: "2",
            totalPages: 10,
            totalCustomers: 50
          });
        });
    });

  });