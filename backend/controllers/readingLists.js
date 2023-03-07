const router = require('express').Router();

const { ReadingList, Session } = require('../models');
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
  const sessionToken = await Session.findOne({ where: { userId: req.decodedToken.id } });
  if (sessionToken) {
    if (sessionToken.userToken === req.token) {
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
          return res.status(401).json({ error: 'Blog not in user\'s reading list' });
        }
      } else {
        return res.status(404).end();
      }
    } else {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'Not authorized, please login' });
  }
});

module.exports = router;