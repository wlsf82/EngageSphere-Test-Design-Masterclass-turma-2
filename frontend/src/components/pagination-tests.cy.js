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

  it('Disables the Prev pagination button when on the first page', () => {
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

  it('Disables the Next pagination button when on the last page', () => {
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

  it('Disables both the Prev and Next pagination buttons when theres only one page', () => {
    const props = {
      currentPage: 1,
      paginationInfo: {
        totalPages: 1,
        limit: 50
      },
      ...defaultProps,
    }
    cy.mount(<Pagination {...props} />)
    cy.contains('button', 'Next').should('be.disabled')
    cy.contains('button', 'Prev').should('be.disabled')
  })

  it('Leaves both the Prev and Next pagination buttons enabled when on a middle page (e.g., Page 2 of 3)', () => {
    const props = {
      currentPage: 2,
      paginationInfo: {
        totalPages: 3,
        limit: 20
      },
      ...defaultProps,
    }
    cy.mount(<Pagination {...props} />)
    cy.contains('button', 'Next').should('not.be.disabled')
    cy.contains('button', 'Prev').should('not.be.disabled')
  })
})