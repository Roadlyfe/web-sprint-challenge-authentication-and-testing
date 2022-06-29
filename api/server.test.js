const jwt = require('jsonwebtoken');
const { tokenMaker } = require('../api/auth/tokenMaker');

const db = require('../data/dbConfig');
const server = require('./server.js');
const request = require('supertest');

test('sanity', () => {
    expect(true).toBe(true)
})

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

afterAll(async () => {
    await db.destroy();
});

describe('POST /auth/register', () => {
    test('If missing password', async () => {
        let res = await request(server).post('/api/auth/register').send({ username: 'lisa' });
        expect(res.body.message).toBe("username and password required");
     })
    
    test('If missing username', async () => {
        let res = await request(server).post('/api/auth/register').send({ password: '1234' });
        expect(res.body.message).toBe("username and password required");
    })
})

describe('POST /auth/login', () => {
    test('If missing password', async () => {
        let res = await request(server).post('/api/auth/login').send({ username: 'Homer' });
        expect(res.body.message).toBe("username and password required");
    })

    test('If missing username', async () => {
      let res = await request(server).post('/api/auth/login').send({ username: '', password: 1234 });
      expect(res.body.message).toBe("username and password required");
  })
})

describe('GET /jokes', () => {
    test('if missing token in req header', async () => {
        let res = await request(server).get('/api/jokes');
        expect(res.body.message).toBe("token required");
        expect(res.status).toBe(401)
    })

    test('if token exists in authorization header', async () => {
        let result = await request(server).get('/api/jokes').set('Authorization', tokenMaker({ id: 1, username: 'adam' }))
        expect(result.status).toBe(200)
    })
})