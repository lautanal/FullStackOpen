const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


describe('there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })


  // 4.8
  test('there are six blogs returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })


  // 4.9
  test('a specific blog is identified with id and can be retrieved with it', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToView)
  })


  describe('addition of a new blog', () => {

    beforeEach(async () => {
      await User.deleteMany({})
      const newUser = {
        username: 'root',
        name: 'root',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
  
      const result = await api
        .post('/api/login')
        .send(newUser)
  
      headers = {
        'Authorization': `bearer ${result.body.token}`
      }
    })

    // 4.10
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: "My Blog",
        author: "My Self",
        url: "https://reactpatterns.com/",
        likes: 5
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

      const lastIndex = response.body.length - 1
      assert.strictEqual(response.body[lastIndex].title, "My Blog")
      assert.strictEqual(response.body[lastIndex].author, "My Self")
      assert.strictEqual(response.body[lastIndex].url, "https://reactpatterns.com/")
      assert.strictEqual(response.body[lastIndex].likes, 5)
    })


    // 4.11
    test('blog without likes can be added, defaults to 0', async () => {
      const newBlog = {
        title: "My Second Blog",
        author: "My Self",
        url: "https://reactpatterns.com/",
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
      assert.strictEqual(response.body[response.body.length - 1].likes, 0)
    })


    // 4.12
    test('blog without title, author or url is not added', async () => {
      const newBlog = {likes: 0}
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .set(headers)

      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })


  describe('deletion and updating of a blog', () => {

    beforeEach(async () => {
      await User.deleteMany({})
      const newUser = {
        username: 'root',
        name: 'root',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
  
      const result = await api
        .post('/api/login')
        .send(newUser)
  
      headers = {
        'Authorization': `bearer ${result.body.token}`
      }
    })

    // 4.13
    test('a blog can be deleted', async () => {
      const newBlog = {
        title: "My Third Blog to be Deleted",
        author: "My Self",
        url: "https://reactpatterns.com/",
        likes: 5
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const allBlogs = await helper.blogsInDb()
        const blogToDelete = allBlogs.find(blog => blog.title === newBlog.title)

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set(headers)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const contents = blogsAtEnd.map(r => r.title)
      assert(!contents.includes(blogToDelete.title))
    })

    // 4.14
    test('a blog can be modified', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToModify = blogsAtStart[0]
      blogToModify.likes = 20

      const resultBlog = await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(blogToModify)
        .expect(200)
        .set(headers)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToModify)
    })
  })
})


describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'root',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})


after(async () => {
  await mongoose.connection.close()
})
