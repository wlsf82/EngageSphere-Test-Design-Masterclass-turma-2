import Footer from '../../src/components/Footer';

describe('<Footer />', () => {
  beforeEach(() => {
    cy.mount(<Footer />);
  });

  context('Rendering', () => {
    it('renders the footer', () => {
      cy.get('[data-testid="footer"]').should('exist');
    });

    it('contains the correct copyright text', () => {
      cy.get('[data-testid="footer"]')
        .should('contain.text', 'Copyright 2024 - Talking About Testing');
    });
  });

  context('Links', () => {
    const expectedLinks = ['Hotmart', 'Udemy', 'Blog', 'YouTube'];

    it('contains the correct number of links', () => {
      cy.get('a').should('have.length', 4);
    });

    it('has valid links', () => {
      cy.get('a').each(($link, index) => {
        expect($link.text().trim()).to.eq(expectedLinks[index]);
      });
    });
  });
});
