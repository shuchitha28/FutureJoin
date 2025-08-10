import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex items-center justify-center mt-24 p-14">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full text-center transform hover:scale-[1.02] transition-transform duration-300">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          Welcome to <span className="text-indigo-800">FutureJoin</span>
        </h1>
        <p className="text-gray-600 mb-6">
          Apply as an <strong className="text-indigo-700">intern</strong> or <strong className="text-indigo-700">volunteer</strong> and take the next step in your journey.
        </p>
        <Link
          to="/register"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
}
