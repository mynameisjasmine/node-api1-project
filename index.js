// implement your API here
const db = require('./data/db')
console.log('this is working');

const express = require('express')

const server = express()

const port = 5000
server.listen(port, () => console.log(`listening on port ${port}`))

server.use(express.json())
server.get('/users', (req, res) => {
 db.find()
 .then(users => {
 res.status(200).json(users)
 })
 .catch(err => {
 console.log(err);
 res.status(500).json({ error: 'failed to get users'})
 })
})




//Create a user using the information sent inside the request body.
server.post('/users', (req, res) => {
 const user = req.body;

 res.json(user)
})
