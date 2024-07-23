/// <reference types="cypress" />

//DÚVIDAS!!!
//to.be.at.greaterThan(9999).and.to.be.lessThan(50000)
//Retorna que o customer Littel  tem 10.000 funcionários e também que ele possuí menos de 50.000

describe('ENGAGE SPHERE API TESTING', () => {

    const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}`

    it('SUCCESSFULLY RETRIEVES CUSTOMERS (E.G., CHECKS FOR THE 200 STATUS CODE)', () => {
        cy.request('GET', CUSTOMERS_API_URL + '/customers')
            .then(({ body, status }) => {
                expect(status).to.be.eq(200);
                expect(body.pageInfo.totalCustomers).to.be.is.not.null;

            });
    })
    it('RETURNS THE CORRECT STRUCTURE OF THE RESPONSE OF THE FIRST PAGE OF CUSTOMERS(I.E., CUSTOMERS AND PAGEINFO PROPERTIES)', () => {
        cy.request('GET', CUSTOMERS_API_URL + '/customers?page=1')
            .then(({ body, status }) => {
                expect(status, 'Status code').to.be.eq(200);

                body.customers.forEach((customer) => {
                    expect(customer, 'Customer id').to.have.property('id').that.is.a('number');
                    expect(customer, 'Customer name').to.have.property('name').that.is.a('string');
                    expect(customer, 'Number of employees').to.have.property('employees').that.is.a('number');

                    // Verifique se contactInfo é null ou um objeto
                    if (customer.contactInfo) {
                        expect(customer.contactInfo).to.be.an('object');
                        expect(customer.contactInfo, "Name for contact").to.have.property('name')
                        expect(customer.contactInfo, 'Email for contact').to.have.property('email').to.be.eq(`${customer.contactInfo.email}`)
                    }

                    // Verifique se address é null ou um objeto
                    if (customer.address) {
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
    context('FILTER CUSTOMERS BY SIZE ON A SINGLE PAGE', () => {

        //MANEIRA CORRETA PARA VERIFICAR TODOS OS TAMANHOS EM UM ÚNICO BLOCO IT
        //SUGESTÃO DO PROFESSOR!!

        it('FILTERS CUSTOMERS BY SIZE CORRECTLY', () => {
            const sizes = ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise']
            const limitOfEmployessPerSize = [99, 999, 9999, 49999, 999999] // Assuming that there aren't companies with more than 999999 employees in the database

            sizes.forEach((size, index) => {
                cy.request('GET', CUSTOMERS_API_URL + `/customers?size=${size}`).as('getSizedCustomers')

                cy.get('@getSizedCustomers')
                    .its('body.customers')
                    .each(customer => {
                        expect(customer.size).to.eq(size)
                        expect(customer.employees).to.be.lte(limitOfEmployessPerSize[index])
                    })
            })
        })
        it('FILTER ALL CUSTOMERS', () => {
            cy.request('GET', CUSTOMERS_API_URL + '/customers?size=All')
                .then(({ status, body }) => {
                    expect(status).to.be.eq(200);
                    expect(body.pageInfo.totalCustomers).to.be.eq(50)
                    expect(body.pageInfo.totalPages).to.be.eq(5)


                });
        });

        it('FILTERS SMALL SIZE CUSTOMERS', () => {
            cy.request('GET', CUSTOMERS_API_URL + '/customers?size=Small')
                .then(({ status, body }) => {
                    expect(status).to.be.eq(200);
                    expect(body.pageInfo.totalCustomers).to.be.eq(1)
                    expect(body.pageInfo.totalPages).to.be.eq(1)
                    body.customers.forEach((customer) => {
                        expect(customer).to.have.property('size').to.be.eq('Small');
                        expect(customer.employees, `Customer ${customer.name} has ${customer.employees} employees, so the company size is ${customer.size}`)
                            .to.be.at.greaterThan(1).and.to.be.lessThan(100);


                    });

                });
        });

        it('FILTERS MEDIUM SIZE CUSTOMERS', () => {
            cy.request('GET', CUSTOMERS_API_URL + '/customers?size=Medium')
                .then(({ status, body }) => {
                    expect(status).to.be.eq(200);
                    expect(body.pageInfo.totalCustomers).to.be.eq(7)
                    expect(body.pageInfo.totalPages).to.be.eq(1)
                    body.customers.forEach((customer) => {
                        expect(customer).to.have.property('size').to.be.eq('Medium');
                        expect(customer.employees, `Customer ${customer.name} has ${customer.employees} employees, so the company size is ${customer.size}`)
                            .to.be.at.greaterThan(99).and.to.be.lessThan(1000)
                    });

                });
        });

        it('FILTERS ENTERPRISE SIZE CUSTOMERS', () => {
            cy.request('GET', CUSTOMERS_API_URL + '/customers?size=Enterprise')
                .then(({ status, body }) => {
                    expect(status).to.be.eq(200);
                    expect(body.pageInfo.totalCustomers).to.be.eq(19)
                    expect(body.pageInfo.totalPages).to.be.eq(2)
                    body.customers.forEach((customer) => {
                        expect(customer).to.have.property('size').to.be.eq('Enterprise');
                        expect(customer.employees, `Customer ${customer.name} has ${customer.employees} employees, so the company size is ${customer.size}`)
                            .to.be.at.greaterThan(999).and.to.be.lessThan(10000)
                    });


                });
        });

        it('FILTERS LARGE ENTERPRISE SIZE CUSTOMERS', () => {
            cy.request('GET', CUSTOMERS_API_URL + '/customers?size=Large%20Enterprise')
                .then(({ status, body }) => {
                    expect(status).to.be.eq(200);
                    expect(body.pageInfo.totalCustomers).to.be.eq(16)
                    expect(body.pageInfo.totalPages).to.be.eq(2)
                    body.customers.forEach((customer) => {
                        expect(customer).to.have.property('size').to.be.eq('Large Enterprise');
                        expect(customer.employees, `Customer ${customer.name} has ${customer.employees} employees, so the company size is ${customer.size}`)
                            .to.be.at.greaterThan(9999).and.to.be.lessThan(50000)
                    });


                });
        });

        it('FILTERS VERY LARGE ENTERPRISE SIZE CUSTOMERS', () => {
            cy.request('GET', CUSTOMERS_API_URL + '/customers?limit=50&size=Very%20Large%20Enterprise')
                .then(({ status, body }) => {
                    expect(status).to.be.eq(200);
                    expect(body.pageInfo.totalCustomers).to.be.eq(7)
                    expect(body.pageInfo.totalPages).to.be.eq(1)
                    body.customers.forEach((customer) => {
                        expect(customer).to.have.property('size').to.be.eq('Very Large Enterprise');
                        expect(customer.employees, `Customer ${customer.name} has ${customer.employees} employees, so the company size is ${customer.size}`)
                            .to.be.at.greaterThan(49999)
                    });
                });
        });
    })
})