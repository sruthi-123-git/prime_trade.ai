import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api'; // Make sure api is configured with baseURL

function Register() {
  const [name, setName] = useState('');           // Added name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/api/v1/auth/register', { name, email, password }); // Include name
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-xl mb-4">Register</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="block w-full mb-2"
        required
      /><br /><br />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="block w-full mb-2"
        required
      /><br /><br />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="block w-full mb-2"
        required
      /><br /><br />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
}

export default Register;

