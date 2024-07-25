import React from 'react'
import ThemeToggler from './ThemeToggle'

describe('<ThemeToggler />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ThemeToggler />)
  })
})