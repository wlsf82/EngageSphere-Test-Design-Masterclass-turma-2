/// <reference types="Cypress"/>

describe('Validar Pagina inicial', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Valida se H1 esta visivel e alterna tema', () => {

        cy.contains('h1', 'EngageSphere').should('be.visible')
        cy.get('button#theme-toggle-button').click()
    })

    it('Valida mensagem de saudação', () => {

        cy.contains('p', 'Hi there! It is now').should('be.visible')

    });

    it('Valida saudação personalizada', () => {
        cy.get('input#name').type('Félix')
        cy.contains('p', 'Hi Félix! It is now').should('be.visible')

    });

    it('Muda o tema para modo escuro, garantindo que persista no armazenamento local', () => {
        cy.alteraTema('dark')
    });

    it('Muda o tema para modo claro, garantindo que persista no armazenamento local', () => {
        cy.alteraTema('dark')
        cy.alteraTema('light')
    })
    it('Valida se o campo de texto esta desabilitado ', () => {

        cy.telaCliente()

    });

    it('Valida botão de voltar para lista de clientes ', () => {

        cy.telaCliente()
        cy.voltarHomepage()

    });

    it('Valida links do footer ', () => {

        cy.validarLinkFooter()

    });

})

describe('Teste de acessibilidade', ()=> {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.injectAxe()
    })

    context('Tela inicial', ()=> {
        it('não encontra problemas de acessibilidade no modo claro', () => {
            cy.validaAcessibilidade('light')
        });
    
        it('não encontra problemas de acessibilidade no modo escuro', () => {
            cy.alteraTema('dark')
            cy.validaAcessibilidade('dark')
            
        });
    })

    context('tela de clientes', ()=>{
        beforeEach(()=>{
            cy.telaCliente()
        })
        it('não encontra problemas de acessibilidade no modo claro', () => {
            cy.validaAcessibilidade('light')
        });

        it('não encontra problemas de acessibilidade no modo escuro', () => {
            cy.alteraTema('dark')
            cy.validaAcessibilidade('dark')
        });
    })

    context('Mostrar endereço', ()=>{
        beforeEach(()=>{
            cy.telaCliente()
        })

        it('não encontra problemas de acessibilidade no modo claro', () => {
            
            cy.get('button.show-address-btn').click()
            cy.validaAcessibilidade('light')
        });

        it('não encontra problemas de acessibilidade no modo escuro', () => {
            cy.alteraTema('dark')
            cy.get('button.show-address-btn').click()
            cy.validaAcessibilidade('dark')
        });
    })
})