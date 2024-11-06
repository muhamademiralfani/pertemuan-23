/* eslint-disable no-unused-vars */
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/post/:id' element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
