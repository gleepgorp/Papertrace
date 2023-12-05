require('dotenv').config();

// require
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')
const departmentRoutes = require('./routes/departments')

// express app 
const app = express()

// use middleware this func will fire for every request
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
}) 

// routes
app.use('/api/user/', userRoutes)
app.use('/api/departments/', departmentRoutes)


// connect to db 
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  // listen for reqs
  app.listen(process.env.PORT, () => {
    console.log('connected to db & listening to port', process.env.PORT)
  })
})

.catch((error) => {
  console.log(error)
}) 

process.env