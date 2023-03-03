const router = require('express').Router();

const { ReadingList } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const blogAdded = await ReadingList.create(req.body);
    return res.json(blogAdded);
  } catch(error) {
    next(error);
  }
});

module.exports = router;