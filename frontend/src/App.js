import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import RegisterForm from './pages/RegisterForm';
import AdminView from './pages/AdminView';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';

export default function App() {
  return (
    <div className="app flex flex-col min-h-screen">
      <Navbar />

      <main className="main flex-grow  mx-auto w-full p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/admin" element={<AdminView/>} />
        </Routes>
      </main>
      <Footer />
    </div>  
  );
}

