/// <reference types="Cypress" />

describe('My First Test', function() {
  it('visit shopper page', function() {
		cy.visit('https://yzhang1205after.returnscenter.io/')
		cy.contains('We accept returns of unused and undamaged items according to our returns policy.')

		cy.get('a:contains("View Full Policy")',)

		cy.get('#order_number').type('1041')
		cy.get('#customer_email').type('jf.ke+test@aftership.com')

		cy.get('button:contains("Find Your Order")').click()

		cy.get('a:contains("Create Returns")').as('createReturnsButton')

		cy.get('@createReturnsButton').click();
  })
})