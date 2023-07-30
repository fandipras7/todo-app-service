const pool = require('../config/db')

const insertTodo = ({ title, activityId, priority }) => {
  return pool.query(`INSERT INTO todos(title, activity_group_id, priority)
    VALUES($1, $2, $3)`, [title, activityId, priority])
}

const selectTodo = (id) => {
  return pool.query(`SELECT todos.id, todos.activity_group_id, todos.title,
  todos.is_active, todos.priority FROM todos where activity_group_id = $1`, [id])
}

const deleteAllTodo = (id) => {
  return pool.query('DELETE FROM todos WHERE activity_group_id = $1', [id])
}

const deleteTodo = (id) => {
  return pool.query('DELETE FROM todos WHERE id = $1', [id])
}

const updateTodo = (title, isActive, priority, id) => {
  const query = `UPDATE todos SET 
  title = COALESCE($1, title),
  is_active = COALESCE($2, is_active),
  priority = COALESCE($3, priority)
  WHERE id = $4
  `
  return pool.query(query, [title, isActive, priority, id])
}

const countCategory = () => {
  return pool.query('SELECT COUNT(*) AS total from category;')
}

module.exports = {
  insertTodo,
  selectTodo,
  deleteTodo,
  deleteAllTodo,
  updateTodo,
  countCategory
}
