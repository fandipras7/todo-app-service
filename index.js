require('dotenv').config()

const express = require('express')

const app = express()
const createError = require('http-errors')
const morgan = require('morgan')
const PORT = process.env.PORT || 5000
const mainRoute = require('./src/routes/index')
const commonMid = require('./src/middleware/common')

app.use(express.json())

/* set with manual function */
app.use(commonMid.setCorsHeaders)
app.use(morgan('dev'))

app.use('/v1', mainRoute)

app.all('*', (next) => {
  next(new createError.NotFound())
})

app.use((err, req, res, next) => {
  const messError = err.message || 'Internal Server Error'
  const statusCode = err.status || 500
  res.status(statusCode).json({
    status: false,
    message: messError
  })
})

app.listen(PORT, () => {
  console.log(`server starting on port ${PORT}`)
})
