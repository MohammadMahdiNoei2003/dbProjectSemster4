const pool = require('../database/db');

const findAllReps = async () => {
  try {
    const result = await pool.query('SELECT * FROM Representative');
    return result.rows;
  } catch (err) {
    console.error('Error finding all representatives:', err);
    return [];
  }
};


const findRepByID = async (id) => {
  const result = await pool.query(
    'select * from Representative where rep_number = $1',
    [id]
  );
  return result.rows[0];
};

const findRepCode = async (code) => {
  try {
    const result = await pool.query(
      'SELECT COUNT(*) FROM Representative WHERE repersenting_code = $1',
      [code]
    );
    return parseInt(result.rows[0].count, 10);
  } catch (err) {
    console.error('Error finding representative code:', err);
    throw err;
  }
};

const createRep = async (repData, gender) => {
  const { first_name, last_name, repersenting_code } = repData;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const genderResult = await client.query(
      'select gender_id from Gender where gender_title = $1',
      [gender]
    );
    let genderId;
    if (genderResult.rows.length === 0) {
      const newGender = await client.query(
        'INSERT INTO Gender (gender_title) VALUES ($1) RETURNING gender_id',
        [gender]
      );
      genderId = newGender.rows[0].gender_id;
    } else {
      genderId = genderResult.rows[0].gender_id;
    }

    const newRep = await client.query(
      'insert into Representative (first_name, last_name, repersenting_code, gender_id) values ($1, $2, $3, $4) returning *',
      [first_name, last_name, repersenting_code, genderId]
    );
    await client.query('COMMIT');
    return newRep.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};
const updateRep = async (id, repData, gender) => {
  const { first_name, last_name, repersenting_code } = repData;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const genderResult = await client.query(
      'SELECT gender_id FROM Gender WHERE gender_title = $1',
      [gender]
    );

    let genderId;
    if (genderResult.rows.length === 0) {
      const newGender = await client.query(
        'INSERT INTO Gender (gender_title) VALUES ($1) RETURNING gender_id',
        [gender]
      );
      genderId = newGender.rows[0].gender_id;
    } else {
      genderId = genderResult.rows[0].gender_id;
    }

    const updatedRep = await client.query(
      'UPDATE Representative SET first_name = $1, last_name = $2, repersenting_code = $3, gender_id = $4 WHERE rep_number = $5 RETURNING *',
      [first_name, last_name, repersenting_code, genderId, id]
    );

    await client.query('COMMIT');
    return updatedRep.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error updating representative:', err);
    throw new Error('Failed to update representative');
  } finally {
    client.release();
  }
};


const deleteRep = async (id) => {
  await pool.query('delete from Representative where rep_number = $1', [id]);
};

const totalCount = async () => {
  const result = await pool.query('SELECT COUNT(*) AS count FROM Representative');
  return parseInt(result.rows[0].count, 10);
};

const findGenderByID = async (id) => {
  try {
    const result = await pool.query('SELECT gender_title FROM Gender WHERE gender_id = $1', [id]);
    return result.rows.length ? result.rows[0].title : 'Unknown';
  } catch (err) {
    console.error('Error finding gender by ID:', err);
    return 'Unknown';
  }
};

const findAllRepsWithGender = async () => {
  try {
    const result = await pool.query(`
      SELECT
        r.rep_number,
        r.first_name,
        r.last_name,
        r.repersenting_code,
        g.gender_title AS gender
      FROM
        Representative r
      JOIN
        Gender g ON r.gender_id = g.gender_id
    `);
    return result.rows;
  } catch (err) {
    console.error('Error finding all representatives with gender:', err);
    return [];
  }
}

const findRepsWithGenderByID = async (id) => {
  try {
    const result = await pool.query(`
      SELECT
        r.rep_number,
        r.first_name,
        r.last_name,
        r.repersenting_code,
        g.gender_title AS gender
      FROM
        Representative r
      JOIN
        Gender g ON r.gender_id = g.gender_id
      WHERE 
        rep_number = $1
    `,[id]);
    return result.rows[0];
  } catch (err) {
    console.error('Error finding all representatives with gender:', err);
    return [];
  }
}


module.exports = {
  findAllReps,
  findRepByID,
  createRep,
  updateRep,
  deleteRep,
  findRepCode,
  totalCount,
  findGenderByID,
  findAllRepsWithGender,
  findRepsWithGenderByID,
};
