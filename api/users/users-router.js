const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.json('users')
})

module.exports = router