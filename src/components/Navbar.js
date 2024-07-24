// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/about" className="mr-4">About</Link>
          <Link to="/contact" className="mr-4">Contact</Link>
        </div>
        <div>
          {currentUser ? (
            <button onClick={logout} className="mr-4">Logout</button>
          ) : (
            <>
              <Link to="/signin" className="mr-4">Signin</Link>
              <Link to="/signup" className="mr-4">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
