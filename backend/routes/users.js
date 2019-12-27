const router = require('express').Router();
let User = require('../models/user.model');

router.route('/login').post((req, res) => {

  User.findOne({ username: req.body.username })
    .then(user => {

      if (user.hash === req.body.hash) {
        res.json(user.id);
      }
      else {
        res.json(null);
      }

    })
    .catch(err => res.status(400).json(err));
});

router.route('/signup').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const hash = req.body.hash;

  const newUser = new User({
    username,
    email,
    hash
  });

  const checkDuplicates = async (username, email) => {

    try {
      let results = await Promise.all([
        User.find({ username: username }).countDocuments(),
        User.find({ email: email }).countDocuments(),

      ]);

      return results;
    }

    catch (err) {
      res.status(400).json('Error: ' + err)
    }
  }

  checkDuplicates(username, email).then((duplicates) => {
    
    let response = {
  
      usernameDuplicate: duplicates[0] > 0,
      emailDuplicate: duplicates[1] > 0,
      userId: null
    }
    
    
    if (duplicates[0] === 0 && duplicates[1] === 0) {

      newUser.save()
        .then((user) => {
         
          response.userId = user.id;
          res.json(response);

        })
        .catch(err => res.status(400).json(err));
  
    } else {
  
      res.json(response);
  
    }

  });


  


});

router.route('/update/').post((req, res) => {
  User.findById(req.body.id)
    .then(user => {
      user.username = req.body.username;
      user.email = req.body.email;
      user.hash = req.body.hash;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;