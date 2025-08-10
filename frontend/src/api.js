const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function submitApplicant(payload) {
  try {
    const res = await fetch(`${API_BASE}/api/applicants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit applicant');
    return data;
  } catch (err) {
    return { error: err.message || 'Network error' };
  }
}

export async function fetchApplicants(adminKey) {
  try {
    const res = await fetch(`${API_BASE}/api/applicants`, {
      headers: { 'x-admin-key': adminKey }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch applicants');
    return data;
  } catch (err) {
    return { error: err.message || 'Network error' };
  }
}

export async function deleteApplicant(adminKey, applicantId) {
  const res = await fetch(`${API_BASE}/api/applicants/${applicantId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${adminKey}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete applicant');
  return data;
}
