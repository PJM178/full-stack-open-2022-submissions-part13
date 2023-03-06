const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User, Blog, ReadingList, ReadingListUser } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['id', 'passwordHash'] },
    include: [
      {
        model: Blog,
        // attributes: 
      },
      // {
      //   model: ReadingList,
      //   attributes: ['blog_id', 'is_read'],
      //   through: {
      //    attributes: [], 
      //   },
      // },
    ]
  });

  return res.json(users);
});

router.get('/:id', async (req, res) => {
  let where = { }
  console.log(req.query.read);

  if (req.query.read && req.query.read === 'false' || req.query.read === 'true') {
    where = { isRead: req.query.read, }
  }

  console.log(where);
  console.log(typeof where);
  console.log(typeof req.query.read);

  const user = await User.findByPk(req.params.id, {
    attributes: ['username', 'name' ],
    include: 
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
        through: {
          attributes: ['id', 'isRead'],
          where,
        },
        // include: [
        //   {
        //     model: ReadingList,
        //     // where: {
        //     //   userId: 1,
        //     // },
        //     // where: {
        //     //   isRead: false,
        //     // },
        //     as: 'readinglists',
        //     through: {
        //       attributes: [],
        //     },
        //     // attributes: ['isRead', 'id']
        //   },
        // ]
      },
  });

  if (user) {
    return res.json(user);
  } else {
    return res.status(404).end();
  }
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