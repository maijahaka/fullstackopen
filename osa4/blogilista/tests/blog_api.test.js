const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async() => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct number of blogs is returned', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('returned blogs contain the field "id"', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'blog to be added',
        author: 'blog author',
        url: 'https://www.blogger.com',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(r => r.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('blog to be added')
})

test('if number of likes is not set it is given default value of 0', async () => {
    const newBlog = {
        title: 'blog to be added',
        author: 'blog author',
        url: 'https://www.blogger.com'
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)

    expect(response.body.likes).toBe(0)
})

test('blog with missing "title" and "url" fields is not added', async () => {
    const newBlog = {
        author: 'blog author',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)    
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        const result = await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )
    })
})

afterAll(() => {
    mongoose.connection.close()
})