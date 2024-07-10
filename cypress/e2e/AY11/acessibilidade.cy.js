// /// <reference types="cypress" />
// import 'cypress-axe'
// // Define at the top of the spec file or just import it
// function terminalLog(violations) {
//   cy.task(
//     'log',
//     `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'
//     } ${violations.length === 1 ? 'was' : 'were'} detected`
//   )
//   // pluck specific keys to keep the table readable
//   const violationData = violations.map(
//     ({ id, impact, description, nodes }) => ({
//       id,
//       impact,
//       description,
//       nodes: nodes.length
//     })
//   )

//   cy.task('table', violationData)
// }
// //ENTENDER COMO GERAR O RELATÓRIO NO TERMINAL

// describe('TESTE DE ACESSIBILIDADE', () => {

//   beforeEach(() => {

//     cy.injectAxe()
//   });
//   // Basic usage
//   it('VERIFICA A11Y E FINALIZA', () => {
//     // Test the page at initial load
//     cy.checkA11y()
//   })

//   // // Applying a context and run parameters
//   it('VERIFICA ACESSIBILIDADE DE UM SELETOR ESPECÍFICO', () => {
//     // Test the page at initial load (with context and options)
//     cy.checkA11y('.container', {
//       runOnly: {
//         type: 'tag',
//         values: ["wcag2a", "wcag244", "wcag412"]
//       }
//     })
//   })

//   it('ERROS CRÍTICOS', () => {
//     // Test on initial load, only report and assert for critical impact items
//     cy.checkA11y(null, {
//       includedImpacts: ['critical']
//     })
//   })

//   // EXEMPLO DE COMO AVALIAR UM COMPONENTE ESPECÍFICO
//   // it('INTERAGE COM ELEMENTO', () => {
//   //   // Interact with the page, then check for a11y issues
//   //   cy.get('.brandplace-footer-container').scrollTo('bottom', { ensureScrollable: false })
//   //   .should('be.visible')

//   //   cy.checkA11y('.brandplace-footer-container') //AQUI POR EXEMPLO, DEVO PASSAR TERMINALLOG DENTRO DE PARENTESES
//   // })

//   it('FINALIZA O TESTE MESMO QUE HAJA ERROS', () => {
//     // Do not fail the test when there are accessibility failures
//     cy.checkA11y(null, null, null, true)
//   })

//   it.only('VALIDAÇÃO TOTAL DE ACESSIBILIDADE', () => {
//     cy.pageAccessibility(); //VALIDANDO A PÁGINA TODA
//     // cy.componentAccessibility('h1'); // VALIDANDO APENAS H1
//   });

// });

