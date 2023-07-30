const express = require('express')
const router = express.Router()
const todosController = require('../controller/todos')

router.post('/', todosController.createTodo)
router.get('/:id', todosController.selectTodo)
router.put('/:id', todosController.updateTodo)
router.delete('/:id', todosController.deleteTodo)
router.delete('/all/:activityId', todosController.deleteAllTodo)

module.exports = router
