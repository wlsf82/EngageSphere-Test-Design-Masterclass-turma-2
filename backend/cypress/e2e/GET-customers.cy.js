describe("Customer List", () => {
    const sizeList = [
        "Small",
        "Medium",
        "Enterprise",
        "Large Enterprise",
        "Very Large Enterprise",
    ];
    beforeEach(() => {
        cy.fixture("params").then((params) => {
            cy.wrap(params).as("params");
        });
    });
    it("Successfully list customers", () => {
        cy.api({
            method: "GET",
            url: "\customers",
            headers: {
                accept: "application/json",
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;

        })
    });

    it("Display customer list page", () => {
        cy.get("@params").then(({ page, limit, size }) => {
            const queryParams = JSON.stringify({ page, limit, size });

            cy.api({
                method: "GET",
                url: `/customers?page=${page}&limit=${limit}&size=${size}`,
                headers: {
                    accept: "application/json",
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.customers).to.have.length(limit);
                expect(response.body.pageInfo)
                    .to.have.property("currentPage")
                    .that.is.a("string")
                    .and.equals(String(page));
                expect(response.body.pageInfo)
                    .to.have.property("totalPages")
                    .that.is.a("number");
                expect(response.body.pageInfo)
                    .to.have.property("totalCustomers")
                    .that.is.a("number");
            });
        });
    });

    sizeList.forEach((size) => {
        it(`Filter customers by size ${size}`, () => {
            cy.api({
                method: "GET",
                url: `/customers?page=1&limit=10&size=${size}`,
                headers: {
                    accept: "application/json",
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                response.body.customers.forEach((customer) => {
                    expect(customer).to.have.property("size").that.equals(size);
                });
            });
        });
    });

    it("Should return 400 Bad Request when page parameter is negative", () => {
        cy.get("@params").then(({ limit, size }) => {
            cy.api({
                method: "GET",
                url: `/customers?page=-1&limit=${limit}&size=${size}`,
                headers: {
                    accept: "application/json",
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.error).to.include(
                    "Invalid page or limit. Both must be positive numbers."
                );
            });
        });
    });

    it("Should return 400 Bad Request when threshold parameter is negative", () => {
        cy.get("@params").then(({ page, size }) => {
            cy.api({
                method: "GET",
                url: `/customers?page=${page}&limit=-100&size=${size}`,
                headers: {
                    accept: "application/json",
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.error).to.include(
                    "Invalid page or limit. Both must be positive numbers."
                );
            });
        });
    });

    it("Should return 400 Bad Request when page parameter is string", () => {
        cy.get("@params").then(({ limit, size }) => {
            cy.api({
                method: "GET",
                url: `/customers?page=page&limit=${limit}&size=${size}`,
                headers: {
                    accept: "application/json",
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.error).to.include(
                    "Invalid page or limit. Both must be positive numbers."
                );
            });
        });
    });
    it("Should return 400 Bad Request when the limit parameter is a boolean", () => {
        cy.get("@params").then(({ page, size }) => {
            cy.api({
                method: "GET",
                url: `/customers?page=${page}&limit=true&size=${size}`,
                headers: {
                    accept: "application/json",
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body.error).to.include(
                    "Invalid page or limit. Both must be positive numbers."
                );
            });
        });
    });
});
