import React from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className='abc'>
      <div className='wrapper'>
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder='Username' required />
          </div>
          <div className="input-box">
            <input type="password" placeholder='Password' required />
          </div>

          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
