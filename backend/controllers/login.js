const jwt = require('jsonwebtoken');
const router = require('express').Router();
const bcrypt = require('bcrypt');

const { SECRET } = require('../util/config');
const { User, Session } = require('../models');

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

  if (user.disabled) {
    return res.status(401).json({ error: 'Account disabled' })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  console.log(user);
  const newUserForSession = {
    userId: user.dataValues.id,
    userToken: token,
  };

  const previousSession = await Session.findOne({ where: { user_id: user.id } })
  if (previousSession) {
    await previousSession.destroy();
  }
  const userForSession = await Session.create(newUserForSession);

  return res.status(200).send({ token, username: user.username, name: user.name, id: user.id, userForSession })
});

module.exports = router;