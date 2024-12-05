import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom'
// import logo from './assets/pexels-pixabay-531880.jpg'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/login', { email, password});
        if(response.data.statuscode===200){
          sessionStorage.setItem('token',response.data.token)
          sessionStorage.setItem('email',email)
          navigate('/tudu')
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.error || 'An error occurred');
        setIsLoggedIn(false);
      }
  };

  return <>
  <div className='home text-white vh-100' style={{
    height: '92vh',
    // backgroundImage: `url(${logo})`, // Use imported image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
    <Header />
    <div className="containers d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
    <div className="card" style={{ width: '25rem',background:'transparent',border: '1px solid black',borderRadius: '10px'}}>
        <br />
        <div className="card-body">
    <h3 className="card-title text-center text-black">Login</h3>
    {isLoggedIn ? (
        <h2 className="card-title text-center ">Login successful</h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="form-label text-black">Email</label>
            <input 
              type="email" 
              className="form-control"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div>
            <label className="form-label text-black">Password</label>
            <input 
              type="password" 
              className="form-control"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div><br />
          <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          {errorMessage && <p>{errorMessage}</p>}
          <br />
        </form>
      )}
    </div>
    </div>
    </div>
    </div>
    </>
};

export default LoginForm;
