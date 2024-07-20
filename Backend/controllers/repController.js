const {
  findAllReps,
  findRepByID,
  createRep,
  updateRep,
  deleteRep,
  findRepCode,
  totalCount,
  findAllRepsWithGender,
  findRepsWithGenderByID,
} = require('../models/repModel');

exports.getAllReps = async (req, res) => {
  try {
    const reps = await findAllRepsWithGender();
    const count = await totalCount();
    return res.status(200).json({ data: reps, totalCount: count });
  } catch (err) {
    console.error('Error in getAllReps:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getRepByID = async (req, res) => {
  try {
    const rep = await findRepsWithGenderByID(req.params.id);
    if (!rep) {
      return res.status(404).json({ message: 'Representative not found' });
    }
    return res.status(200).json(rep);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};

exports.postRep = async (req, res) => {
  const { gender, repersenting_code } = req.body;

  try {
    const existedRepCode = await findRepCode(repersenting_code);
    if (existedRepCode > 0) {
      return res
        .status(400)
        .json({ message: 'Representing code already exists.' });
    }
    const newRep = await createRep(req.body, gender);
    return res.status(201).json(newRep);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.putRep = async (req, res) => {
  const { gender } = req.body;

  try {
    const updatedRep = await updateRep(req.params.id, req.body, gender);
    if (!updatedRep) {
      return res.status(404).json({ message: 'Representative not found' });
    }
    return res.status(201).json(updatedRep);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};

exports.deleteRep = async (req, res) => {
  try {
    await deleteRep(req.params.id);
    return res
      .status(204)
      .json({ message: `Representative with id ${req.params.id} deleted` });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};

exports.countAllReps = async (req, res) => {
  try {
    const total = await totalCount();
    return res.status(200).json(total);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Internal server error');
  }
};
