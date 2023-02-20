const router = require('express').Router();

const { Blog } = require('../models');
const { sequelize } = require('../util/db');

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: ['author'],
    order: [
      ['likes', 'DESC']
    ],
  });
  // console.log(JSON.stringify(authors, null, 2));
  return res.json(authors);
});

module.exports = router;