const router = require('express').Router();
const bcrypt = require('bcryptjs')
const { reset } = require('nodemon');
const { restricted } = ('../middleware/restricted.js')
const JWT_SECRET = 'shh'

const db = require('../../data/dbConfig')
const jwt = require('jsonwebtoken')
console.log('jtw secret', JWT_SECRET)
router.post('/register', async (req, res, next) => {
  const { username, password } = req.body
  if(!username || !password) {
    next(new Error("username and password required"))
  }
  console.log('register', username, password)
  const salt = bcrypt.genSaltSync(8)
  const hash = bcrypt.hashSync(password, salt)
  try{
    const foundUser = await db('users').where('username', username)
    if (foundUser.length > 0 ) {
      next(new Error("username taken"))
    }
    console.log('found user', foundUser)
    const [id] = await db('users').insert({ username, password: hash })
    console.log('user added', id)
    res.status(201).json({ username, id, password: hash })
  } catch (err) {
    console.error("register error", err)
    next(err)
  }
  //res.end('implement register, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  if(!username || !password) {
    next(new Error("username and password required"))
  }
  try{
    const foundUser = await db('users').where('username', username)
    if (foundUser.length === 0   ||
    !bcrypt.compareSync(password, foundUser[0].password)) {
      res.status(400)
      next(new Error("invalid credentials"))
    } 
    const token = jwt.sign({username}, JWT_SECRET)
    res.status(201).json({message: `welcome, ${username}`, token })
  } catch (err) {
    next(err)
  }


  //if(bcrypt.compareSync)

  //res.json('login')
  //res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
