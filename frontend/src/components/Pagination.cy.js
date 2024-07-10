import Pagination from './Pagination';

describe('<Pagination />', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      onClickPrev: cy.stub(),
      onClickNext: cy.stub(),
      onChange: cy.stub(),
    };
  });

  const mountPagination = (customProps) => {
    const props = { ...defaultProps, ...customProps };
    cy.mount(<Pagination {...props} />);
  };

  context('when paginating through pages', () => {
    it('displays correct page information', () => {
      mountPagination({ currentPage: 1, paginationInfo: { totalPages: 5, limit: 10 } });
      cy.contains('span', 'Page 1 of 5').should('be.visible');
    });

    it('disables Prev button on the first page', () => {
      mountPagination({ currentPage: 1, paginationInfo: { totalPages: 5, limit: 10 } });
      cy.contains('button', 'Prev').should('be.disabled');
    });

    it('disables Next button on the last page', () => {
      mountPagination({ currentPage: 5, paginationInfo: { totalPages: 5, limit: 10 } });
      cy.contains('button', 'Next').should('be.disabled');
    });

    it('disables both Prev and Next buttons when there is only one page', () => {
      mountPagination({ currentPage: 1, paginationInfo: { totalPages: 1, limit: 50 } });
      cy.contains('button', 'Next').should('be.disabled');
      cy.contains('button', 'Prev').should('be.disabled');
    });

    it('enables both Prev and Next buttons on a middle page', () => {
      mountPagination({ currentPage: 2, paginationInfo: { totalPages: 3, limit: 20 } });
      cy.contains('button', 'Next').should('not.be.disabled');
      cy.contains('button', 'Prev').should('not.be.disabled');
    });
  });
});
