const activityModel = require('../models/activity')
const todosModel = require('../models/todos')
const createError = require('http-errors')

const addActivity = async (req, res, next) => {
  try {
    const { title, email } = req.body
    const { rowCount } = await activityModel.newActivity({ title, email })
    if (rowCount) res.json({ status: true, message: 'Berhasil menambah Activity' })
  } catch {
    next(createError.InternalServerError())
  }
}

const getActivity = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 1
    const sort = req.query.sort || 'desc'
    const { email } = req.query
    const offset = (page - 1) * limit
    const { rows } = await activityModel.getActivity({ limit, offset, sort, email })
    const { rows: [count] } = await activityModel.totalActivity()
    const total = count.total
    const totalPage = Math.ceil(parseInt(total) / limit)
    res.json({
      status: true,
      message: 'Berhasil mengambil data',
      data: {
        data: rows,
        pagination: {
          page,
          size: limit,
          total,
          total_page: totalPage
        }
      }
    })
  } catch (error) {
    console.log(error)
    next(createError.InternalServerError())
  }
}

const detailActivity = async (req, res, next) => {
  const { id } = req.params
  try {
    const { rows } = await activityModel.getDetailActivity(id)
    const todoResult = await todosModel.selectTodo(id)

    res.status(200).json({
      status: true,
      message: 'Berhasil mengambil data',
      data: {
        ...rows[0],
        todo_items: todoResult.rows
      }
    })
  } catch (error) {
    next(createError.InternalServerError())
  }
}

const updateActivity = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { title } = req.body
    const { rowCount } = await activityModel.updateActivity({ id, title })
    if (rowCount) res.status(201).json({ status: true, message: 'Update data berhasil' })
    next(new Error('Id tidak ditemukan'))
  } catch (error) {
    console.log(error)
    next(createError.InternalServerError())
  }
}

const deleteActivity = async (req, res, next) => {
  try {
    const id = req.params.id
    const { rowCount } = await activityModel.deleteActivity(id)
    const deleteTodo = await todosModel.deleteAllTodo(id)
    if (rowCount && deleteTodo.rowCount) res.json({ status: true, message: 'Delete data berhasil' })
    next(new Error('Id tidak ditemukan'))
  } catch {
    next(createError.InternalServerError())
  }
}

module.exports = {
  getActivity,
  addActivity,
  detailActivity,
  updateActivity,
  deleteActivity
}
