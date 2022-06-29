const jwt = require("jsonwebtoken");
const JWT_SECRET = require('../../data/secrets')


const restricted = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  if (!token) {
      return next({ status: 401, message: "token required" })
  }
  console.log(token)
  jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
          next({ status: 401, secret: JWT_SECRET, token: token, message: "token invalid" })
      } else {
          req.decodedToken = decodedToken
          next()
      }
  })
  
  //console.log(req.headers.authorization)
  // if(!token) {
  //   res.status(401).json({message: "token required"})
  // }
  // jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
  //   if(err) {
  //     res.status(401).json({message: "token invalid"})
  //   } else {
  //     req.decodedToken = decodedToken
  //     next()
  //   }
  // })


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
