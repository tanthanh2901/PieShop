import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { register } from '../api/AuthorizationApi';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      email,
      password,
      confirmPassword,
    };

    try {
        const response = await register(registerData)
  
        if (response.status === 200) {
          navigate('/login');
        } else {
          // Handle errors, e.g., show an error message
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>Sign up</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>
        <input 
          type="email" 
          className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input 
          type="password" 
          className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Confirm password' 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      
        <div className='w-full flex justify-between text-sm mt-[-8px]'>       
          <p className=' cursor-pointer'></p>
          <Link to='/login'>
            <p className=' cursor-pointer'>Login here</p>
          </Link>
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>Sign up</button>
      </form>
    </>
    
  );
};

export default Register;
