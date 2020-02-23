/// <reference types="Cypress" />

describe('My First Test', function() {
  it('visit shopper page', function() {
		cy.visit('https://admine2e.returnscenter.com/')
		cy.contains('Returns Center')

		cy.get('a:contains("View Full Policy")',)

		cy.get('input').get("[name='order_number']").type('1248').should('have.value', '1248')
		// cy.get('input[name="customer_email"]').get().type('y.zhang@aftership.com')
		// cy.get('#customer_email').type('y.zhang@aftership.com')
		cy.get("[name='customer_email']").type('y.zhang@aftership.com{enter}').should('have.value', 'y.zhang@aftership.com').type('{enter}')
		// cy.get('button:contains("Find Your Order")').click()

		cy.get('a:contains("Create Returns")').as('createReturnsButton')

		cy.get('@createReturnsButton').click();

		cy.contains('What would you like to return ?')
  })
})