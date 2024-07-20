const pool = require('../database/db');

const findAllCustomers = async () => {
  const result = await pool.query('select * from customers c1 inner join address a on c1.address_id = a.address_id inner join city c2 on a.city_id = c2.city_id inner join state s on c2.state_id = s.state_id;');
  return result.rows;
};

const findCustomerByID = async (id) => {
  const result = await pool.query(
    'select * from customers where customer_number = $1',
    [id]
  );
  return result.rows[0];
};

const createCustomer = async (
  customerData,
  gender,
  state,
  city,
  address,
  postalCode,
  phone,
  line
) => {
  const {
    first_name,
    last_name,
    job_title,
    father_name,
    nationality,
    education_grade,
    national_number,
    presenter_number,
    national_code,
    passport_number,
    dob,
    email,
  } = customerData;

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

    const stateResult = await client.query(
      'SELECT state_id FROM State WHERE state_name = $1',
      [state]
    );
    let stateId;
    if (stateResult.rows.length === 0) {
      const newState = await client.query(
        'INSERT INTO State (state_name) VALUES ($1) RETURNING state_id',
        [state]
      );
      stateId = newState.rows[0].state_id;
    } else {
      stateId = stateResult.rows[0].state_id;
    }

    const cityResult = await client.query(
      'SELECT city_id FROM City WHERE city_name = $1 AND state_id = $2',
      [city, stateId]
    );
    let cityId;
    if (cityResult.rows.length === 0) {
      const newCity = await client.query(
        'INSERT INTO City (city_name, state_id) VALUES ($1, $2) RETURNING city_id',
        [city, stateId]
      );
      cityId = newCity.rows[0].city_id;
    } else {
      cityId = cityResult.rows[0].city_id;
    }

    const addressResult = await client.query(
      'SELECT address_id FROM Address WHERE postal_code = $1',
      [postalCode]
    );
    let addressId;
    if (addressResult.rows.length === 0) {
      const newAddress = await client.query(
        'INSERT INTO Address (address, postal_code, city_id) VALUES ($1, $2, $3) RETURNING address_id',
        [address, postalCode, cityId]
      );
      addressId = newAddress.rows[0].address_id;
    } else {
      addressId = addressResult.rows[0].address_id;
    }

    const newCustomer = await client.query(
      `INSERT INTO customers (
        first_name, last_name, job_title, father_name, nationality, education_grade, national_number, presenter_number,
        national_code, passport_number, dob, email, gender_id, address_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [
        first_name,
        last_name,
        job_title,
        father_name,
        nationality,
        education_grade,
        national_number,
        presenter_number,
        national_code,
        passport_number,
        dob,
        email,
        genderId,
        addressId,
      ]
    );

    const customerNumber = newCustomer.rows[0].customer_number;
    console.log('Created Customer:', newCustomer.rows[0]);

    const queries = [];

    if (phone) {
      const phoneQuery = client.query(
        'INSERT INTO PhoneNumber (phone, customer_number) VALUES ($1, $2) RETURNING *',
        [phone, customerNumber]
      );
      queries.push(phoneQuery);
    }

    if (line) {
      const lineQuery = client.query(
        'INSERT INTO LineNumber (line, customer_number) VALUES ($1, $2) RETURNING *',
        [line, customerNumber]
      );
      queries.push(lineQuery);
    }

    const results = await Promise.allSettled(queries);

    console.log('Phone/Line Insert Results:', results);

    const phoneNumberResult = results.find(result => result.status === 'fulfilled' && result.value.command === 'INSERT' && result.value.rows[0] && result.value.rows[0].phone);
    const lineNumberResult = results.find(result => result.status === 'fulfilled' && result.value.command === 'INSERT' && result.value.rows[0] && result.value.rows[0].line);

    await client.query('COMMIT');

    return {
      customer: newCustomer.rows[0],
      phone: phoneNumberResult ? phoneNumberResult.value.rows[0] : null,
      line: lineNumberResult ? lineNumberResult.value.rows[0] : null,
    };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error during transaction:', err);
    throw err;
  } finally {
    client.release();
  }
};



const updateCustomer = async (
  customerData,
  gender,
  state,
  city,
  address,
  postalCode,
  phoneData,
  lineData,
  customerId
) => {
  const {
    first_name,
    last_name,
    job_title,
    father_name,
    nationality,
    education_grade,
    national_number,
    presenter_number,
    national_code,
    passport_number,
    dob,
    email,
  } = customerData;

  const { phone } = phoneData;
  const { line } = lineData;

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

    const stateResult = await client.query(
      'SELECT state_id FROM State WHERE state_name = $1',
      [state]
    );
    let stateId;
    if (stateResult.rows.length === 0) {
      const newState = await client.query(
        'INSERT INTO State (state_name) VALUES ($1) RETURNING state_id',
        [state]
      );
      stateId = newState.rows[0].state_id;
    } else {
      stateId = stateResult.rows[0].state_id;
    }

    const cityResult = await client.query(
      'SELECT city_id FROM City WHERE city_name = $1 AND state_id = $2',
      [city, stateId]
    );
    let cityId;
    if (cityResult.rows.length === 0) {
      const newCity = await client.query(
        'INSERT INTO City (city_name, state_id) VALUES ($1, $2) RETURNING city_id',
        [city, stateId]
      );
      cityId = newCity.rows[0].city_id;
    } else {
      cityId = cityResult.rows[0].city_id;
    }

    const addressResult = await client.query(
      'SELECT address_id FROM Address WHERE postal_code = $1',
      [postalCode]
    );
    let addressId;
    if (addressResult.rows.length === 0) {
      const newAddress = await client.query(
        'INSERT INTO Address (address, postal_code, city_id) VALUES ($1, $2, $3) RETURNING address_id',
        [address, postalCode, cityId]
      );
      addressId = newAddress.rows[0].address_id;
    } else {
      addressId = addressResult.rows[0].address_id;
    }

    const updatedCustomer = await client.query(
      `UPDATE customers SET
        first_name = $1, last_name = $2, job_title = $3, father_name = $4, nationality = $5, education_grade = $6, 
        national_number = $7, presenter_number = $8, national_code = $9, passport_number = $10, dob = $11, email = $12, 
        gender_id = $13, address_id = $14 WHERE customer_id = $15 RETURNING *`,
      [
        first_name,
        last_name,
        job_title,
        father_name,
        nationality,
        education_grade,
        national_number,
        presenter_number,
        national_code,
        passport_number,
        dob,
        email,
        genderId,
        addressId,
        customerId
      ]
    );

    const customerNumber = updatedCustomer.rows[0].customer_number;
    console.log('Updated Customer:', updatedCustomer.rows[0]);

    const queries = [];

    if (phone) {
      const phoneQuery = client.query(
        'UPDATE PhoneNumber SET phone = $1 WHERE customer_number = $2 RETURNING *',
        [phone, customerNumber]
      );
      queries.push(phoneQuery);
    }

    if (line) {
      const lineQuery = client.query(
        'UPDATE LineNumber SET line = $1 WHERE customer_number = $2 RETURNING *',
        [line, customerNumber]
      );
      queries.push(lineQuery);
    }

    const results = await Promise.allSettled(queries);

    console.log('Phone/Line Update Results:', results);

    const phoneNumberResult = results.find(result => result.status === 'fulfilled' && result.value.command === 'UPDATE' && result.value.rows[0] && result.value.rows[0].phone);
    const lineNumberResult = results.find(result => result.status === 'fulfilled' && result.value.command === 'UPDATE' && result.value.rows[0] && result.value.rows[0].line);

    await client.query('COMMIT');

    return {
      customer: updatedCustomer.rows[0],
      phone: phoneNumberResult ? phoneNumberResult.value.rows[0] : null,
      line: lineNumberResult ? lineNumberResult.value.rows[0] : null,
    };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error during transaction:', err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { createCustomer, updateCustomer };


const deleteCustomer = async (id) => {
  await pool.query('delete from customers where customer_number = $1', [id]);
};

module.exports = {
  findAllCustomers,
  findCustomerByID,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
