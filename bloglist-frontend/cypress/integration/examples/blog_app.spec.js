describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'User One',
      username: 'user1',
      password: 'pswd'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('pswd')
      cy.get('#login-button').click()

      cy.contains('User One logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'User One logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'user1', password: 'pswd' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blog1')
      cy.get('#author').type('Author1')
      cy.get('#url').type('url1.com')
      cy.get('#create-button').click()
      

      cy.get('.success')
        .should('contain', 'A new blog Blog1 by Author1 added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Blog1')
      cy.contains('Author1')
    })
  })
})