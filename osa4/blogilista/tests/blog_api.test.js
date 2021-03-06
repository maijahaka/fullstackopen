const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const blogsRouter = require('../controllers/blogs')

beforeEach(async () => {
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
        .set('Authorization', process.env.TEST_AUTHORIZATION)
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
        .set('Authorization', process.env.TEST_AUTHORIZATION)
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
        .set('Authorization', process.env.TEST_AUTHORIZATION)
        .send(newBlog)
        .expect(400)   
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog creation fails with status code 401 if token is missing', async () => {
    const newBlog = {
        title: 'blog to be added',
        author: 'blog author',
        url: 'https://www.blogger.com',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

/*
describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        const result = await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', process.env.TEST_AUTHORIZATION)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )
    })
})
*/

describe('modification of a blog', () => {
    test('succeeds if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToBeModified = blogsAtStart[0]

        const modifiedBlog = {
            title: blogToBeModified.title,
            author: blogToBeModified.author,
            url: blogToBeModified.url,
            likes: blogToBeModified.likes + 1
        }

        const result = await api
            .put(`/api/blogs/${blogToBeModified.id}`)
            .send(modifiedBlog)
            .expect(200)
        
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd[0].likes).toBe(blogToBeModified.likes + 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})