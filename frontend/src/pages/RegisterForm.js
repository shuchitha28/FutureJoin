import React, { useState } from 'react';
import { submitApplicant } from '../api';

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'intern',
    resumeLink: '',
    message: '',
  });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await submitApplicant(form);
      if (res.error) setStatus({ type: 'error', message: res.error });
      else {
        setStatus({ type: 'success', message: 'Application submitted. Thank you!' });
        setForm({ name: '', email: '', phone: '', role: 'intern', resumeLink: '', message: '' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error' });
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10 mb-20">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Intern / Volunteer Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-gray-700 font-semibold">Name <span className="text-red-500">*</span></span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
              focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            placeholder="Your full name"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold">Email <span className="text-red-500">*</span></span>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
              focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold">Phone</span>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
              focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="tel"
            placeholder="Optional"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold">Role</span>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
              focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="intern">Intern</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold">Resume link (optional)</span>
          <input
            name="resumeLink"
            value={form.resumeLink}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
              focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="url"
            placeholder="Link to your resume"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold">Message</span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
              focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Anything else you'd like us to know"
          ></textarea>
        </label>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md
            hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {status && status.type && (
        <div
          className={`mt-6 p-4 rounded-md text-center ${
            status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}
