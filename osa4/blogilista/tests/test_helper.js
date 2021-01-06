const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'test blog 1',
        author: 'test author 1',
        url: 'http://www.blogger.com',
        likes: 0
    },
    {
        title: 'test blog 2',
        author: 'test author 2',
        url: 'http://www.blogger.com',
        likes: 0
    },
    {
        title: 'test blog 3',
        author: 'test author 3',
        url: 'http://www.blogger.com',
        likes: 0
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}