const server = require('./api/server.js');

// module.exports = {
//   BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8,
//   JWT_SECRET: 'shh',
// }

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});

