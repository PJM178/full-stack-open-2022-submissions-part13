const jwt = require('jsonwebtoken');
const router = require('express').Router();
const bcrypt = require('bcrypt');

const { SECRET } = require('../util/config');
const User = require('../models/user');

router.post('/', async (req, res) => {
  const body = req.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(400).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  return res.status(200).send({ token, username: user.username, name: user.name, id: user.id })
});

module.exports = router;