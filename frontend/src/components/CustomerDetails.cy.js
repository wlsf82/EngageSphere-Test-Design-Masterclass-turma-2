import React from 'react'
import CustomerDetails from './CustomerDetails'

describe('<CustomerDetails />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CustomerDetails />)
  })
})