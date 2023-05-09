const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin');

exports.login =  async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate and return JWT token
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({ message: 'Admin logged in successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

