const pool = require('../database/db');

const findAllContracts = async () => {
  const result = await pool.query(`select 
	c.first_name , c.last_name , c.national_number , c.national_code , c.presenter_number , c.email , a.address , a.postal_code , c2.city_name ,
	s.state_name , p.phone , l.line , r.first_name , r.last_name , r.repersenting_code , c3.*
	from customers c 
	join address a on c.address_id = a.address_id 
	join city c2 on a.city_id = c2.city_id 
	join state s on c2.state_id = s.state_id 
	join phonenumber p on c.customer_number = p.customer_number 
	join linenumber l on c.customer_number = l.customer_number
	join contract c3 on c.customer_number = c3.customer_number 
	join representative r on c3.rep_number = r.rep_number 
	join requesttype r2 on c3.req_id = r2.req_id`);
  return result.rows;
};

const findContractByID = async (id) => {
  const result = await pool.query(
    `SELECT 
      c.first_name, c.last_name, c.national_number, c.national_code, c.presenter_number, c.email,
      a.address, a.postal_code, c2.city_name,
      s.state_name, p.phone, l.line,
      r.first_name AS rep_first_name, r.last_name AS rep_last_name, r.repersenting_code,
      c3.*
    FROM 
      customers c
      JOIN address a ON c.address_id = a.address_id
      JOIN city c2 ON a.city_id = c2.city_id
      JOIN state s ON c2.state_id = s.state_id
      JOIN phonenumber p ON c.customer_number = p.customer_number
      JOIN linenumber l ON c.customer_number = l.customer_number
      JOIN contract c3 ON c.customer_number = c3.customer_number
      JOIN representative r ON c3.rep_number = r.rep_number
      JOIN requesttype r2 ON c3.req_id = r2.req_id
    WHERE 
      c3.contract_number = $1`,
    [id]
  );

  return result.rows;
};

const createContract = async (contractData, requestType) => {
  const { subscription_code, customer_number, rep_number } = contractData;

  const validRequests = ['new', 'transportation'];

  if (!validRequests.includes(requestType)) {
    throw new Error(`Invalid request type: ${requestType}`);
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const requestResult = await client.query(
      'SELECT req_id FROM RequestType WHERE request = $1',
      [requestType]
    );
    let requestId;
    if (requestResult.rows.length === 0) {
      const newRequest = await client.query(
        'INSERT INTO RequestType (request) VALUES ($1) RETURNING req_id',
        [requestType]
      );
      requestId = newRequest.rows[0].req_id;
    } else {
      requestId = requestResult.rows[0].req_id;
    }

    const newContract = await client.query(
      'INSERT INTO Contract (shuttle_subscription_code, customer_number, rep_number, req_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [subscription_code, customer_number, rep_number, requestId]
    );
    await client.query('COMMIT');
    return newContract.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const updateContract = async (id, contractData, requestType) => {
  const { subscription_code, customer_number, rep_number } = contractData;

  console.log('Updating contract with ID:', id);
  console.log('Contract Data:', contractData);
  console.log('Request Type:', requestType);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const requestResult = await client.query(
      'SELECT req_id FROM RequestType WHERE request = $1',
      [requestType]
    );

    let requestId;
    if (requestResult.rows.length === 0) {
      console.log('Inserting new request type:', requestType);
      const newRequest = await client.query(
        'INSERT INTO RequestType (request) VALUES ($1) RETURNING req_id',
        [requestType]
      );
      requestId = newRequest.rows[0].req_id;
    } else {
      requestId = requestResult.rows[0].req_id;
    }

    console.log('Request ID:', requestId);

    const updatedContract = await client.query(
      'UPDATE Contract SET shuttle_subscription_code = $1, customer_number = $2, rep_number = $3, req_id = $4 WHERE contract_number = $5 RETURNING *',
      [subscription_code, customer_number, rep_number, requestId, id]
    );

    await client.query('COMMIT');
    return updatedContract.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error updating Contract:', err);
    throw new Error('Failed to update Contract');
  } finally {
    client.release();
  }
};

const deleteContract = async (id) => {
  try {
    const result = await pool.query(
      'DELETE FROM Contract WHERE contract_number = $1',
      [id]
    );
    if (result.rowCount === 0) {
      throw new Error('Contract not found');
    }
  } catch (err) {
    console.error('Error deleting contract:', err);
    throw err;
  }
};

const totalCount = async () => {
  const result = await pool.query('SELECT COUNT(*) AS count FROM Contract');
  return parseInt(result.rows[0].count, 10);
};

const findAllContractsWithRequestType = async () => {
  try {
    const result = await pool.query(`
        SELECT
          c.contract_number,
          c.shuttle_subscription_code,
          c.submit_date,
          c.customer_number,
          c.rep_number,
          r.request AS request
        FROM
          Contract c
        inner JOIN
          RequestType r ON c.req_id = r.req_id
      `);
    return result.rows;
  } catch (err) {
    console.error('Error finding all contracts with request type:', err);
    return [];
  }
};

const findContractWithRequestTypeByID = async (id) => {
  try {
    const result = await pool.query(
      `
      SELECT 
      c.customer_number, c.first_name, c.last_name, c.national_number, c.national_code, c.presenter_number, c.email,
      a.address, a.postal_code, c2.city_name,
      s.state_name, p.phone, l.line,
      r.rep_number, r.first_name AS rep_first_name, r.last_name AS rep_last_name, r.repersenting_code, r2.request,
      c3.*
    FROM 
      customers c
      JOIN address a ON c.address_id = a.address_id
      JOIN city c2 ON a.city_id = c2.city_id
      JOIN state s ON c2.state_id = s.state_id
      JOIN phonenumber p ON c.customer_number = p.customer_number
      JOIN linenumber l ON c.customer_number = l.customer_number
      JOIN contract c3 ON c.customer_number = c3.customer_number
      JOIN representative r ON c3.rep_number = r.rep_number
      JOIN requesttype r2 ON c3.req_id = r2.req_id
    WHERE 
      c3.contract_number = $1
      `,
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error finding all contracts with request type:', err);
    return [];
  }
};

module.exports = {
  findAllContracts,
  findContractByID,
  createContract,
  updateContract,
  deleteContract,
  findAllContractsWithRequestType,
  findContractWithRequestTypeByID,
  totalCount,
};
