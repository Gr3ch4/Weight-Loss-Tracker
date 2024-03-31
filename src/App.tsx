import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Progres from './pages/Progres/Progres';
import Stats from './pages/Stats/Stats';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/progres' element={<Progres />} />
                <Route path='/stats' element={<Stats />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
