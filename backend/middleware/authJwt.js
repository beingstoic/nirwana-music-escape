const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, "HeavenOnEarth")
      req.decodedId = decoded
      next()
    } catch (error) {
      console.log(error)
      return res.status(401).json('Invalid credentials, please login again')
    }
  }

  if (!token) {
    return res.status(401).json('Not authorized, no token')
  }
})

module.exports = { protect }