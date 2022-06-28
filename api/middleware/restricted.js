const jwt = require("jsonwebtoken");
const JWT_SECRET = require('../../data/secrets')


const restricted = (req, res, next) => {
  console.log(req.headers.authorization)
  if(!req.headers.authorization) {
    res.status(401).json({message: "token required"})
  }
  const token = req.headers.authorization
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if(err) {
      res.status(401).json({message: "token invalid"})
    } else {
      req.decodeToken = decoded
      next()
    }
  })


  //.split(' ')[1]
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};


module.exports =  restricted;
