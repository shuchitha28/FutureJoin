import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              FutureJoin
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/register"
              className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Register
            </Link>
            <Link
              to="/admin"
              className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
