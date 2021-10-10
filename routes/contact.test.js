const request = require("supertest");
const express = require("express");
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/contact", require('../routes/contact'));

test('testing contact post', done => {
    const body = {
        name: 'Nicolas Hasenkopf',
        email: 'testing@gmail.com',
        text: 'Hallo, das ist ein Test'
    }
    request(app)
        .post("/contact")
        .type('form')
        .set('Accept', /application\/json/)
        .send(body)
        .expect(200, done)
        .catch(error => done(error));
});