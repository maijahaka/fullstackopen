import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const Notification = ({ message, notificationType }) => {
    const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    const errorMessageStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    if (message === null) {
      return null
    }
    
    return (
      <div style={notificationType === 'error' 
          ? errorMessageStyle 
          : notificationStyle}>
        {message}
      </div>
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      setNotificationType('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    setUser(null)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()

    try {
      addBlogFormRef.current.toggleVisibility()
      const blogObject = { title, author, url }
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationType('info')
      setMessage(`a new blog ${title} by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setMessage(null)
        setNotificationType(null)
      }, 5000)
    } catch (exception) {
      console.log('error: title or url missing')
      setNotificationType('error')
      setMessage('blog was not added: title or url is missing')
      setTimeout(() => {
        setMessage(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const addBlogFormRef = useRef()
  
  const addBlogForm = () => (
    <Togglable buttonLabel='new blog' ref={addBlogFormRef}>        
      <AddBlogForm
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        handleSubmit={handleBlogCreation}
      />
    </Togglable>
  )

  const loggedUserView = () => (
    <div>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout  
        </button>  
      </p>
      {addBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />  
      )}
    </div>
  )

  return (
    <div>
      <h1>blogs</h1>

      <Notification message={message} notificationType={notificationType} />
    
      {user === null 
        ? loginForm()
        : loggedUserView()
      }
    </div>
  )
}

export default App