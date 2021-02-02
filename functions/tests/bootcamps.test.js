const request = require('supertest');
const app = require('../app');
const {
    User,
    userAdminId,
    userPublisherId,
    userUserId,
    userAdmin,
    userPublisher,
    userUser,
    Bootcamp,
    bootcampOneId,
    bootcampTwoId,
    bootcampThreeId,
    bootcampOne,
    bootcampTwo,
    bootcampThree,
    setupDatabase
} = require('./fixtures/db');

// Change the timeout from 5000 ms to 100000 ms
jest.setTimeout(100000);

// Define the bootcampos path url
const url = '/api/v1/bootcamps';

beforeEach(setupDatabase);

/* 
*   Test suite for the bootcamps get requests
*/
describe('Test the bootcamps get requests', () => {
    test('Should get all the bootcamps from the database', async () => {
        await request(app)
            .get(`${url}`)
            .expect(200);
    });

    test('Should get a single bootcamp by id', async () => {
        await request(app)
            .get(`${url}/${bootcampOneId}`)
            .expect(200);
    });

    test('Should not get a single bootcamp if it does not exist', async () => {
        await request(app)
            .get(`${url}/asdfaeadfwegs`)
            .expect(404);
    });
});

/* 
*   Test suite for the create bootcamp post request
*/
describe('Test the create bootcamp post request', () => {
    test('Should create a new bootcamp', async () => {
        await request(app)
            .post(`${url}`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                "name": "ModernTech Bootcamp 1",
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
                "website": "https://codemasters.com",
                "phone": "(333) 333-3333",
                "email": "enroll@codemasters.com",
                "address": "85 South Prospect Street Burlington VT 05405",
                "careers": ["Web Development", "Data Science", "Business"],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
            })
            .expect(201);

        // Assertions about the response
        const createdBootcamp = await Bootcamp.findOne({ name: "ModernTech Bootcamp 1"});
        expect(createdBootcamp).not.toBe(null);
    });

    test('Should not create a bootcamp if user is unathorized', async () => {
        await request(app)
            .post(`${url}`)
            .send({
                "name": "ModernTech Bootcamp 1",
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
                "website": "https://codemasters.com",
                "phone": "(333) 333-3333",
                "email": "enroll@codemasters.com",
                "address": "85 South Prospect Street Burlington VT 05405",
                "careers": ["Web Development", "Data Science", "Business"],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
            })
            .expect(401);
    });

    test('Should not create a bootcamp if user is an user type', async () => {
        await request(app)
            .post(`${url}`)
            .set('Authorization', `Bearer ${userUser.tokens[0].token}`)
            .send({
                "name": "ModernTech Bootcamp User",
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
                "website": "https://codemasters.com",
                "phone": "(333) 333-3333",
                "email": "enroll@codemasters.com",
                "address": "85 South Prospect Street Burlington VT 05405",
                "careers": ["Web Development", "Data Science", "Business"],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
            })
            .expect(403);
    });

    test('Should not create a bootcamp if publisher has already created one', async () => {
        await request(app)
            .post(`${url}`)
            .set('Authorization', `Bearer ${userPublisher.tokens[0].token}`)
            .send({
                "name": "ModernTech Bootcamp User",
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
                "website": "https://codemasters.com",
                "phone": "(333) 333-3333",
                "email": "enroll@codemasters.com",
                "address": "85 South Prospect Street Burlington VT 05405",
                "careers": ["Web Development", "Data Science", "Business"],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
            })
            .expect(400);
    });

    test('Should not create a bootcamp whose name already exists in the database', async () => {
        await request(app)
            .post(`${url}`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                "name": bootcampOne.name,
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
                "website": "https://codemasters.com",
                "phone": "(333) 333-3333",
                "email": "enroll@codemasters.com",
                "address": "85 South Prospect Street Burlington VT 05405",
                "careers": ["Web Development", "Data Science", "Business"],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
            })
            .expect(400);
    });

    test('Should not create a bootcamp with empty name', async () => {
        await request(app)
            .post(`${url}`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                "name": '',
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
                "website": "https://codemasters.com",
                "phone": "(333) 333-3333",
                "email": "enroll@codemasters.com",
                "address": "85 South Prospect Street Burlington VT 05405",
                "careers": ["Web Development", "Data Science", "Business"],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
            })
            .expect(400);
    });

    test('Should not create a bootcamp with empty description', async () => {
        await request(app)
            .post(`${url}`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                "name": 'Testing Bootcamp Fields',
                "description": "",
                "website": "https://codemasters.com",
                "phone": "(333) 333-3333",
                "email": "enroll@codemasters.com",
                "address": "85 South Prospect Street Burlington VT 05405",
                "careers": ["Web Development", "Data Science", "Business"],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
            })
            .expect(400);
    });

    test('Should not create a bootcamp with invalid url', async () => {
        await request(app)
            .post(`${url}`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                "name": 'Testing Bootcamp Fields',
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
                "website": "notvalidurl",
                "phone": "(333) 333-3333",
                "email": "enroll@codemasters.com",
                "address": "85 South Prospect Street Burlington VT 05405",
                "careers": ["Web Development", "Data Science", "Business"],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
            })
            .expect(400);
    });

    test('Should not create a bootcamp with invalid phone number', async () => {
        await request(app)
            .post(`${url}`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                "name": 'Testing Bootcamp Fields',
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
                "website": "https://codemasters.com",
                "phone": "(333) 333-33333333333333333333333333333",
                "email": "enroll@codemasters.com",
                "address": "85 South Prospect Street Burlington VT 05405",
                "careers": ["Web Development", "Data Science", "Business"],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
            })
            .expect(400);
    });

    test('Should not create a bootcamp with invalid email', async () => {
        await request(app)
            .post(`${url}`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                "name": 'Testing Bootcamp Fields',
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
                "website": "https://codemasters.com",
                "phone": "(333) 333-3333",
                "email": "invalidemail",
                "address": "85 South Prospect Street Burlington VT 05405",
                "careers": ["Web Development", "Data Science", "Business"],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
            })
            .expect(400);
    });

    test('Should not create a bootcamp with empty address', async () => {
        await request(app)
            .post(`${url}`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                "name": 'Testing Bootcamp Fields',
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
                "website": "https://codemasters.com",
                "phone": "(333) 333-3333",
                "email": "enroll@codemasters.com",
                "address": "",
                "careers": ["Web Development", "Data Science", "Business"],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
            })
            .expect(400);
    });

    test('Should not create a bootcamp with empty address', async () => {
        await request(app)
            .post(`${url}`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                "name": 'Testing Bootcamp Fields',
                "description": "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in full stack web development and data science",
                "website": "https://codemasters.com",
                "phone": "(333) 333-3333",
                "email": "enroll@codemasters.com",
                "address": "",
                "careers": ["Web Development", "Data Science", "Business"],
                "housing": false,
                "jobAssistance": false,
                "jobGuarantee": false,
                "acceptGi": false
            })
            .expect(400);
    });
});


/* 
*   Test suite for the update bootcamp PUT request
*/
describe('Test the update bootcamp PUT request', () => {
    test('Should update a bootcamp', async () => {
        await request(app)
            .put(`${url}/${bootcampOneId}`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send({
                housing: false
            })
            .expect(200);

        // Assertions about the response
        const updatedBootcamp = await Bootcamp.findById(bootcampOneId);
        expect(updatedBootcamp.housing).toBe(false);
    });

    test('Should not update a bootcamp if the user is not logged in', async () => {
        await request(app)
            .put(`${url}/${bootcampOneId}`)
            .send({
                housing: false
            })
            .expect(401);
    });

    test('Should not update a bootcamp if the user is not authorized', async () => {
        await request(app)
            .put(`${url}/${bootcampOneId}`)
            .set('Authorization', `Bearer ${userUser.tokens[0].token}`)
            .send({
                housing: false
            })
            .expect(403);
    });
});


/* 
*   Test suite for the delete bootcamp DELETE request
*/
describe('Test the delete bootcamp DELETE request', () => {
    test('Should delete a bootcamp', async () => {
        await request(app)
            .delete(`${url}/${bootcampTwoId}`)
            .set('Authorization', `Bearer ${userAdmin.tokens[0].token}`)
            .send()
            .expect(200);
    });
});
