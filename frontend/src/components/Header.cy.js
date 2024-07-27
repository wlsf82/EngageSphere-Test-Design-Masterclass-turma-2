import Header from './Header'

describe('<Header />', () => {
  it('renders', () => {
    cy.mount(<Header />)
    cy.get('h1').should('have.text', 'EngageSphere')
    cy.get('#theme-toggle-button').should('be.visible')
  })
})