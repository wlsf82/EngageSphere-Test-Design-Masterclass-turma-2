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

  it('Shows "Page 1 of 5', () => {
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
  it('Disables button <Next> when on the last page', () => {
    const props = {
      currentPage: 5,
      paginationInfo: {
        totalPages: 5,
        limit: 10
      },
      ...defaultProps,
    }
    cy.mount(<Pagination {...props} />)

    cy.contains('button', 'Next').should('be.disabled')
  })
  it('Disables button <Prev> when on the last page', () => {
    const props = {
      currentPage: 1,
      paginationInfo: {
        totalPages: 5,
        limit: 10
      },
      ...defaultProps,
    }
    cy.mount(<Pagination {...props} />)

    cy.contains('button', 'Prev').should('be.disabled')
  })
  it('Disables buttons when only one page exists', () => {
    const props = {
      currentPage: 1,
      paginationInfo: {
        totalPages: 1,
        limit: 10
      },
      ...defaultProps,
    }
    cy.mount(<Pagination {...props} />)

    cy.contains('button', 'Next').should('be.disabled')
    cy.contains('button', 'Prev').should('be.disabled')
  })
})
