const {
  findAllCustomers,
  findCustomerByID,
  createCustomer,
  updateCustomer,
  deleteCustomer,
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
    const customer = await findCustomerByID(req.params.id);
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
  const {
    gender,
    state,
    city,
    address,
    postal_code,
    phone_number,
    line_number,
  } = req.body;
  
  try {
    const phoneData = { phoneNumber: phone_number };
    const lineData = { lineNumber: line_number };
    const newCustomer = await createCustomer(req.body, gender, state, city, address, postal_code, phone_number, line_number);
    return res.status(201).json(newCustomer);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({message: 'Internal server error.'});
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await updateCustomer(req.params.id, req.body);
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.status(201).json(updatedCustomer);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};

exports.deleteCustomer = async (req, res) => {
    try {
        await deleteCustomer(req.params.id);
        return res.status(204).json({message: `customer with id ${req.params.id} deleted`});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Internal server error');
    }
}
