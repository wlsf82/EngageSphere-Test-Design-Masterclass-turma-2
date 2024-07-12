import React from 'react';
import { mount } from '@cypress/react18';
import Pagination from '../../../frontend/cypress/support/component.js';
import 'cypress-axe';  

describe('<Pagination/>', () => {
  let defaultProps

  beforeEach(() => {
    defaultProps = {
      onClickPrev: cy.stub(),
      onClickNext: cy.stub(),
      onChange: cy.stub(),
    }
  });

  it('Renderizando com limite de 50 itens por página', () => {
    const props = {
      currentPage: 1,
      paginationInfo: {
        totalPages: 10,
        limit: 50
      },
      ...defaultProps,
    }

    mount(
      <div data-cy-root>
        <Pagination {...props} />
      </div>
    );
    cy.injectAxe();
    cy.checkA11y();
    cy.get('select').should('have.value', '50');
  });
});