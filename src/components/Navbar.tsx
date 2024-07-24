// src/components/Navbar.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { currentUser, signout } = useAuth();

  const handleLogout = async () => {
    try {
      await signout();
    } catch {
      // Handle logout error if necessary
    }
  };

  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">Home</Link>
          
        </li>
        <li>
          <Link to="/about" className="text-white">About</Link>
        </li>
        <li>
          <Link to="/contact" className="text-white">Contact</Link>
        </li>
        {currentUser ? (
          <>
            <li>
              <button onClick={handleLogout} className="text-white">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin" className="text-white">Sign In</Link>
            </li>
            <li>
              <Link to="/signup" className="text-white">Sign Up</Link>
            </li>
          </>
          
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
