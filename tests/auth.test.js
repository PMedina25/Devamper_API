const request = require('supertest');
const app = require('../app');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

// Change the timeout from 5000 ms to 3000 ms
jest.setTimeout(30000);

// Define the authentication path url
const url = '/api/v1/auth';

beforeEach(setupDatabase);

describe("Test the authentication path", () => {
    test('Should register a new user', async () => {
        const response = await request(app).post(`${url}/register`).send({
            name: 'Andrew',
            email: 'andrew@example.com',
            password:"MyPass777!"
        }).expect(201); 

        // Assertions about the response
        expect(response.body).toMatchObject({
            success: true
        });
        
    });

    test('Should login existing user', async () => {
        const response = await request(app).post(`${url}/login`).send({
            email: userOne.email,
            password: userOne.password
        }).expect(200);
    });

    test('Should not login nonexistent user or wrong password', async () => {
        await request(app).post(`${url}/login`).send({
            email: userOne.email,
            password: 'thisisnotmypass'
        }).expect(401);
    });

    test('Should get profile for user', async () => {
        await request(app)
            .get(`${url}/me`)
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200);
    });

    test('Should not get profile for unauthenticated user', async () => {
        await request(app)
            .get(`${url}/me`)
            .send()
            .expect(401);
    });
});
