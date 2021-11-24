
const jwt = require('jsonwebtoken')

const secret = 'asdfasdfasdfasdfasdfasdfasdf'

const USERS = {
  'kungfurenato30@gmail.com': 'abc123'
}

const auth = async (req, res) => {
  const { user, passwd } = req.body

  // TODO: checar no banco de dados
  if (USERS[user] && USERS[user] === passwd) {
    const token = jwt.sign({
      user
    }, secret, { expiresIn: '2 days' })
    return res.send({
      success: true,
      token
    })
  }
  res.send({
    success: false,
    message: 'wrong credentials.'
  })
}


module.exports = {
  auth
}