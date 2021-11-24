
const jwt = require('jsonwebtoken')

const needsAuth = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const header = req.headers.authorization
    const headerParts = header.split(' ')
    const secret = 'asdfasdfasdfasdfasdfasdfasdf'
    try {
      const payload = jwt.verify(headerParts[1], secret)
      res.locals.user = payload.user
      return next()
    } catch (err) { }
  }
  res.send({
    error: true,
    message: 'needs auth'
  })
}
module.exports = { needsAuth }
