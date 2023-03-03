const router = require('express').Router();

const { Op } = require('sequelize');
const { Blog, User } = require('../models');
const { tokenExtractor } = require('../util/middleware')

// Helper functions
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

// HTTP methods
router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      { title: {[Op.iLike]: `%${req.query.search}%`} }, 
      { author: {[Op.iLike]: `%${req.query.search}%`} }
    ]
  }
  console.log(where);
 
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userblogId'] },
    include: {
      model: User,
      attributes: ['name', 'username'],
    },
    where,
    order: [
      ['likes', 'DESC']
    ],
  });

  res.json(blogs);
});

router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    return res.json(blog);
  } else {
    return res.status(404).end();
  }
});

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    console.log(req.decodedToken);
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() });

    return res.json(blog);
  } catch(error) {
    next(error)
  }
});

router.delete('/:id', tokenExtractor, async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    if (req.decodedToken.id === blog.userblogId) {
      await blog.destroy();

      return res.status(204).end();
    } else {
      return res.status(401).json({ error: 'Invalid user' })
    }
  } else {
    return res.status(404).end();
  }
});

router.put('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    try {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      return res.json(req.blog);
    } catch(error) {
      // console.log('test', error);
      next(error)
      // return res.status(400).json({ error });
    }    
  } else {
    return res.status(404).end();
  }
});

module.exports = router;