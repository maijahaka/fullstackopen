const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const maxReducer = (max, blog) => {
        return blog.likes > max
            ? blog.likes
            : max
    }

    const checkFavorite = (blog) => {
        const mostLikes = blogs.reduce(maxReducer, 0)

        return blog.likes === mostLikes
    }

    const favoriteBlog = blogs.find(checkFavorite)

    return blogs.length > 0 
    ? {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    }
    : null
}

const mostBlogs = (blogs) => {
    const authors = {}

    blogs.map(blog => {
        !authors[blog.author]
        ? authors[blog.author] = 1
        : authors[blog.author] = authors[blog.author] + 1
    })

    const maxReducer = (max, blogs) => {
        return blogs > max
        ? blogs
        : max
    }

    const mostBlogs = Object.values(authors).reduce(maxReducer, 0)

    const checkMostBlogs = (author) => {
        return authors[author] === mostBlogs
    }

    const authorWithMostBlogs = Object.keys(authors).find(checkMostBlogs)

    return blogs.length > 0
    ? {
        author: authorWithMostBlogs,
        blogs: authors[authorWithMostBlogs]
    }
    : null
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}