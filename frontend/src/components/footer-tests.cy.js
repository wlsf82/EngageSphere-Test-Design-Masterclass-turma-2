import React from 'react'
import Footer from './Footer'

describe('<Footer />', () => {
  it('Shows the footer and its links', () => {
    cy.mount(<Footer />)

    cy.contains('p', 'Copyright 2024 - Talking About Testing').should('be.visible')
  });

  it('Shows hotmart link', () => {
    cy.mount(<Footer />)

    cy.get('[href="https://hotmart.com/pt-br/club/talking-about-testing"]').each($a => {
      const message = $a.text();
      expect($a, message).to.have.attr("href").not.contain("undefined");
    })
  });

  it('Shows udemy link', () => {
    cy.mount(<Footer />)

    cy.get('[href="https://udemy.com/user/walmyr"]').each($a => {
      const message = $a.text();
      expect($a, message).to.have.attr("href").not.contain("undefined");
    })
  });

  it('Shows TAT Blog link', () => {
    cy.mount(<Footer />)

    cy.get('[href="https://talkingabouttesting.com"]').each($a => {
      const message = $a.text();
      expect($a, message).to.have.attr("href").not.contain("undefined");
    })
  });

  it('Shows youtube link', () => {
    cy.mount(<Footer />)

    cy.get('[href="https://youtube.com/@talkingabouttesting"]').each($a => {
      const message = $a.text();
      expect($a, message).to.have.attr("href").not.contain("undefined");
    })
  });
})