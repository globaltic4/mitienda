import "./App.css";
import Landing from "./Landing";
import Navbar from "./Navbar";
import React from 'react';

function App() {
  return (
    <div className="App">
      <h6>Hola mundo desde app</h6>

      <Navbar />
      <Landing />
    </div>
  );
}

export default App;