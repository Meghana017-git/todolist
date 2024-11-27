const express = require('express')
const { getAllToDo, createToDo, updateToDo, deleteToDo } = require('../controllers/todoCtrl')


const ToDoRouter = express.Router()

// get = read
// post= send/create
// put = update
// delete = delete

ToDoRouter.get('/getall', getAllToDo)
ToDoRouter.post('/', createToDo)
ToDoRouter.put('/updateToDo/:id', updateToDo)
ToDoRouter.delete('/deleteToDo/:id', deleteToDo)

module.exports = ToDoRouter

