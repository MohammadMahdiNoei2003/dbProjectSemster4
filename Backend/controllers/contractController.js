const {
  findAllContracts,
  totalCount,
  createContract,
  updateContract,
  deleteContract,
  findAllContractsWithRequestType,
  findContractWithRequestTypeByID,
} = require('../models/contractModel');
const pool = require('../database/db');

exports.getAllContracts = async (req, res) => {
  try {
    const contracts = await findAllContractsWithRequestType();
    const count = await totalCount();
    return res.status(200).json({ data: contracts, totalCount: count });
  } catch (err) {
    console.error('Error in getAllReps:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getContractByID = async (req, res) => {
  try {
    const contract = await findContractWithRequestTypeByID(req.params.id);
    console.log(contract);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    return res.status(200).json(contract);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};

exports.postContract = async (req, res) => {
  const { req_type } = req.body;

  try {
    const newContract = await createContract(req.body, req_type);
    return res.status(201).json(newContract);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.putContract = async (req, res) => {
  try {
    const { subscription_code, customer_number, rep_number, request } = req.body;
    const result = await pool.query('SELECT req_id FROM RequestType WHERE request = $1', [request]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid request type' });
    }
    const req_id = result.rows[0].req_id;

    const updatedContract = await updateContract(req.params.id, { subscription_code, customer_number, rep_number }, request);
    return res.status(200).json({ message: `Contract with id ${req.params.id} updated`, contract: updatedContract });
  } catch (err) {
    console.error('Error updating Contract:', err);
    return res.status(500).json('Internal server error');
  }
};


exports.deleteContract = async (req, res) => {
  try {
    await deleteContract(req.params.id);
    return res
      .status(204)
      .json({ message: `Contract with id ${req.params.id} deleted` });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};

exports.countAllContracts = async (req, res) => {
  try {
    const total = await totalCount();
    return res.status(200).json(total);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};
