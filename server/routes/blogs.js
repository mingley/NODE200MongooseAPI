const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req,res) => {
    Blog
        .find({featured: true})
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/:id', (req,res) => {
    Blog
    .findById(req.params.id)
    .then(blogs => {
      if (!blogs) res.status(404).send();
      res.status(200).json(blogs);
    }).catch(err => res.status(404))
});

router.post('/', (req,res) =>{
let dbUser = null;
let newBlog = new Blog(req.body);

User
    .findById(req.body.authorId)
    .then(user => {
        dbUser = user;
        newBlog.author = user._id;
        return newBlog.save();
    })
    .then(blog => {
        // Push the saved blog to the array of blogs associated with the User
        dbUser.blogs.push(blog);
        // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
        dbUser.save().then(() => res.status(201).json(blog));
    })
})

router.put('/:id', (req,res) => {
    Blog
        .findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(blogs => res.status(204).json(blogs))
        .catch(e => res.status(500).send('Not Working'))

})

router.delete('/:id', (req,res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(blogs => res.status(200).json(blogs))
        .catch(console.error)
})

module.exports = router;
