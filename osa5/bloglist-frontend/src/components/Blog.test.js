import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {

        title: 'test blog',
        author: 'test author',
        url: 'http://www.blogger.com',
        likes: 0
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'test blog'
    )
    expect(component.container).toHaveTextContent(
        'test author'
    )
    expect(component.container).not.toHaveTextContent(
        'http:///www.blogger.com'
    )
    expect(component.container).not.toHaveTextContent(
        '0'
    )
})