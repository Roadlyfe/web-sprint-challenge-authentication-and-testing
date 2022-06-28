const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../index');

 function tokenMaker(user) {
    const payload = {
        subject: user.id,
        username: user.username,

    };
    const options = {
        expiresIn: '6h',
    };
    return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = {
    tokenMaker,
}