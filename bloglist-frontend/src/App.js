import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null) 

  const [ messageType, setMessageType ] = useState(null)
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotificationMessage = (message, messageType) => {
    setMessageType(messageType)
    setMessage(message)
    setTimeout(() => {
      setMessageType(null)
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      showNotificationMessage(`wrong username or password`, 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async (newBlog) => {  
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    showNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} messageType={messageType}/>
        <LoginForm handleSubmit={handleLogin} />
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} messageType={messageType}/>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        <Toggable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Toggable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

}

export default App