import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Progres from './pages/Progres/Progres';
import Stats from './pages/Stats/Stats';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <div className="continer">
              <Navbar />
              <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/progress' element={<Progres />} />
                  <Route path='/stats' element={<Stats />} />
              </Routes>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
