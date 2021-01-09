import React, { useState } from 'react'
const Blog = ({ blog, likeBlog, blogs, setBlogs, compareFunction }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const handleClick = (event) => {
    event.preventDefault()
    setViewDetails(!viewDetails)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const id = blog.id
    const blogObject = {
      user: blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const returnedBlog = await likeBlog(id, blogObject)
    console.log(returnedBlog)

    const likedBlog = blogs.find(blog => blog.id === id)
    likedBlog.likes = likedBlog.likes + 1
    const updatedBlogs = [...blogs]
    setBlogs(updatedBlogs)
  }

  const detailedView = () => (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
    </div>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={handleClick}>
          { viewDetails ? 'hide' : 'view' }
        </button>
      </div>
      {viewDetails ? detailedView() : ''}
    </div>
  )
}

export default Blog
