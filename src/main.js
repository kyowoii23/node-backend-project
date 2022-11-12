// @ts-check

const express = require('express')
const fs = require('fs')

const app = express()

const PORT = 4000

app.use('/', async (req, res, next) => {
  console.log('middleware 1')
  const requestedAt = new Date()
  const fileContent = await fs.promises.readFile('.gitignore')

  req.requestedAt = requestedAt
  req.fileContent = fileContent
  next()
})

/* ...middleware */

app.use('/', (req, res, next) => {
  console.log('middleware 2')
  res.send(`requested at ${req.requestedAt}, file : ${req.fileContent}`)
})

app.listen(PORT, () => {
  console.log(`The Express server is listening at port ${PORT}`)
})