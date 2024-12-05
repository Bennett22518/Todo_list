import './App.css';
import { Routes, Route } from 'react-router';
import Form from './components/Form';
import Login from './components/Login';
import Tudu from './components/Tudu';
import Header from './components/Header';
import ForgetPass from './components/ForgetPass'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/register' element={<Form/>}/>
      <Route path='/forgetpass' element={<ForgetPass/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/tudu' element={<Tudu/>}/>
      <Route path='/header' element={<Header/>}/>
      <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
