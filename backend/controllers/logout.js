const router = require('express').Router();

const { tokenExtractor } = require('../util/middleware')
const { Session } = require('../models')

router.delete('/', tokenExtractor, async (req, res, next) => {
  const userSession = await Session.findOne({ where: { userId: req.decodedToken.id } })
  console.log(userSession);
  if (userSession) {
    if (userSession.userToken === req.token) {
      await userSession.destroy();
      return res.status(204).end();
    } else {
      return res.status(404).end();
    }
  } else {
    return res.status(401).json({ error: 'Session no longer valid' })
  }
});

module.exports = router
