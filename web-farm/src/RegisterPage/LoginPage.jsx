import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:3000/api/auth/login', {
        username,
        password,
      });

      // Assuming the backend returns a token in the response
      const token = res.data.token;
      // Save the token to localStorage (or cookie) for future requests
      localStorage.setItem('authToken', token);
      console.log(response.data); // Handle success response
      // Redirect to a protected route after successful login
      navigate('/login');  // Change '/dashboard' to the appropriate route
    } catch (error) {
      console.error('Error during login:', error.response?.data?.msg || error.message);
      setError(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className='abc'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          
          {error && <div className="error-message">{error}</div>}

          <div className="input-box">
            <input 
              type="text" 
              placeholder='Username' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="input-box">
            <input 
              type="password" 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <Link to="/forgotpassword">Forgot password?</Link>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <p>Don't have an account? <Link to="/signup">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
