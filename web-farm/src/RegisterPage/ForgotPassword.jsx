import React from 'react';
import './ForgotPassword.css';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
  return (
    <div className='abc'>
      <div className='wrapper'>
        <form action="">
          <h1>Forgot Password</h1>

          <div className="input-box">
          <input type="date"  required />
          </div>

          <div className="input-box">
            <input type="text" placeholder='Username' required />
          </div>
          
          <div className="input-box">
            <input type="password" placeholder='Enter your new Password' required />
          </div>

          <div className="input-box">
            <input type="password" placeholder='Confirm Password' required />
          </div>

          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
          </div>

          <button type="submit">Forgot Password</button>

          <div className="register-link">
            <p>Back to Login <Link to="/login">Log In</Link></p> 
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
