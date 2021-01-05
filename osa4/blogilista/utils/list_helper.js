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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}