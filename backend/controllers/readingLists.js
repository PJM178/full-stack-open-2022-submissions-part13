const router = require('express').Router();

const { ReadingList } = require('../models');
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res, next) => {
  try {
    const blogAdded = await ReadingList.create(req.body);
    return res.json(blogAdded);
  } catch(error) {
    next(error);
  }
});

router.put('/:id', tokenExtractor, async (req, res, next) => {
  const blogInList = await ReadingList.findByPk(req.params.id);
  if (blogInList) {
    if (blogInList.userId === req.decodedToken.id) {
      try {
        blogInList.isRead = req.body.read;
        await blogInList.save();
        return res.json(blogInList);
      } catch(e) {
        next(e)
      }
    } else {
      return res.status(401).json({ error: 'Invalid user' })
    }
  } else {
    return res.status(404).end();
  }
});

module.exports = router;