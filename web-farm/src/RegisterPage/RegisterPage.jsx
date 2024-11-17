import React, { useState } from 'react';
import './RegisterPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, dateOfBirth,email, username, password, confirmPassword } = formData;

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('https://se-webdev-farming.onrender.com/api/auth/register', {
        username,
        email, // Assuming username is being used as email. Adjust if necessary.
        password,
      });

      console.log(response.data); // Handle success response
      // Redirect or show success message
      navigate('/login'); // Navigate to login page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.'); // Show an error message
    }
  };

  return (
    <div className='abc'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className="input-box">
            <input type="text" name="username" placeholder='Username' required onChange={handleChange} />
          </div>

          <div className="input-box">
            <input type="text" name="email" placeholder='Email' required onChange={handleChange} />
          </div>

          <div className="input-box">
            <input type="password" name="password" placeholder='Password' required onChange={handleChange} />
          </div>

          <div className="input-box">
            <input type="password" name="confirmPassword" placeholder='Confirm Password' required onChange={handleChange} />
          </div>

          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
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
