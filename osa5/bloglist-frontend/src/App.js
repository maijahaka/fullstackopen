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
            <div
                className="error"
                style={notificationType !== 'error'
                    ? notificationStyle
                    : errorMessageStyle}
            >
                {message}
            </div>
        )
    }

    const compareFunction = (a, b) => {
        if (a.likes < b.likes) {
            return 1
        }
        if (a.likes > b.likes) {
            return -1
        }
        return 0
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
            blogService.setToken(user.token)
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
        addBlogFormRef.current.resetForm()
    }

    const addBlog = async (blogObject) => {
        try {
            addBlogTogglableRef.current.toggleVisibility()
            const returnedBlog = await blogService.create(blogObject)
            const newBlog = { ...returnedBlog, user: user }
            setBlogs(blogs.concat(newBlog))
            setNotificationType('info')
            setMessage(
                `a new blog ${addBlogFormRef.current.title} 
                by ${addBlogFormRef.current.author} added`
            )
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

    const likeBlog = async (id, blogObject) => {
        try {
            return await blogService.put(id, blogObject)
        } catch (exception) {
            console.log('error: like was not successful')
        }
    }

    const deleteBlog = async (id) => {
        try {
            await blogService.deleteBlog(id)
        } catch (exception) {
            console.log('error: blog was not deleted successfully')
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

    const addBlogTogglableRef = useRef()
    const addBlogFormRef = useRef()

    const addBlogForm = () => (
        <Togglable buttonLabel='new blog' ref={addBlogTogglableRef}>
            <AddBlogForm createBlog={addBlog} ref={addBlogFormRef} />
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
            {blogs
                .sort(compareFunction)
                .map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        likeBlog={likeBlog}
                        deleteBlog={deleteBlog}
                        blogs={blogs}
                        setBlogs={setBlogs}
                        user={user}
                    />
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