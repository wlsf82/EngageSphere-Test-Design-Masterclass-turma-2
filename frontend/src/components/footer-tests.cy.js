import React from 'react'
import Footer from './Footer'

describe('<Footer />', () => {
  it('Shows the footer and its links', () => {
    cy.mount(<Footer />)

    cy.contains('p', 'Copyright 2024 - Talking About Testing').should('be.visible')
  });

  it('Shows hotmart link', () => {
    cy.mount(<Footer />)

    cy.contains('a', 'Hotmart')
      .should('be.visible')
      .and('have.attr', 'href', 'https://hotmart.com/pt-br/club/talking-about-testing')
  });

  it('Shows udemy link', () => {
    cy.mount(<Footer />)

    cy.contains('a', 'Udemy')
      .should('be.visible')
      .and('have.attr', 'href', 'https://udemy.com/user/walmyr')
  })

it('Shows TAT Blog link', () => {
  cy.mount(<Footer />)

  cy.contains('a', 'Blog')
    .should('be.visible')
    .and('have.attr', 'href', 'https://talkingabouttesting.com')
});

it('Shows youtube link', () => {
  cy.mount(<Footer />)

  cy.contains('a', 'YouTube')
    .should('be.visible')
    .and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
})
});
