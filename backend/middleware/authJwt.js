const jwt = require('jsonwebtoken')

const protect = (headers) => {
  let token

  if (
    headers.authorization &&
    headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, "HeavenOnEarth")
      return decoded
    } catch (error) {
      throw ('Invalid credentials, please login again')
    }
  }

  if (!token) {
    throw ('Not authorized, no token')
  }
}

module.exports = { protect }