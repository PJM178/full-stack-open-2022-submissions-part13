const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exlude: ['userId'] },
    },
  })

  return res.json(users);
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    await user.destroy();

    return res.status(204).end();
  } else {
    return res.status(404).end();
  }
});

router.post('/', async (req, res, next) => {
 
  // new User should not be used - create or build are preferred
  // const user = new User({
  //   username,
  //   name,
  //   passwordHash,
  // });

  // await user.save();

  try {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = {
      username: username,
      name: name,
      passwordHash: passwordHash,
    };

    const user = await User.create(newUser);

    return res.json(user);
  } catch(error) {
    next(error);
  }
});

router.put('/:username', async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    try {
      user.username = req.body.username;
      await user.save();
      return res.json(user);
    } catch(error) {
      next(error);
    }
  } else {
    return res.status(404).end();
  }
  
});

module.exports = router;