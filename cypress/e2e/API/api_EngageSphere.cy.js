/// <reference types="cypress" />

//DÚVIDAS!!!
//to.be.at.greaterThan(9999).and.to.be.lessThan(50000)
//Retorna que o customer Littel  tem 10.000 funcionários e também que ele possuí menos de 50.000



describe('ENGAGE SPHERE API TESTING', () => {

    it('Successfully retrieves customers (e.g., checks for the 200 status code)', () => {
        cy.request('GET', 'http://localhost:3001/customers')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.pageInfo.totalCustomers).to.be.is.not.null;

            });
    })

    it('Returns the correct structure of the response of the first page of customers(i.e., customers and pageInfo properties)', () => {
        cy.request('GET', 'http://localhost:3001/customers?page=1')
            .then((response) => {
                expect(response.status, 'Status code').to.eq(200);
                expect(response.body.pageInfo.totalCustomers, 'Total customers').to.be.eq(50)
                expect(response.body.pageInfo.totalPages, 'Total pages').to.be.eq(5)
                expect(response.body.pageInfo.currentPage, 'Current page').to.be.eq("1")


                response.body.customers.forEach((customer) => {
                    expect(customer, 'Customer id').to.have.property('id').that.is.a('number');
                    expect(customer, 'Customer name').to.have.property('name').that.is.a('string');
                    expect(customer, 'Number of employees').to.have.property('employees').that.is.a('number');

                    // Verifique se contactInfo é null ou um objeto
                    if (customer.contactInfo !== null) {
                        expect(customer.contactInfo).to.be.an('object');
                        expect(customer.contactInfo, "Name for contact").to.have.property('name').to.be.eq(`${customer.contactInfo.name}`)
                        expect(customer.contactInfo, 'Email for contact').to.have.property('email').to.be.eq(`${customer.contactInfo.email}`)
                    }

                    // Verifique se address é null ou um objeto
                    if (customer.address !== null) {
                        expect(customer.address).to.be.an('object');
                        expect(customer.address, "Street").to.have.property('street').that.is.a('string');
                        expect(customer.address, 'City').to.have.property('city').that.is.a('string');
                        expect(customer.address).to.have.property('zipCode').that.is.a('string');
                        expect(customer.address).to.have.property('country').that.is.a('string');
                        expect(customer.address).to.have.property('state').that.is.a('string');
                    }

                    expect(customer, 'Company Size').to.have.property('size').that.is.a('string');
                });

            });
    })


    context('Filter customers by size on a single page', () => {
        it('Filter All customers', () => {
            cy.request('GET', 'http://localhost:3001/customers?size=All&limit=50').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.pageInfo.totalCustomers).to.be.eq(50)
                expect(response.body.pageInfo.totalPages).to.be.eq(1)


            });
        });

        it('Filters Small size customers', () => {
            cy.request('GET', 'http://localhost:3001/customers?size=Small&limit=50').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.pageInfo.totalCustomers).to.be.eq(3)
                expect(response.body.pageInfo.totalPages).to.be.eq(1)
                response.body.customers.forEach((customer) => {
                    expect(customer).to.have.property('size').to.be.eq('Small');
                    expect(customer.employees, `Customer ${customer.name} has ${customer.employees} employees, so the company size is ${customer.size}`)
                        .to.be.at.greaterThan(1).and.to.be.lessThan(100);


                });

            });
        });

        it('Filters Medium size customers', () => {
            cy.request('GET', 'http://localhost:3001/customers?size=Medium&limit=50').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.pageInfo.totalCustomers).to.be.eq(6)
                expect(response.body.pageInfo.totalPages).to.be.eq(1)
                response.body.customers.forEach((customer) => {
                    expect(customer).to.have.property('size').to.be.eq('Medium');
                    expect(customer.employees, `Customer ${customer.name} has ${customer.employees} employees, so the company size is ${customer.size}`)
                        .to.be.at.greaterThan(99).and.to.be.lessThan(1000)
                });

            });
        });

        it('Filters Enterprise size customers', () => {
            cy.request('GET', 'http://localhost:3001/customers?size=Enterprise&limit=50').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.pageInfo.totalCustomers).to.be.eq(13)
                expect(response.body.pageInfo.totalPages).to.be.eq(1)
                response.body.customers.forEach((customer) => {
                    expect(customer).to.have.property('size').to.be.eq('Enterprise');
                    expect(customer.employees, `Customer ${customer.name} has ${customer.employees} employees, so the company size is ${customer.size}`)
                        .to.be.at.greaterThan(999).and.to.be.lessThan(10000)
                });


            });
        });

        it('Filters Large Enterprise size customers', () => {
            cy.request('GET', 'http://localhost:3001/customers?size=Large%20Enterprise&limit=50').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.pageInfo.totalCustomers).to.be.eq(18)
                expect(response.body.pageInfo.totalPages).to.be.eq(1)
                response.body.customers.forEach((customer) => {
                    expect(customer).to.have.property('size').to.be.eq('Large Enterprise');
                    expect(customer.employees, `Customer ${customer.name} has ${customer.employees} employees, so the company size is ${customer.size}`)
                        .to.be.at.greaterThan(9999).and.to.be.lessThan(50000)
                });


            });
        });

        it('Filters Very Large Enterprise size customers', () => {
            cy.request('GET', 'http://localhost:3001/customers?limit=50&size=Very%20Large%20Enterprise').then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.pageInfo.totalCustomers).to.be.eq(10)
                expect(response.body.pageInfo.totalPages).to.be.eq(1)
                response.body.customers.forEach((customer) => {
                    expect(customer).to.have.property('size').to.be.eq('Very Large Enterprise');
                    expect(customer.employees, `Customer ${customer.name} has ${customer.employees} employees, so the company size is ${customer.size}`)
                        .to.be.at.greaterThan(49999)
                });
            });
        });
    })
})
