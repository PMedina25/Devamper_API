const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Bootcamp = require('../../models/Bootcamp');

// Create three types of user in the database (admin, publisher, user)
const userAdminId = new mongoose.Types.ObjectId();
const userPublisherId = new mongoose.Types.ObjectId();
const userUserId = new mongoose.Types.ObjectId();
const userAdmin = {
    _id: userAdminId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    role: 'admin',
    tokens: [{
        token: jwt.sign({ id: userAdminId }, process.env.JWT_SECRET)
    }]
}
const userPublisher = {
    _id: userPublisherId,
    name: 'Publisher',
    email: 'publisher@example.com',
    password: '56what!!',
    role: 'publisher',
    tokens: [{
        token: jwt.sign({ id: userPublisherId }, process.env.JWT_SECRET)
    }]
}
const userUser = {
    _id: userUserId,
    name: 'Mike',
    email: 'user@example.com',
    password: '56what!!',
    role: 'user',
    tokens: [{
        token: jwt.sign({ id: userUserId }, process.env.JWT_SECRET)
    }]
}

// Create three bootcamps in the database
const bootcampOneId = new mongoose.Types.ObjectId();
const bootcampTwoId = new mongoose.Types.ObjectId();
const bootcampThreeId = new mongoose.Types.ObjectId();
const bootcampOne = {
    "_id": bootcampOneId,
    "user": userAdminId,
    "name": "Devworks Bootcamp",
    "description": "Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies you need to get a high paying job as a web developer",
    "website": "https://devworks.com",
    "phone": "(111) 111-1111",
    "email": "enroll@devworks.com",
    "address": "233 Bay State Rd Boston MA 02215",
    "careers": ["Web Development", "UI/UX", "Business"],
    "housing": true,
    "jobAssistance": true,
    "jobGuarantee": false,
    "acceptGi": true
}
const bootcampTwo = {
    "_id": bootcampTwoId,
    "user": userAdminId,
    "name": "ModernTech Bootcamp",
    "description": "ModernTech has one goal, and that is to make you a rockstar developer and/or designer with a six figure salary. We teach both development and UI/UX",
    "website": "https://moderntech.com",
    "phone": "(222) 222-2222",
    "email": "enroll@moderntech.com",
    "address": "220 Pawtucket St, Lowell, MA 01854",
    "careers": ["Web Development", "UI/UX", "Mobile Development"],
    "housing": false,
    "jobAssistance": true,
    "jobGuarantee": false,
    "acceptGi": true
}
const bootcampThree = {
    "_id": bootcampThreeId,
    "user": userPublisherId,
    "name": "Codemasters",
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
}

// Insert the data created previously into the database
const setupDatabase = async () => {
    await User.deleteMany();
    await Bootcamp.deleteMany();
    await new User(userAdmin).save();
    await new User(userPublisher).save();
    await new User(userUser).save();
    await new Bootcamp(bootcampOne).save();
    await new Bootcamp(bootcampTwo).save();
    await new Bootcamp(bootcampThree).save();
}

module.exports = {
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
}