const express = require('express')
const router = express.Router()
const { todoqueries } = require('../controllers/todosController')

// index Route
router.get('/', todoqueries.getAlltodos)

// create a todo 
router.post('/',todoqueries.createTodo)

// update a route
router.put('/:todoid',todoqueries.updateTask)

// delete a todo
router.delete('/:todoid',todoqueries.deleteTodo)

module.exports = router