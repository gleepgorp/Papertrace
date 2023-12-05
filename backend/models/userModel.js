const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  deptAssigned: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  uclmID: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  campus: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
}, {timestamps: true})

// static sign up for dept head user/ users
userSchema.statics.signup = async function (firstname, lastname, username, uclmID, password, deptAssigned, campus, role) {

  if (!username || !password) {
    throw Error('All fields must be filled')
  }

  // validation
  const validUsernameRegex = /^uclm-\d{8}$/;

  if(!validUsernameRegex.test(username)) {
    throw Error('Username is invalid')
  }
  if(!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ username })

  if (exists) {
    throw Error('Username already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({
    firstname,
    lastname,
    username,
    uclmID,
    password: hash,
    deptAssigned,
    campus,
    role
  })

  return user
}

// static login for dept head users
userSchema.statics.login = async function(username, password) {
  
  if (!username || !password) {
    throw Error('Fields are empty')
  }


  const user = await this.findOne({ username })

  if (!user) {
    throw Error('Username does not exist')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('userSchema', userSchema)
