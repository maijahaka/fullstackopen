import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const handleClick = (event) => {
    event.preventDefault()
    setViewDetails(!viewDetails)
  }

  const handleLike = (event) => {
    event.preventDefault()
    console.log('blog liked')
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
