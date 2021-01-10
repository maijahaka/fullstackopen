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

    describe('When logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3001/api/login', {
                username:'testuser', password: 'testpassword'
            }).then(response => {
                localStorage.setItem(
                    'loggedBlogAppUser', JSON.stringify(response.body)
                )
                cy.visit('http://localhost:3000')
            })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('cypress title')
            cy.get('#author').type('cypress author')
            cy.get('#url').type('cypress url')
            cy.contains('create').click()
            cy.contains('cypress title')
            cy.contains('cypress author')
        })
    })
})