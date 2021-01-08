import React, { useState } from 'react'
const Blog = ({ blog, likeBlog }) => {
  const[likes, setLikes] = useState(blog.likes)
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
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const returnedBlog = await likeBlog(id, blogObject)
    setLikes(returnedBlog.likes)
    console.log(returnedBlog)
  }

  const detailedView = () => (
    <div>
      <div>{blog.url}</div>
      <div>
        likes {likes}
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
