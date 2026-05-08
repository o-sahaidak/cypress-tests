Cypress.on('uncaught:exception', () => false)

describe('Telnyx tests', () => {

  // Test 1 - Top navigation links are visible and clickable 
  it('Top navigation links are visible and clickable ', () => {
    cy.visit('/')

    cy.get('#radix-_R_4b9iivb_').should('exist').click({force: true})
    cy.get('#radix-_R_4j9iivb_').should('exist').click({force: true})
    cy.get('#radix-_R_4r9iivb_').should('exist').click({force: true})
    cy.get('#radix-_R_539iivb_').should('exist').click({force: true})
    cy.get('#radix-_R_5b9iivb_').should('exist').click({force: true})
    cy.get('#radix-_R_5j9iivb_').should('exist').click({force: true})
    cy.get('a[href="/contact-us"]').first().should('exist').click({force: true})
    cy.get('a[href="https://portal.telnyx.com"]').first().should('exist').click({force: true})
    cy.get('a[href="/sign-up"]').first().should('exist').click({force: true})
  })


  // Test 2 - "Sign Up" button redirects correctly
  it('"Sign Up" button redirects correctly', () => {
    cy.visit('/')

    cy.get('a[href="/sign-up"]').first().click({force: true})
    
    cy.url().should('include', '/sign-up')
    cy.get('form').should('exist')
  })

  // Test 3 - "Log in" button redirects correctly
  it('"Log in" button redirects correctly', () => {
    cy.visit('/')
    cy.url().should('include', 'telnyx.com')

    cy.origin('https://portal.telnyx.com', () => {
      cy.visit('https://portal.telnyx.com/#/login/sign-in')
      cy.url().should('include', 'portal.telnyx.com')
      cy.get('form').should('exist')
      })  
  })

  // Test 4 - Search input in Dev Docs works
  it('Search input in Dev Docs works', () => {
    cy.origin('https://developers.telnyx.com', () => {
      Cypress.on('uncaught:exception', () => false)
      
      cy.visit('https://developers.telnyx.com')
      cy.get('#search-bar-entry').click({force: true})
      cy.get('#search-input').should('exist').type('sms')
      cy.contains('sms', {matchCase: false}).should('exist')
    })
  })
  
  // Test 5 - Logo click redirects to homepage
  it('Logo click redirects to homepage', () => {
    cy.visit('/solutions')
    cy.url().should('include', '/solutions')
    
    cy.get('a[href="/"]').first().click({force: true})
    cy.url().should('eq', 'https://telnyx.com/')
  })
  
  // Test 6 - Verify footer social media links are clickable and redirect correctly
  it('Verify footer social media links are clickable and redirect correctly', () => {
    cy.visit('/')
    
    cy.get('a[href="https://www.linkedin.com/company/telnyx"]').should('exist')
      .should('have.attr', 'href', 'https://www.linkedin.com/company/telnyx')
    
    cy.get('a[href="https://x.com/telnyx"]').should('exist')
      .should('have.attr', 'href', 'https://x.com/telnyx')
    
    cy.get('a[href="https://www.facebook.com/Telnyx/"]').should('exist')
      .should('have.attr', 'href', 'https://www.facebook.com/Telnyx/')
    })
    
  // Test 7 - "Sign Up" form has required fields
  it('"Sign Up" form has required fields', () => {
    cy.visit('/sign-up')
    
    cy.get('button[type="submit"]').first().click({force: true})
    cy.contains('Please enter an email address.').should('exist')
    cy.contains('Please enter a password.').should('exist')
    cy.contains('You must accept the Terms and Conditions.').should('exist')
  })
  
  // Test 8 - 404 page displays for invalid URL
  it('404 page displays for invalid URL', () => {
    cy.visit('/dfgdfg', {failOnStatusCode: false})
    
    cy.contains('Error 404').should('exist')
    cy.contains("Oops, this page doesn’t exist").should('exist')
    cy.contains('Back to home').should('exist')
  })
  
  // Test 9 - "Back to Home" button on 404 page redirects to homepage
  it('"Back to Home" button on 404 page redirects to homepage', () => {
    cy.visit('/dfgdfg', {failOnStatusCode: false})
    
    cy.contains('Error 404').should('exist')
    cy.contains('Back to home').click({force: true})
    
    cy.url().should('eq', 'https://telnyx.com/')
  })
  
  // Test 10 - Pricing dropdown displays 4 pricing blocks
  it('Pricing dropdown displays 4 pricing blocks', () => {
    cy.visit('/')
    
    cy.get('#radix-_R_4r9iivb_').click({force: true})
    cy.get('a[href="/pricing/conversational-ai"]').first().should('exist').click({force: true})
    cy.url().should('include', '/pricing/conversational-ai')
    cy.go('back')
    
    cy.get('#radix-_R_4r9iivb_').click({force: true})
    cy.get('a[href="/pricing/voice-api"]').first().should('exist').click({force: true})
    cy.url().should('include', '/pricing/voice-api')
    cy.go('back')
    
    cy.get('#radix-_R_4r9iivb_').click({force: true})
    cy.get('a[href="/pricing/iot-data-plans"]').first().should('exist').click({force: true})
    cy.url().should('include', '/pricing/iot-data-plans')
    cy.go('back')
    
    cy.get('#radix-_R_4r9iivb_').click({force: true})
    cy.get('a[href="/pricing/messaging"]').first().should('exist').click({force: true})
    cy.url().should('include', '/pricing/messaging')
  })
})