const mongoose = require('mongoose')

const Schema = mongoose.Schema

const departmentSchema = new Schema({
  departmentName: {
    type: String,
    required: true,
    unique: true
  },
}, {timestamps: true})

module.exports = mongoose.model('Departments', departmentSchema)
