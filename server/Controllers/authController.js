const User = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const signup = async (req, res) => {
  const { name, email, password } = req.body
  if ((!name, !email, !password)) {
    return res.status(400).json({ msg: 'Please fill all the fields' })
  }
  // check the existing users
  const user = await User.find({ email })
  if (user?.length) {
    return res.status(400).json({ msg: 'user with this email already exists' })
  }

  // Create new user
  const newUser = await User.create({ name, email, password })
  res.status(200).json({
    status: 'success',
    msg: 'User created successfully! Now you can login',
    user: newUser,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if ((!email, !password)) {
    return res
      .status(400)
      .json({ msg: 'Please provide both email and password' })
  }

  // check the user exist or not
  const user = await User.findOne({ email }).select('+password')

  // if user exists check the password
  const comparePassword = await bcrypt.compare(password, user.password)

  if (!user || !comparePassword) {
    return res.status(404).json({ msg: 'incorrect email or password' })
  }

  // create token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

  // create cookie
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  })

  user.password = undefined

  res.status(200).json({
    status: 'success',
    token,
    user,
  })
}
const verifyToken = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not loggedIn! Please Login to get access',
    })
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // verify User exist
  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return res.status(401).json({
      status: 'error',
      message:
        'there is not user found with the token! Please login again to access  ',
    })
  }
  req.user = currentUser
  res.locals.user = currentUser
  next()
}
const logout = async (req, res) => {
  // const cookies = req.cookies
  // if (!cookies?.jwt) {
  //   return res.status(204)
  // }
  // console.log(cookies)
  res.cookie('jwt', 'LoggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.json({ status: 'success', msg: ' logout successfully' })
}

module.exports = { signup, login, logout, verifyToken }
