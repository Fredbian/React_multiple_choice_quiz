import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import Quiz from './pages/Quiz'
import Signup from './pages/Signup'



export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
  );
}

