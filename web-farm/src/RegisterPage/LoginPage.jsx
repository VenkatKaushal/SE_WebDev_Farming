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
}

export default LoginPage;
