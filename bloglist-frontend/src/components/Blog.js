import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog }) => {
  const [details, setDetails] = useState(false)

  const toggleDetails = () => {
    setDetails(!details)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const getDetails = () => (
    <div>
      <p>{blog.url}</p>
      <p>{blog.likes}<button onClick={likeBlog}>like</button></p>
      <p>{blog.user.name}</p>
    </div>
  )

  const likeBlog = async () => {
    const likedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const response = await blogService.update(blog.id, likedBlog)
    updateBlog(response)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleDetails}>{details ? 'hide' : 'view'}</button>
      </div>
      {details && getDetails()}
    </div>
  )
}

export default Blog
