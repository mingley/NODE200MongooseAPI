const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req,res) => {
    User
        .findById(req.params.id)
        .then(users => {
            if (!users) res.status(404).send();
            res.status(200).json(users);
        });
})

router.post('/', (req,res) =>{
    let add = new User(req.body)
        add
        .save()
        .then(users => res.status(201).json(users))
        .catch(err => res.status(500).send("bad post"))
})

router.put("/:id", (req, res) => {
    
    User.findByIdAndUpdate(req.params.id)
    .then(user => {
        if (!user) res.status(404).send();
        res.status(204).json(user);
    })
    .catch(err => res.status(500).send("bad"));
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
  
    User
      .findByIdAndRemove(userId, (err, deletedUser) => {
        if (deletedUser) {
          res.status(200).json(deletedUser);
        } else {
          console.log(err);
          res.status(404).send(`404 Error: User #${userId} not found`);
        }
      });
  });

module.exports = router;


// Verb	Route	Description	Mongoose Method
// GET	/api/users/	Get all Users	.find()
// GET	/api/users/:id	Get single User	.findById()
// POST	/api/users/	Create a User	.save() (read Constructing Documents)
// PUT	/api/users/:id	Update a User	.findByIdAndUpdate()
// DELETE	/api/users/:id	Delete a User	.findByIdAndRemove()
// Use Postman to test your routes - it allows you to issue the