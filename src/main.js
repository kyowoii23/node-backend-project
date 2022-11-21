// @ts-check

const app = require('./app')

const PORT = 4000

app.listen(PORT, () => {
  console.log(`The Express server is listening at port ${PORT}`)
})