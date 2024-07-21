const pool = require('../database/db');

const findAllContracts = async () => {
  const result = await pool.query('select * from customers c join contract c2 on c.customer_number = c2.customer_number join representative r on c2.rep_number = r.rep_number join requesttype r2 ON c2.req_id = r2.req_id');
  return result.rows;
};

const findContractByID = async (id) => {
  const result = await pool.query(
    'select * from contract where contract_number = $1',
    [id]
  );
  return result.rows[0];
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
    const result = await pool.query('DELETE FROM Contract WHERE contract_number = $1', [id]);
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
        WHERE 
          contract_number = $1
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
}
