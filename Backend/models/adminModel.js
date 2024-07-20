const pool = require('../database/db');

const findAdminByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);
  return result.rows[0];
};

const createAdmin = async (user) => {
  const { email, password } = user;
  const result = await pool.query(
    'insert into admin (email, password) values ($1, $2) returning *',
    [email, password]
  );
  return result.rows[0];
};

module.exports = {
  findAdminByEmail,
  createAdmin,
};
