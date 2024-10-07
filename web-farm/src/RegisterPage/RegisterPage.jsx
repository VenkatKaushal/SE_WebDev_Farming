import React from 'react';
import './RegisterPage.css';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <div className='abc'>
      <div className='wrapper'>
        <form action="">
          <h1>Register</h1>
          <div className="input-box">
            <input type="text" placeholder='Username' required />
          </div>
          
          <div className="input-box">
            <input type="password" placeholder='Password' required />
          </div>

          <div className="input-box">
            <input type="password" placeholder='Confirm Password' required />
          </div>

          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Register</button>

          <div className="register-link">
            <p>Do you have an account? <Link to="/login">Log In</Link></p> 
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
