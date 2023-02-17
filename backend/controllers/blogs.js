const router = require('express').Router();

const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

// HTTP methods
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();

  res.json(blogs);
});

router.get('/:id', async (req, res) => {
  const blogs = await Blog.findByPk(req.params.id);

  res.json(blogs);
});

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    return res.json(blog);
  } catch(error) {
    return res.status(400).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    await blog.destroy();

    return res.status(204).end();
  } else {
    return res.status(404).end();
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    try {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      return res.json(req.blog);
    } catch(error) {
      console.log(error);
      return res.status(400).json({ error });
    }    
  } else {
    return res.status(404).end();
  }
});

module.exports = router;