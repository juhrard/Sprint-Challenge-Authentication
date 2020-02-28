const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../auth/auth-model.js");
const { jwtSecret } = require("../config/secrets.js");

router.get('/', (req, res) => {
  res.status(200).json({ message: "Successfully received data from auth-router" })
})

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => res.status(500).json(error))
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome to Dad Jokes, ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Server Login Error." })
    })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role || "user"
  };

  const options = {
    expiresIn: "1h"
  }

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
