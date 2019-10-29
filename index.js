// implement your API here.
const db = require('./data/db.js')
console.log('this is working');

const express = require('express')

const server = express()

const port = 5000
server.listen(port, () => console.log(`listening on port ${port}`))

server.use(express.json())

server.get('/api/users', (req, res) => {

 db.find()
 .then(users => res.status(200).json(users))
 .catch(err => {
 console.log(err);
 res.status(500).json({ error: "The user's information could not be retrieved"})
 })
});

//Post for users
server.post('/api/users', async(req, res) => {
 const user = req.body;
 try {
    const addUserId = await db.insert(user)
    console.log(addUserId);
    const addUser = await db.findById(addUserId.id)
    return res.status(201).json(addUser)
 } catch(err) {
    res.status(500).json({ error: "There was an error while saving the user to the database"}) 
 }
 
//  return res.status(201).json(addUserId)
//  .then(userId => db.findById(userId))
//  .then(user => {
//     res.status(201).json(addUser)
//  })
//   .catch(err => {
//  console.log(err);
//  res.status(500).json({errorMessage: "Please provide name and bio for the user."})
//   })   
})

//Get specific user
server.get('/api/users/:id', (req, res) => {
 const id = req.params.id;
 db.findById(id)
 .then(user => {
 if(user) {
 res.status(200).json(user);
 } else {
 res.status(404).json({message: "The user with the specified ID does not exist"})
  }
 })
 .catch(err => {
 console.log(err);
 res.status(500).json({error: "The user information could not be retrieved"})
 });
})


//Delete request
server.delete('/api/users/:id', (req, res) => {
const id = req.params.id; 
db.remove(id)
.then(() => res.status(204).end())
.catch(err => console.log(err))
res.status(500).json({error: "The user could not be removed"});
});

//Put request
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id; 
  const { name, bio } = req.body
  if (!name && !bio) {
 res.status(400).json({errorMessage: "Please provide name and bio for the user."})    
  } 
  db.update(id, { name, bio})
  .then(update => {
 if(update) {
  db.findById(id)
  .then(user => res.status(200).json(user))
  .catch(err => {
    console.log(err);
    res.status(500).json({error: "Unable to retrieve user"})
  });
 } else {
 res.status(404).json({error: `User with id ${id} not found`})
 }
  })
  .catch(err => {
  console.log(err);
  res.status(500).json({error: "The user information could not be modified."})
  })
}) 




