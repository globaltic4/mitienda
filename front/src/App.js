<<<<<<< HEAD
//import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Global TIC 4</h1>
    </div>
=======
import './App.css';
import React from 'react';
import Header from './components/layaout/Header';
import { Footer } from './components/layaout/Footer';
import Home from './components/Home';

//Router traido desde react-router-dom (no confundir con el de express)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className='contenidoPrincipal'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
>>>>>>> 54db539d660e85d8d4b289f221ba90edbcaa5a37
  );
}

export default App;
