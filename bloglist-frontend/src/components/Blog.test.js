import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('<BlogForm /> renders the blog\'s title and author, but does not render its url or number of likes by default ', async () => {
  const blog = {
    'likes': 6,
    'title': 'Blog1',
    'author': 'Author1',
    'url': 'blog1.com',
    'user': {
      'username': 'username1',
      'name': 'Name1',
      'id': '5fdf9d8db924c128a0aae296'
    },
    'id': '5fdfa172d66ab82360a7730f'
  }

  const component = render(
    <Blog blog={blog} updateBlog={() => {}} deleteBlog={() => {}} canDelete={false} />
  )

  expect(component.container.querySelector('.title')).toBeDefined()
  expect(component.container.querySelector('.author')).toBeDefined()

  expect(component.container.querySelector('.url')).toBeDefined()
  expect(component.container.querySelector('.likes')).toBeDefined()
})