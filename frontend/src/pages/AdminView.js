import React, { useState } from 'react';
import { fetchApplicants, deleteApplicant } from '../api'; // make sure deleteApplicant is exported

export default function AdminView() {
  const [adminKey, setAdminKey] = useState('');
  const [applicants, setApplicants] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);           // Success message state
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);

  async function load() {
    setError(null);
    setSuccess(null);
    setApplicants(null);
    try {
      const res = await fetchApplicants(adminKey);
      if (res.error) setError(res.error);
      else setApplicants(res.applicants);
    } catch {
      setError('Network error');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this applicant?')) return;

    setLoadingDeleteId(id);
    setError(null);
    setSuccess(null);
    try {
      const res = await deleteApplicant(adminKey, id);
      if (res.error) setError(res.error);
      else {
        setApplicants((prev) => prev.filter((a) => a._id !== id));
        setSuccess('Applicant deleted successfully.');
      }
    } catch {
      setError('Network error while deleting');
    } finally {
      setLoadingDeleteId(null);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Admin — Applicants</h2>
      <p className="mb-4 text-gray-600">Enter admin key to load applicants.</p>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Admin key"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={load}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
        >
          Load
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md border border-green-300">
          {success}
        </div>
      )}

      {applicants && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-indigo-100 text-indigo-700">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Resume</th>
                <th className="border border-gray-300 px-4 py-2">Message</th>
                <th className="border border-gray-300 px-4 py-2">When</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((a) => (
                <tr
                  key={a._id}
                  className="even:bg-gray-50 hover:bg-indigo-50 transition"
                >
                  <td className="border border-gray-300 px-4 py-2">{a.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{a.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{a.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{a.role}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {a.resumeLink ? (
                      <a
                        href={a.resumeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        link
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {a.message || '-'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(a.createdAt).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      disabled={loadingDeleteId === a._id}
                      onClick={() => handleDelete(a._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      {loadingDeleteId === a._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
