const request = require('supertest');
const app = require('../app');
const { User, userAdminId, userAdmin, setupDatabase } = require('./fixtures/db');

// Change the timeout from 5000 ms to 3000 ms
jest.setTimeout(60000);

// Define the authentication path url
const url = '/api/v1/auth';

beforeEach(setupDatabase);

/* 
*   Test suite for the authentication workflow
*/
describe('Test the authentication path', () => {
    test('Should register a new user', async () => {
        const response = await request(app).post(`${url}/register`).send({
            name: 'Andrew',
            email: 'andrew@example.com',
            password:'MyPass777!'
        }).expect(201); 

        // Assertions about the response
        expect(response.body).toMatchObject({
            success: true
        });
    });

    test('Should login existing user', async () => {
        await request(app).post(`${url}/login`).send({
            email: userAdmin.email,
            password: userAdmin.password
        }).expect(200);
    });

    test('Should get profile for user', async () => {
        await request(app)
            .get(`${url}/me`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send()
            .expect(200);
    });

    test('Should not get profile for unauthenticated user', async () => {
        await request(app)
            .get(`${url}/me`)
            .send()
            .expect(401);
    });

    test('Should logout logged user', async () => {
        const response = await request(app)
            .get(`${url}/logout`)
            .expect(200);
        
        expect(response.body).toMatchObject({
            success: true,
            data: {}
        });
    });
});


/*
*   Test suite for register user fields
*/
describe('Test register user fields', () => {
    test('Should not register user with no no name', async () => {
        await request(app)
            .post(`${url}/register`)
            .send({
                name: '',
                email: 'example@gmail.com',
                password: '123456'
            })
            .expect(400);
    });

    test('Should not register user with invalid email', async () => {
        await request(app)
            .post(`${url}/register`)
            .send({
                name: 'example',
                email: 'example@',
                password: '123456'
            })
            .expect(400);
    });

    test('Should not register user with password length less than 6 characters', async () => {
        await request(app)
            .post(`${url}/register`)
            .send({
                name: 'example',
                email: 'example@gmail.com',
                password: '12345'
            })
            .expect(400);
    });

    test('Should not register user with invalid role', async () => {
        await request(app)
            .post(`${url}/register`)
            .send({
                name: 'example',
                email: 'example@gmail.com',
                password: '123456',
                role: 'fucking boss'
            })
            .expect(400);
    });
});

/*
*   Test suite for the login
*/
describe('Test login user fields', () => {
    test('Should not login nonexistent user', async () => {
        const response = await request(app).post(`${url}/login`).send({
            email: 'example@example.com',
            password: userAdmin.password
        }).expect(401);

        expect(response.body.error).toBe('User not found');
    });

    test('Should not login user with incorrect password', async () => {
        const response = await request(app).post(`${url}/login`).send({
            email: userAdmin.email,
            password: 'thisisnotmypassword'
        }).expect(401);

        expect(response.body.error).toBe('Invalid password');
    });
});

/*
*   Test suite for the update of the user fields
*/
describe('Test update user fields', () => {
    test('Should update the current password', async () => {
        await request(app)
            .put(`${url}/updatepassword`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                currentPassword: userAdmin.password,
                newPassword: 'newpassword'
            })
            .expect(200);

        const updatedUserPassword = await User.findOne({ email: userAdmin.email }).select('+password');
        const isMatch = await updatedUserPassword.matchPassword('newpassword');
        expect(isMatch).toBe(true);
    });

    test('Should not update the current password if it does not match', async () => {
        await request(app)
            .put(`${url}/updatepassword`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                currentPassword: 'passwordnotmatching',
                newPassword: 'newpassword'
            })
            .expect(401);
    });

    test('Should update the current email', async () => {
        await request(app)
            .put(`${url}/updatedetails`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                email: 'mike1@example.com',
                name: userAdmin.name
            })
            .expect(200);

        const updatedUser = await User.findOne({ email: 'mike1@example.com'});
        expect(updatedUser).not.toBe(null);
    });

    test('Should not update unathorized user', async () => {
        await request(app)
            .put(`${url}/updatedetails`)
            .send({
                email: 'mike1@example.com',
                name: userAdmin.name
            })
            .expect(401);
    });
});

/*
*   Test suite for the forgot and reset password
*/
describe('Test forgot and reset password', () => {
    test('Should not send forgot password email if user not found', async () => {
        await request(app)
            .post(`${url}/forgotpassword`)
            .send({
                email: 'notexistingmail@example.com'
            })
            .expect(404);
    });

    test('Should send forgot password email', async () => {
        const response = await request(app)
            .post(`${url}/forgotpassword`)
            .send({
                email: userAdmin.email
            })
            .expect(200);
        
        expect(response.body).toMatchObject({
            success: true,
            data: 'Email sent'
        });
    });

    test('Should not reset password if unauthenticated or wrong token', async () => {
        await request(app)
            .put(`${url}/resetpassword/alinrtiunadf`)
            .send({
                password: userAdmin.password 
            })
            .expect(400);
    });

    test('Should not reset password if it is incorrect', async () => {
        await request(app)
            .put(`${url}/resetpassword/alinrtiunadf`)
            .send({
                password: 'wrongpassword' 
            })
            .expect(400);
    });
});
