import React, { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
// import logo from './assets/pexels-pixabay-531880.jpg'
import Header from './Header';

const Form = () => {

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`submitted form with values: ${username},${email},${password}`);
        Axios.post('http://localhost:5000/register', {username,email,password})
  .then(response => console.log(response))
  .catch(error => {
    if (error.response) {
      console.log('Response error', error.response);
    } else if (error.request) {
      console.log('Request error', error.request);
    } else {
      console.log('Error', error.message);
    }
  })
    navigate('/tudu');
    }
  return <>
  <div className='home text-white vh-100' style={{
    height: '92vh',
    // backgroundImage: `url(${logo})`, // Use imported image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
  <Header />
  <div className="containers d-flex justify-content-center align-items-center" style={{ height: '92vh' }}>
      <div className="card br-3" style={{ width: '25rem',background:'transparent',border: '1px solid black',borderRadius: '10px' }}>
        <div className="card-body">
          <h4 className="card-title text-center text-black">REGISTER</h4><br />
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="username" className="form-label text-black">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-black">
                Email address
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
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-black">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="text-center mt-3">
              <a href="/login">Login</a>
            </div>
            <div className="text-center mt-3">
              <a href="/forgetpass">Forgot password?</a>
            </div>
            {/* <div className="text-center mt-3">
              <p>Don't have an account? <a href="#">Sign up</a></p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
    </div>
  </>
}

export default Form
