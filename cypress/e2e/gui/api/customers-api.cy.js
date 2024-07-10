describe("API customers", () => {
  it("Recupera clientes com sucesso", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/customers",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Pagina a lista de clientes corretamente", () => {
    const page = 2;
    const limit = 10;
    cy.request({
      method: "GET",
      url: `http://localhost:3001/customers?page=${page}&limit=${limit}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.pageInfo).to.have.property("currentPage", "2");
      expect(response.body.pageInfo).to.have.property("totalPages", 5);
      expect(response.body.pageInfo).to.have.property("totalCustomers", 50);
    });
  });

  it("Filtra clientes por tamanho corretamente", () => {
    const page = 1;
    const limit = 5;
    const size = "Small";
    cy.request({
      method: "GET",
      url: `http://localhost:3001/customers?page=${page}&limit=${limit}&size=${size}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.customers.forEach((customer) => {
        expect(customer).to.have.property("size", "Small");
      });
    });
  });

  it("Retorna a estrutura correta da resposta", () => {
    const page = 1;
    const limit = 5;
    const size = "Small";
    cy.request({
      method: "GET",
      url: `http://localhost:3001/customers?page=${page}&limit=${limit}&size=${size}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.customers.forEach((customers) => {
        expect(customers).to.have.property("id");
        expect(customers).to.have.property("name");
        expect(customers).to.have.property("employees");
        expect(customers).to.have.property("contactInfo");
        expect(customers).to.have.property("address");
        if (customers.address && customers.address.street) {
          expect(customers.address).to.have.property("street");
          expect(customers.address).to.have.property("city");
          expect(customers.address).to.have.property("state");
          expect(customers.address).to.have.property("zipCode");
          expect(customers.address).to.have.property("country");
        }
        expect(customers).to.have.property("size");
        expect(response.body.pageInfo).to.have.property("currentPage");
        expect(response.body.pageInfo).to.have.property("totalPages");
        expect(response.body.pageInfo).to.have.property("totalCustomers");
      });
    });
  });
});
