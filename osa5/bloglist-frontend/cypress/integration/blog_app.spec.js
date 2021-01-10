describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Blogs')
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('input:first').type('testuser')
            cy.get('input:last').type('testpassword')
            cy.contains('login').click()

            cy.contains('Test User logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('input:first').type('testuser')
            cy.get('input:last').type('wrongpassword')
            cy.contains('login').click()

            cy.contains('wrong username or password')
        })
    })
})