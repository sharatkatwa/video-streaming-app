const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'user name cannot be empty'],
    },
    email: {
      type: String,
      required: [true, 'user email cannot be empty'],
      lowercase: true,
      unique: true,
      validate: [isEmail, 'Please provide valid email'],
    },
    password: {
      type: String,
      required: [true, 'password cannot be empty'],
      select: false,
    },
  },
  { timestamps: true }
)
UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
})

// currect password compare function
// UserSchema.methods.correctPassword = async function (
//   enteredPassword,
//   userPassword
// ) {
//   return await bcrypt.compare(enteredPassword, userPassword)
// }

const User = mongoose.model('User', UserSchema)

module.exports = User
