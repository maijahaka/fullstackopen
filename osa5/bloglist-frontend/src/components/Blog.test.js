import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('blog', () => {

    let component

    beforeEach(() => {
        const blog = {

            title: 'test blog',
            author: 'test author',
            url: 'http://www.blogger.com',
            likes: 0,
            user: {
                id: 'testid123',
                name: 'test user'
            }
        }

        const user = {
            id: 'testid123',
            name: 'test user'
        }

        component = render(
            <Blog blog={blog} user={user} />
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
})