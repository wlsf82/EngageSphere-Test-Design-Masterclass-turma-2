/// <reference types="Cypress"/>
import 'cypress-axe';

describe('EngageSphere', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('Valida se H1 esta visivel e alterna tema', () => {
        cy.contains('h1', 'EngageSphere').should('be.visible')
        cy.get('#theme-toggle-button').click()
    })

    it('Valida mensagem de saudação', () => {
        const date = new Date(Date.UTC(2024, 8, 22))
        cy.clock(date)
        cy.contains('p', 'Hi there! It is now Sat Sep 21 2024').should('be.visible')
    });

    it('Valida saudação personalizada', () => {
        const date = new Date(Date.UTC(2024, 8, 22))
        cy.clock(date)
        cy.get('input#name').type('Félix')
        cy.contains('p', 'Hi Félix! It is now Sat Sep 21 2024').should('be.visible')
    
    });

    it('Muda o tema para dark e light, garantindo que persiste no armazenamento local', () => {
        cy.get('button#theme-toggle-button').click()
        cy.window().then((window) => {
            const theme = window.localStorage.getItem("theme")
            expect(theme).to.eq('dark')
        })
        cy.get('button#theme-toggle-button').click()
        cy.window().then((window) => {
            const theme = window.localStorage.getItem("theme")
            expect(theme).to.eq('light')
        })
    })

    it('Valida se o campo de texto esta desabilitado', () => {
        cy.contains('button', '1').should('be.visible').click()
        cy.contains('h2', 'Customer Details').should('be.visible')
        cy.get('input#name').should('be.disabled')
    });

    it('Valida botão de voltar para lista de clientes', () => {
        cy.contains('button', '1').should('be.visible').click()
        cy.contains('h2', 'Customer Details').should('be.visible')

        cy.contains('button', 'Back').click()
        cy.contains('h1', 'EngageSphere').should('be.visible')
    });

    it('Valida links do footer', () => {
        cy.contains('p', 'Copyright 2024 - Talking About Testing').should('be.visible') 

        cy.contains('footer a', 'Hotmart').should('have.attr', 'href', 'https://hotmart.com/pt-br/club/talking-about-testing')
        cy.contains('footer a', 'Udemy').should('have.attr', 'href', 'https://udemy.com/user/walmyr')
        cy.contains('footer a', 'Blog').should('have.attr', 'href', 'https://talkingabouttesting.com')
        cy.contains('footer a', 'YouTube').should('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
    });
})

describe('Teste de acessibilidade', ()=> {
    beforeEach(() => {
        cy.visit('')
        cy.injectAxe()
        cy.get('[data-theme="light"]').should('exist')
    })

    context('EngageSphere', ()=> {
        it('não encontra problemas de acessibilidade no modo claro', () => {
            cy.checkA11y()
        });
    
        it('não encontra problemas de acessibilidade no modo escuro', () => {
            cy.get('#theme-toggle-button').click()

            cy.get('[data-theme="dark"]').should('exist')
            cy.checkA11y()
        });
    })

    context('tela de clientes', ()=>{
        beforeEach(()=>{
            cy.contains('button', '1').should('be.visible').click()

            cy.contains('h2', 'Customer Details').should('be.visible')
        })
        
        it('não encontra problemas de acessibilidade no modo claro', () => {
            cy.checkA11y()
        });

        it('não encontra problemas de acessibilidade no modo escuro', () => {
            cy.get('#theme-toggle-button').click()
        });
    })

    context('Mostrar endereço', ()=>{
        beforeEach(()=>{
            cy.contains('button', '1').should('be.visible').click()

            cy.contains('h2', 'Customer Details').should('be.visible')
        })

        it('não encontra problemas de acessibilidade no modo claro', () => {
            cy.get('.show-address-btn').click()

            cy.checkA11y()
        });

        it('não encontra problemas de acessibilidade no modo escuro', () => {
            cy.get('#theme-toggle-button').click()

            cy.get('.show-address-btn').click()
            cy.checkA11y()
        });
    })
})