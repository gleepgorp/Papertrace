const express = require('express')
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
  forgotPasswordUser,
} = require ('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// login route
router.post('/login', loginUser)

// forgot password route
router.post('/forgot-password', forgotPasswordUser)

// middleware func to protect api routes
router.use(requireAuth)

// GET all dept head users
router.get('/', getUsers)

// GET a single dept head user
router.get('/:id', getUser)

// POST a new dept head user
router.post('/', createUser)

// DELETE a  dept head user
router.delete('/:id', deleteUser)

// UPDATE a dept head user
router.patch('/:id', updateUser)

module.exports = router