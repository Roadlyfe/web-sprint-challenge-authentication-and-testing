const jwt = require("jsonwebtoken");
const JWT_SECRET = 'shh'


const restricted = (req, res, next) => {
  console.log(req.headers.authorization)
  if(!req.headers.authorization) {
    res.status(400).json({message: "token required"})
  }
  const token = req.headers.authorization.split(' ')[1]
  const verified = jwt.verify(token, JWT_SECRET, (err, decoded) =>{
    if(err) {
      res.status(400).json({message: "token invalid"})
    }
  } )
  next()
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
