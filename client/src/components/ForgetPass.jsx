import React, { useState } from 'react';
// import logo from './assets/pexels-pixabay-531880.jpg'
import axios from 'axios'
import Header from './Header';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.message);
      setMessage('');
    }
  };

  
  return <>
  <div className='home text-white' style={{
    height: '100vh',
    // backgroundImage: `url(${logo})`, // Use imported image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
    <Header/>
    <div className="containers d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
      <div className="card" style={{ width: '25rem' ,background:'transparent',border: '1px solid black',borderRadius: '10px'}}>
        <div className="card-body">
          <h4 className="card-title text-center text-black">Forgot Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-black">
                Enter your email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Send Reset Link
              </button>
            </div>
          </form>
          {message && (
            <div className="alert alert-info mt-3" role="alert">
              {message}
            </div>
          )}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <div className="text-center mt-3">
            <a href="/login">Back to Login</a>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
};

export default ForgotPasswordForm;
