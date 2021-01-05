const mostLikes = require('../utils/list_helper').mostLikes

describe('the author with the most likes', () => {
    const emptyList = []

    test('of an empty list is null', () => {
        result = mostLikes(emptyList)
        expect(result).toBe(null)
    })
    
    const listWithOneBlog = [
        {
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
            likes: 5, 
            __v: 0
        }
    ]
    
    test('of a list with one blog is the author of that blog', () => {
        result = mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 5
        })
    })

    const blogs = [ 
        { 
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7, 
            __v: 0 
        }, 
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
            likes: 5, 
            __v: 0 
        }, 
        { 
            _id: "5a422b3a1b54a676234d17f9", 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12, 
            __v: 0 
        }, 
        { 
            _id: "5a422b891b54a676234d17fa", 
            title: "First class tests", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
            likes: 10, 
            __v: 0 
        }, 
        { 
            _id: "5a422ba71b54a676234d17fb", 
            title: "TDD harms architecture", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
            likes: 0, 
            __v: 0 
        }, 
        { 
            _id: "5a422bc61b54a676234d17fc", 
            title: "Type wars", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
            likes: 2, 
            __v: 0 
        }    
    ]

    test('of a bigger list is the author whose blogs have the most likes', () => {
        const result = mostLikes(blogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})