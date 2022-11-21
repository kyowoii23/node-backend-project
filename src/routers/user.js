// @ts-check

const express = require('express')

const router = express.Router()

const USERS = {
  15: {
    nickname: 'nickname 15',
  },
  16: {
    nickname: 'nickname 16',
  },
}

router.get('/', (req, res) => {
  res.send('User List')
})

router.param('id', async (req, res, next, value) => {
  // async 할 때는 promise를 돌려줘야하는데 현재 promise rejection이 일어남 => 핸들링을 위해서 try catch 필요
  try {
    const user = USERS[value]

    if (!user) {
      const err = new Error('User not found.')
      err.statusCode = 404
      throw err
    }

    req.user = USERS[value]
    next()
  } catch (err) {
    next(err)
  }
  
})

// /users/15
router.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])
  
  if (resMimeType === 'json') {
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      nickname: req.user.nickname,
    })
  }
})

router.post('/', (req, res) => {
  res.send('User register')
})

router.post('/:id/nickname', (req, res) => {
  // req.body: {'nickname': 'bar'}
  const { user } = req
  const { nickname } = req.body
  
  user.nickname = nickname
  
  res.send(`user nickname updated: ${nickname}`)
})

module.exports = router