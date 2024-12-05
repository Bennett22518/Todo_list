import React from 'react';
// import logo from './assets/pexels-pixabay-531880.jpg'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
      };
    
      const handleSignUp = () => {
        navigate('/register')
      };

  return <>
  <div className='home bg-dark text-white'>
    <h1 className="navbar-brand" style={{ fontSize: '50px' ,fontFamily: 'Times New Roman, Times, serif' }}>NEWone</h1>
    <div className="d-flex bg-white justify-content-center align-items-center" style={{
        height: '92vh',
        // backgroundImage: `url(${logo})`, // Use imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        
      <div className="text-center">
      <h1 className="text-center text-black mb-5" style={{ fontWeight: '100' ,fontFamily: 'Times New Roman, Times, serif' }}>Welcome to My Website</h1>
        {/* Login Button */}
        <button
          className="btn btn-primary btn-lg m-2 mb-6"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Sign Up Button */}
        <button
          className="btn btn-secondary btn-lg m-3"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
    </div>
    </>
};

export default Home;
