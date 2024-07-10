// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('telaCliente', () => {
    cy.contains('button', '1').should('be.visible').click()
    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.get('input#name').should('be.disabled')
})

Cypress.Commands.add('voltarHomepage', () => {
    cy.contains('button', 'Back').click()
    cy.contains('h1', 'EngageSphere').should('be.visible')
})

Cypress.Commands.add('validarLinkFooter', () => {
    cy.contains('p', 'Copyright 2024 - Talking About Testing').should('be.visible')
    cy.contains('footer a', 'Hotmart').should('have.attr', 'href', 'https://hotmart.com/pt-br/club/talking-about-testing')
    cy.contains('footer a', 'Udemy').should('have.attr', 'href', 'https://udemy.com/user/walmyr')
    cy.contains('footer a', 'Blog').should('have.attr', 'href', 'https://talkingabouttesting.com')
    cy.contains('footer a', 'YouTube').should('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
})

Cypress.Commands.add('alteraTema', color => {
    cy.get('button#theme-toggle-button').click()

    cy.window().then((window) => {
        const theme = window.localStorage.getItem("theme")
        expect(theme).to.eq(`${color}`)
    })
})


Cypress.Commands.add('validaAcessibilidade', color =>{
    cy.get('body').should('have.attr','data-theme', `${color}`); // Ajuste conforme necessário
            
    cy.checkA11y(null, null, (violations) => {
      expect(violations).to.have.length(0);
    });
})