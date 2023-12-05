const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// login user
const loginUser = async (req, res) => {
  const {username, password} = req.body
  
  try {
    const user = await User.login(username, password,)

    // creating jwt token 
    const token = createToken(user._id)

    res.status(200).json({user, token})
  } catch (error) {
    console.error(error);
    res.status(400).json({error: error.message});
  } 
}

// forgot-password user
const forgotPasswordUser = async (req, res) => {
  res.json({mssg: 'forgotpassword user'})
}

// creating jwt token func for sign up
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// GET all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1})

  res.status(200).json(users)
}

// GET a single user
const getUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'User does not exist'})
  }

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({error: 'User does not exist'})
  }

  res.status(200).json(user)
}

// create a new  user
const createUser = async (req, res) => {
  const {firstname, lastname, uclmID, username, password,  deptAssigned, campus, role} = req.body

  let emptyFields = []

  if(!firstname) {
    emptyFields.push('firstname')
  }
  if(!lastname) {
    emptyFields.push('lastname')
  }
  if(!username) {
    emptyFields.push('username')
  }
  if(!uclmID) {
    emptyFields.push('uclmID')
  }
  if(!password) {
    emptyFields.push('password')
  }
  if(!deptAssigned) {
    emptyFields.push('deptAssigned')
  }
  if(!campus) {
    emptyFields.push('campus')
  }
  if(!role) {
    emptyFields.push('role')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  }

  // add doc to db
  try {
    // .create to create doc in db
    const user = await User.signup(
      firstname,
      lastname,
      username,
      uclmID,
      password,
      deptAssigned,
      campus,
      role
    )

    // creating jwt token 
    const token = createToken(user._id)

    res.status(200).json({user, token})
  } catch (error) {
    console.error(error);
    res.status(400).json({error: error.message});
  }
}

// DELETE a user
const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'User does not exist'})
  }

  const user = await User.findOneAndDelete({_id: id})

  if (!user) {
    return res.status(404).json({error: 'User does not exist'})
  }

  res.status(200).json(user)
}

// UPDATE a user
const updateUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'User does not exist'})
  }

  const user = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!user) {
    return res.status(404).json({error: 'User does not exist'})
  }

  res.status(200).json(user)
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  loginUser,
  forgotPasswordUser,
}