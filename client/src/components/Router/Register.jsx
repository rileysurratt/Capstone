import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import your CSS file

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        email,
        password,
        name,
        address,
      });

      // Handle successful registration (e.g., redirect to login)
      console.log('Registration successful:', response.data);
      // ... (redirect logic)
      setSuccess(true); // Set success state to true
      setError(null); // Clear any previous errors
      // Clear form fields
      setEmail('');
      setPassword('');
      setName('');
      setAddress('');

    } catch (error) {
      setError(error.response.data.message || 'Registration failed');
      setSuccess(false); // Ensure success message is hidden if an error occurs
    }
  };

  return (

    <div className="register-container">
          {success && <p className="success-message">User registered successfully!</p>}
      <h1>Register</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
