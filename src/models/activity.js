const pool = require('../config/db')

const newActivity = ({ title, email }) => {
  return pool.query('INSERT into activity_group(title, email)VALUES($1, $2)', [title, email])
}

const getActivity = ({ limit, offset, sort, email }) => {
  return pool.query(
    `SELECT id, title, created_at FROM activity_group WHERE email = $1 OR $1 IS NULL ORDER BY created_at ${sort} LIMIT $2 OFFSET $3`,
    [email, limit, offset])
}

const getDetailActivity = (id) => {
  return pool.query('SELECT id, title, created_at FROM activity_group WHERE id = $1', [id])
}

const updateActivity = ({ id, title }) => {
  return pool.query('UPDATE activity_group SET title = $1 WHERE id = $2', [title, id])
}

const deleteActivity = (id) => {
  return pool.query('DELETE FROM activity_group WHERE id = $1', [id])
}

const totalActivity = () => {
  return pool.query('SELECT COUNT(*) as total from activity_group')
}

module.exports = {
  newActivity,
  getActivity,
  getDetailActivity,
  updateActivity,
  totalActivity,
  deleteActivity
}
