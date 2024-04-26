const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const user = request.user

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})


blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})


// 4.13
blogsRouter.delete('/:id', async (request, response, next) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = request.user

  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(401).json({ error: "blog not found" });
  }

  if ( blogToDelete.user._id.toString() === user._id.toString() ) {
      try {
          await Blog.findByIdAndDelete(request.params.id)
          response.status(204).end()
        } catch (exception) {
          next(exception)
        }
  } else {
      return response.status(401).json({ error: `Unauthorized` })
  }
})


// 4.14
blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  updatedBlog
    ? response.status(200).json(updatedBlog)
    : response.status(404).end();
})


module.exports = blogsRouter