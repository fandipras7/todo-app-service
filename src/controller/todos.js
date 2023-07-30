const pool = require('../config/db')
const todosModel = require('../models/todos')
const createError = require('http-errors')

const createTodo = (req, res, next) => {
  const { title, activityId, priority, id } = req.body
  try {
    todosModel.insertTodo({ title, activityId, priority })
    res.status(201).json({
      status: true,
      message: 'Data todo berhasil ditambahkan'
    })
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

const selectTodo = async (req, res, next) => {
  try {
    const id = req.params.id
    const { rows } = await todosModel.selectTodo(id)
    res.status(200).json({
      status: true,
      message: 'Berhasil mengambil data',
      data: rows
    })
  } catch (error) {
    next(new createError.InternalServerError())
  }
}

const updateTodo = async (req, res, next) => {
  try {
    const id = req.params.id
    const { title, isActive, priority } = req.body
    const { rowCount } = await todosModel.updateTodo(title, isActive, priority, id)
    if (rowCount) res.status(201).json({ status: true, message: 'Update data berhasil' })
    next(new Error('Id tidak ditemukan'))
  } catch (error) {
    next(new createError.InternalServerError())
  }
}

const deleteTodo = async (req, res, next) => {
  try {
    const id = req.params.id
    const { rowCount } = await todosModel.deleteTodo(id)
    if (rowCount) res.status(200).json({ status: true, message: 'Delete todo berhasil' })
    next(new Error('Id tidak ditemukan'))
  } catch (error) {
    next(new createError.InternalServerError())
  }
}

const deleteAllTodo = async (req, res, next) => {
  try {
    const id = req.params.activityId
    const { rowCount } = await todosModel.deleteAllTodo(id)
    if (rowCount) return res.status(200).json({ status: true, message: 'Delete todo berhasil' })
    next(new Error('Id tidak ditemukan'))
  } catch (error) {
    next(new createError.InternalServerError())
  }
}

module.exports = {
  createTodo,
  updateTodo,
  selectTodo,
  deleteTodo,
  deleteAllTodo
}
