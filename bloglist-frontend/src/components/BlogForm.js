import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          value={title}
          type="text"
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author
        <input
          value={author}
          type="text"
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input
          value={url}
          type="text"
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm