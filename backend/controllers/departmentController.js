const Departments = require('../models/departmentModel')
const mongoose = require('mongoose')

// GET all departments 
const getDepartments = async (req, res) => {
  const departments = await Departments.find({}).sort({createdAt: -1})

  res.status(200).json(departments)
}

// GET a single department
const getDepartment = async (req, res) => {
  const { id }   = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Department does not exist'})
  }

  const department = await Departments.findById(id)

  if (!department) {
    return res.status(404).json({error: 'Department does not exist'})
  }

  res.status(200).json(department)
 }

  // CREATE new department
  const createDepartment = async (req, res) => {
    const { departmentName } = req.body
  
    // add doc to db 
    try {
      const department = await Departments.create({departmentName})
      res.status(200).json(department)
    } catch (error) {
      console.error(error)
      res.status(400).json({error: error.message})
    }
   }
  
  // DELETE a department
const deleteDepartment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Department does not exist'})
  }

  const department = await Departments.findOneAndDelete({_id: id})

  if (!department) {
    return res.status(404).json({error: 'Department does not exist'})
  }

  res.status(200).json(department)
}

// UPDATE a department
const updateDepartment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Department does not exist'})
  }

  const department = await Departments.findOneAndUpdate({_id: id}, {...req.body})

  if (!department) {
    return res.status(404).json({error: 'Department does not exist'})
  }

  res.status(200).json(department)
}

module.exports = {
  getDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment
}