const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = []; // In-memory users array (replace with DB in production)

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register Controller
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and store in users array
    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed', error });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error });
  }
};
