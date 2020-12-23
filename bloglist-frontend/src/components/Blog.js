import React, {useState} from 'react'

const Blog = ({ blog }) => {
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
      <p>{blog.likes}</p>
      <p>{blog.user.name}</p>
    </div>
  )

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
