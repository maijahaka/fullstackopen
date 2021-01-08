import React from 'react'

const AddBlogForm = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
    }) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
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
}

export default AddBlogForm