const express = require('express')
const router = express.Router()
const todosRoute = require('./todos')
const activityRoute = require('./activity')

router
  .use('/todos', todosRoute)
  .use('/activity-groups', activityRoute)

module.exports = router
