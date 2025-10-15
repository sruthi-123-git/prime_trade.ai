const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define User model (should match your schema.sql table)
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  }
}, {
  timestamps: true
});

async function createSampleUser() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync models with DB (make sure table exists)
    await sequelize.sync();

    const email = 'sample@example.com';
    const plainPassword = 'password123';

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log(`User with email ${email} already exists.`);
      return;
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await User.create({
      email,
      password: hashedPassword,
      role: 'user'
    });

    console.log('Sample user created successfully!');
  } catch (error) {
    console.error('Error creating sample user:', error);
  } finally {
    await sequelize.close();
  }
}

createSampleUser();
