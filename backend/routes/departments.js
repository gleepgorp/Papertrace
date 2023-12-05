const express = require('express')
const {
  getDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment
} = require ('../controllers/departmentController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// middleware func to protect api routes
// router.use(requireAuth)

// GET all departments
router.get('/', getDepartments)

// GET a single department
router.get('/:id', getDepartment)

// POST a new department
router.post('/', createDepartment)

// DELETE a  department
router.delete('/:id', deleteDepartment)

// UPDATE a department
router.patch('/:id', updateDepartment)

module.exports = router