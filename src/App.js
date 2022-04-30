import React from 'react';
import './App.css'
import NavBar from './Components/NavBar';
import ToDo from './Components/ToDo';
function App() {
  return (
      <div className='AppBody'>
        <NavBar/>
        <ToDo/>
      </div>
  );
}

export default App;
