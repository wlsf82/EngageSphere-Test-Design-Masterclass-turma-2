// Import commands.js using ES2015 syntax:
import 'cypress-plugin-xhr-toggle'
import 'cypress-axe'
import './acessibilidade_commands'
Cypress.on('uncaught:exception', (err, runnable) => {
    // retornando false aqui evita que o Cypress falhe no teste
    return false;
})