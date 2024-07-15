
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18'

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)