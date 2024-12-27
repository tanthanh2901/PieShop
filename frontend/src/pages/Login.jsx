import React, { useContext, useState } from 'react';
import { Link  } from 'react-router-dom';
import { UserInfoContext } from '../context/UserInfoContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {handleLogin} = useContext(UserInfoContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
        email,
        password,
        rememberMe,
    };
    
    try {
      await handleLogin(loginData);
      // If login is successful, loading state will be handled by the context
    } catch (error) {
      // Handle login error
      // Make sure to set loading state back to false
      setIsLoading(false);
    } finally {
      // Ensure loading state is always turned off 
      // if something unexpected happens
      setIsLoading(false);
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>Login</p>
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
        <div className="w-full text-sm mt-[-8px]">
          <input
            type="checkbox"
            id="form2Example3"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="form2Example3">
             Remember me
          </label>
        </div>
        <div className='w-full flex justify-between text-sm mt-[-8px]'>       
          <p className=' cursor-pointer'>Forgot your password?</p>
          <Link to='/register'>
            <p className=' cursor-pointer'>Create account</p>
          </Link>
        </div>
        <button 
        type="submit" 
        disabled={isLoading}
        className={`
          bg-black 
          text-white 
          font-light 
          px-8 
          py-2 
          mt-4
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
      </form>
    </>
    
  );
};

export default Login;
