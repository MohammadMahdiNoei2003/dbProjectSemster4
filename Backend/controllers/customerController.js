const {
  findAllCustomers,
  findCustomerByID,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  findAllCustomerDataByID,
} = require('../models/customerModel');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await findAllCustomers();
    return res.json(customers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};

exports.getCustomerByID = async (req, res) => {
  try {
    const customer = await findAllCustomerDataByID(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.status(200).json(customer);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};

exports.postCustomer = async (req, res) => {
  const { gender, state, city, address, postal_code, phone, line } = req.body;

  try {
    const newCustomer = await createCustomer(
      req.body,
      gender,
      state,
      city,
      address,
      postal_code,
      phone,
      line
    );
    return res.status(201).json(newCustomer);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.updateCustomer = async (req, res) => {
  const customerId = req.params.id;
  const customerData = req.body;
  const gender = req.body.gender;
  const state = req.body.state;
  const city = req.body.city;
  const address = req.body.address;
  const postalCode = req.body.postalCode;
  const phoneData = req.body.phone;
  const lineData = req.body.line;

  try {
    const result = await updateCustomer(
      customerData,
      gender,
      state,
      city,
      address,
      postalCode,
      phoneData,
      lineData,
      customerId
    );
    res.status(200).json(result);
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await deleteCustomer(req.params.id);
    return res
      .status(204)
      .json({ message: `customer with id ${req.params.id} deleted` });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};

exports.addCustomer = async (req, res) => {
  try {
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
      gender_id,
      address_id,
    } = req.body;
    const newCustomer = await pool.query(
      'INSERT INTO customers (first_name, last_name, job_title, father_name, nationality, education_grade, national_number, presenter_number, national_code, passport_number, dob, email, gender_id, address_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING customer_number',
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
        gender_id,
        address_id,
      ]
    );
    console.log('New customer number:', newCustomer.rows[0].customer_number); // لاگ شماره مشتری جدید
    const customerNumber = newCustomer.rows[0].customer_number;
    return res
      .status(201)
      .json({ message: 'Customer added successfully', customerNumber });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};
