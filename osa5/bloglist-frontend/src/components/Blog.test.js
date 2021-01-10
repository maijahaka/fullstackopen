import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('blog', () => {

    let component
    let mockHandler

    beforeEach(() => {
        const blog = {

            id: 'testblog123',
            title: 'test blog',
            author: 'test author',
            url: 'http://www.blogger.com',
            likes: 0,
            user: {
                id: 'testid123',
                name: 'test user'
            }
        }

        const blogs = [blog]
        const setBlogs = jest.fn()

        const user = {
            id: 'testid123',
            name: 'test user'
        }

        mockHandler = jest.fn()

        component = render(
            <Blog
                blog={blog}
                likeBlog={mockHandler}
                blogs={blogs}
                setBlogs={setBlogs}
                user={user}
            />
        )
    })

    test('renders content', () => {
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

    test('renders url and likes in detailed view', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent(
            'http://www.blogger.com'
        )
        expect(component.container).toHaveTextContent(
            '0'
        )
    })

    test('calls event handler twice if like button is clicked twice', () => {
        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})