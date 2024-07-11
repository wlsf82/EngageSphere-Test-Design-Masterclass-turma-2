import React from 'react'
import { mount } from 'cypress/react'
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

    it('renders with a limit of 50 items per page', () => {
    const props = {
    currentPage: 1,
    paginationInfo: {
    totalPages: 10,
    limit: 50
    },
    ...defaultProps,}
    mount(<Pagination {...props} />)
    cy.get('select').should('have.value', 50)
    })
})