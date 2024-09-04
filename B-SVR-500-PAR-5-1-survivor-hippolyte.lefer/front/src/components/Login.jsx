import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import { IoMdKey } from 'react-icons/io';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await fetch('http://localhost:8080/api/employees/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            // Check for unauthorized or forbidden status
            setError('Email or password is incorrect'); // Set a user-friendly error message
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const data = await response.json();
          console.log('Login successful:', data);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Failed to fetch:', error);
        setError('An error occurred. Please try again later.'); // General error message
      }
    } else {
      alert('Veuillez entrer un email et un mot de passe');
    }
  };

  return (
    <div className='w-screen h-screen bg-[#606060] flex justify-center items-center'>
      <div className='bg-white px-16 py-12 max-w-[500px] shadow-xl'>
        <h2 className='text-left font-semibold uppercase text-3xl text-[#4B4B4B]'>Login</h2>
        {error && <div className='text-red-500 mt-2'>{error}</div>} {/* Display error if it exists */}
        <form onSubmit={handleSubmit} className='mt-6'>
          <div className='flex gap-2 items-center border border-gray-300 py-2 px-3'>
            <MdAlternateEmail />
            <input
              className='w-full font-thin border-none focus:outline-none'
              type="email"
              placeholder='Email address*'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='flex gap-2 items-center border border-gray-300 mt-4 py-2 px-3'>
            <IoMdKey />
            <input
              className='w-full font-thin border-none focus:outline-none'
              type="password"
              placeholder='Password*'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='bg-[#606060] text-white px-6 py-2 w-full uppercase font-semibold mt-4 hover:shadow-lg hover:bg-[#000000]'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

