const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findAdminByEmail, createAdmin } = require('../models/adminModel');

exports.register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    const existingAdmin = await findAdminByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: 'Confirm password is not equal to password' });
    }
    const newAdmin = await createAdmin({
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json(newAdmin);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Internal server error.');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await findAdminByEmail(email);
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Internal server error.');
  }
};
