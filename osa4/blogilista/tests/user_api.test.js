const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const usersRouter = require('../controllers/users')

describe('when there is initially one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('user creation is not successful if username is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'aa',
            password: 'secret'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        expect(result.body.error)
            .toContain('is shorter than the minimum allowed length')
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user creation is not successful if password is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'user',
            password: 'pw'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        expect(result.body.error)
            .toContain('password should have at least 3 characters')
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user creation is not successful if username already exists in database', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            password: 'secret'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        expect(result.body.error)
            .toContain('to be unique')
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})