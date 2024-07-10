describe('API Test - Display Customers from Page 1 of 3', () => {
    it('should display all customers from page 1 of 3', () => {
      cy.request('GET', 'http://localhost:3001/customers?page=1&limit=20&size=All')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('customers');
          expect(response.body.customers).to.be.an('array');
          expect(response.body.customers).to.have.length(20);
  
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
            },
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
            },
            {
              id: 11,
              name: "Turner and Sons",
              employees: 8430,
              contactInfo: {
                name: "Solon",
                email: "Solon.Mills15@yahoo.com"
              },
              address: {
                street: "59725 Spinka Loaf",
                city: "Windlerbury",
                state: "New Mexico",
                zipCode: "63094",
                country: "United States of America"
              },
              size: "Enterprise"
            },
            {
              id: 12,
              name: "Douglas - Mohr",
              employees: 7898,
              contactInfo: {
                name: "Derek",
                email: "Derek51@hotmail.com"
              },
              address: {
                street: "374 Camila Squares",
                city: "Colorado Springs",
                state: "West Virginia",
                zipCode: "31046-7142",
                country: "United States of America"
              },
              size: "Enterprise"
            },
            {
              id: 13,
              name: "Crooks and Sons",
              employees: 28186,
              contactInfo: {
                name: "Annamarie",
                email: "Annamarie_Stamm72@gmail.com"
              },
              address: null,
              size: "Large Enterprise"
            },
            {
              id: 14,
              name: "Harber - Cronin",
              employees: 74998,
              contactInfo: null,
              address: null,
              size: "Very Large Enterprise"
            },
            {
              id: 15,
              name: "Dicki Inc",
              employees: 93193,
              contactInfo: {
                name: "Jazmyn",
                email: "Jazmyn94@gmail.com"
              },
              address: {
                street: "5603 Simeon Rue",
                city: "West Rossiecester",
                state: "Arkansas",
                zipCode: "00265-2168",
                country: "United States of America"
              },
              size: "Very Large Enterprise"
            },
            {
              id: 16,
              name: "Emmerich - Huel",
              employees: 80,
              contactInfo: {
                name: "Jane",
                email: "Jane_Brekke@hotmail.com"
              },
              address: null,
              size: "Small"
            },
            {
              id: 17,
              name: "Kertzmann, Little and Ebert",
              employees: 637,
              contactInfo: {
                name: "Gia",
                email: "Gia_Koss@hotmail.com"
              },
              address: {
                street: "94452 Church Hill",
                city: "Thielchester",
                state: "Arkansas",
                zipCode: "66671",
                country: "United States of America"
              },
              size: "Medium"
            },
            {
              id: 18,
              name: "Blanda - Moen",
              employees: 49845,
              contactInfo: {
                name: "Willis",
                email: "Willis97@hotmail.com"
              },
              address: {
                street: "3894 Christiana Mission",
                city: "Rocky Mount",
                state: "Vermont",
                zipCode: "40920",
                country: "United States of America"
              },
              size: "Large Enterprise"
            },
            {
              id: 19,
              name: "Hammes - Bergstrom",
              employees: 1797,
              contactInfo: null,
              address: {
                street: "8579 Brooke Divide",
                city: "Cassandraburgh",
                state: "Alabama",
                zipCode: "89217",
                country: "United States of America"
              },
              size: "Enterprise"
            },
            {
              id: 20,
              name: "Kilback, Fritsch and Prohaska",
              employees: 41359,
              contactInfo: {
                name: "Adaline",
                email: "Adaline11@yahoo.com"
              },
              address: {
                street: "2998 Kurt Parks",
                city: "Blanchehaven",
                state: "Montana",
                zipCode: "13000-0039",
                country: "United States of America"
              },
              size: "Large Enterprise"
            }
          ];
  
          expectedCustomers.forEach((customer, index) => {
            expect(response.body.customers[index]).to.deep.equal(customer);
          });
  
          expect(response.body.pageInfo).to.deep.equal({
            currentPage: "1",
            totalPages: 3,
            totalCustomers: 50
          });
        });
    });
  });