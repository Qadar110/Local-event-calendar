// src/pages/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Sign up successful!');
      navigate('/home'); // Redirect to Home page after successful sign up
    } catch (error) {
      console.error('Error signing up: ', error);
      alert('Error signing up');
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
