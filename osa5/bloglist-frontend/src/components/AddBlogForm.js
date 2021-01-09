import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = React.forwardRef(({ createBlog }, ref) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = ({ target }) => {
        setTitle(target.value)
    }
    const handleAuthorChange = ({ target }) => {
        setAuthor(target.value)
    }
    const handleUrlChange = ({ target }) => {
        setUrl(target.value)
    }

    const resetForm = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    useImperativeHandle(ref, () => {
        return {
            resetForm, title, author
        }
    })

    const addBlog = async (event) => {
        event.preventDefault()
        await createBlog({ title, author, url })

        resetForm()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={handleUrlChange}
                    />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
})

AddBlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

AddBlogForm.displayName = 'AddBlogForm'

export default AddBlogForm