// 4.3
// Dummy Function
const dummy = (blogs) => {
  return 1
}

// 4.4
// Sum of Total likes
const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((accumulator, value) => accumulator + value,0)
}


// 4.5
// Favorite Blog
const favoriteBlog = (blogs) => {
  return blogs.reduce((maxB, blog) => maxB = blog.likes > maxB.likes ? blog : maxB, blogs[0])
}

// Max Number of Likes in a Blog
const maxNumberOfLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((maxL, likes) => maxL = likes > maxL ? likes : maxL, 0)
//  return Math.max(...blogs.map(blog => blog.likes))
}

// 4.6
// Most Blogs Author
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined
  authorBlogs = {}
  blogs.map(blog => {
    if (authorBlogs[blog.author]) {
      authorBlogs[blog.author] += 1
    } else {
      authorBlogs[blog.author] = 1
    }
  })
  const aBlogs = Object.entries(authorBlogs)
  ret = aBlogs.reduce((maxB, blog) => maxB = blog[1] > maxB[1] ? blog : maxB, aBlogs[0])
  return {'author':ret[0], 'blogs':ret[1]}
}

// 4.7
// Most Likes Author
const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined
  authorLikes = {}
  blogs.map(blog => {
    if (authorLikes[blog.author]) {
      authorLikes[blog.author] += blog.likes
    } else {
      authorLikes[blog.author] = blog.likes
    }
  })
  const aLikes = Object.entries(authorLikes)
  ret =  aLikes.reduce((maxB, blog) => maxB = blog[1] > maxB[1] ? blog : maxB, aLikes[0])
  return {'author':ret[0], 'likes':ret[1]}
}

module.exports = {
  dummy, totalLikes, favoriteBlog, maxNumberOfLikes, mostBlogs, mostLikes
}