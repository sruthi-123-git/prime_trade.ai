import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link><br/><br/>
        <Link to="/profile">Profile</Link><br/><br/>
      </div>
      <div>
        {token ? (
          <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link><br/><br/>
            <Link to="/register">Register</Link><br/><br/>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
