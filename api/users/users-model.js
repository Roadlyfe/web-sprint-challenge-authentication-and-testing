const db = require('../../data/dbConfig')

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users').select('username', 'password', 'id').where(filter)
}

function findById(id) {
    return db('users').select('username', 'password', 'id').where('user.id', id).first()

}

async function add(user) {
const [id] = await db('users').insert(user)
return findById(id)
}

module.exports = {
    find,
    findBy,
    findById,
    add,
}