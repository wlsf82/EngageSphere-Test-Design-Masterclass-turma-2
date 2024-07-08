import Pagination from './Pagination'

describe('<Pagination />', () => {
  let defaultProps

  beforeEach(() => {
    defaultProps = {
      onClickPrev: cy.stub(),
      onClickNext: cy.stub(),
      onChange: cy.stub(),
    }
  })

  it('Shows "Page 1 of "n"" (where "n" is the number of pages)', () => {
    const props = {
      currentPage: 1,
      paginationInfo: {
        totalPages: 5,
        limit: 10
      },
      ...defaultProps,
    }
    cy.mount(<Pagination {...props} />)
    cy.contains('span', 'Page 1 of 5').should('be.visible')
})
})