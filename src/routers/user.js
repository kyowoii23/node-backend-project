// @ts-check

const express = require('express')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

const USERS = {
  15: {
    nickname: 'nickname 15',
    profileImageKey: undefined,
  },
  16: {
    nickname: 'nickname 16',
    profileImageKey: undefined,
  },
}

router.get('/', (req, res) => {
  res.send('User List')
})

router.param('id', async (req, res, next, value) => {
  // async 할 때는 promise를 돌려줘야하는데 현재 promise rejection이 일어남 => 핸들링을 위해서 try catch 필요
  try {
    // @ts-ignore
    const user = USERS[value]

    if (!user) {
      const err = new Error('User not found.')
      // @ts-ignore
      err.statusCode = 404
      throw err
    }

    // @ts-ignore
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
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      // @ts-ignore
      nickname: req.user.nickname,
      userId: req.params.id,
      // profileImageURL: '/uploads/bc2665d513c20048838d727f34ad4cf9',
      // @ts-ignore
      profileImageURL: `/uploads/${req.user.profileImageKey}`,
    })
  }
})

router.post('/', (req, res) => {
  res.send('User register')
})

router.post('/:id/nickname', (req, res) => {
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`user nickname updated: ${nickname}`)
})

router.post('/:id/profile', upload.single('profile'), (req, res, next) => {
  // @ts-ignore
  const { user } = req
  // @ts-ignore
  const { filename } = req.file

  user.profileImageKey = filename

  res.send(`user profile image uploaded: ${filename}`)
})

module.exports = router
