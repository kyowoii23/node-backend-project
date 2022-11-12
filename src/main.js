// @ts-check

const express = require('express')
// const bodyParser = require('body-parser') // express.json() 으로 사용 가능

const userRouter = express.Router()

const app = express()

app.use(express.json())

const PORT = 4000

userRouter.get('/', (req, res) => {
  res.send('User List')
})

USERS = {
  15 : {
    nickname: 'kim',
  },
  'kim': {
    nickname: 'kkw',
  },
}

userRouter.param('id', (req, res, next, value) => {
  console.log('id param', value)
  req.user = USERS[value]
  next()
})

userRouter.get('/:id', (req, res) => {
  console.log('userRouter get ID')
  res.send(req.user)
})

userRouter.post('/', (req, res) => {
  res.send('User register')
})

userRouter.post('/:id/nickname', (req, res) => {
  // req.body: {'nickname': 'bar'}
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`user nickname updated: ${nickname}`)
})

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`The Express server is listening at port ${PORT}`)
})