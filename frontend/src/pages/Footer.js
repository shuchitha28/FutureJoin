import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} FutureJoin. All rights reserved.
      </div>
    </footer>
  );
}
