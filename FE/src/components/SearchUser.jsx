import { useState } from 'react';
import Button from './Button';

const SearchUser = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
  });

  const handleSearch = async () => {
    if (!userId) {
      setError('Please enter a user ID');
      setUserData(null);
      return;
    }
    setLoading(true);
    setError('');
    setUserData(null);
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/${userId}`, {
        headers: getAuthHeaders(),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setUserData(result.data);
      } else {
        setError(result.message || 'User not found');
      }
    } catch (err) {
      setError('An error occurred while searching.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        setUserData(null);
        setError('');
      } else {
        const result = await response.json();
        setError(result.message || 'Error deleting user.');
      }
    } catch (error) {
      setError('Error deleting user.');
      console.error('Error deleting user:', error);
    }
  };

  const handleToggleUserStatus = async (id, isCurrentlyActive) => {
    const endpoint = isCurrentlyActive
      ? `http://localhost:8080/api/admin/users/${id}/deactivate`
      : `http://localhost:8080/api/admin/users/${id}/activate`;
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: getAuthHeaders(),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setUserData((prev) => ({ ...prev, isActive: !isCurrentlyActive }));
      } else {
        setError(result.message || 'Failed to toggle status');
      }
    } catch (err) {
      setError('Error toggling user status.');
      console.error(err);
    }
  };

  const handleChangeRole = async (id, currentRole) => {
    const newRole = currentRole === 'USER' ? 'ADMIN' : 'USER';
    const confirmed = window.confirm(`Change role from ${currentRole} to ${newRole}?`);
    if (!confirmed) return;
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/${id}/role`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ role: newRole }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setUserData((prev) => ({ ...prev, role: newRole }));
      } else {
        setError(result.message || 'Failed to change role');
      }
    } catch (err) {
      setError('Error changing role.');
      console.error(err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="w-full max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center text-purple-800">Search User Account</h2>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className="px-4 py-2 border border-purple-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      {loading && (
        <div className="flex justify-center my-8">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {userData && !loading && (
        <div className="mt-6 space-y-6">
          {/* Card 1 — User Account Info */}
          <div className="p-4 border border-purple-200 rounded-md">
            <h3 className="mb-3 text-lg font-bold text-purple-800">User Account</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <p><strong>User ID:</strong> <span className="text-sm break-all">{userData.userId}</span></p>
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p>
                <strong>Role:</strong>{' '}
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  userData.role === 'ADMIN' ? 'bg-purple-200 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {userData.role}
                </span>
              </p>
              <p><strong>Created At:</strong> {formatDate(userData.createdAt)}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  userData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {userData.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>

          {/* Card 2 — Account Holder Info (only if holderId is set) */}
          {userData.holderId && (
            <div className="p-4 border border-purple-200 rounded-md">
              <h3 className="mb-3 text-lg font-bold text-purple-800">Account Holder Details</h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <p><strong>Holder ID:</strong> {userData.holderId}</p>
                <p><strong>First Name:</strong> {userData.firstName || '—'}</p>
                <p><strong>Last Name:</strong> {userData.lastName || '—'}</p>
                <p><strong>Date of Birth:</strong> {userData.dateOfBirth || '—'}</p>
                <p><strong>Phone:</strong> {userData.phone || '—'}</p>
                <p><strong>Address:</strong> {userData.address || '—'}</p>
                <p><strong>Citizenship ID:</strong> {userData.citizenshipId || '—'}</p>
              </div>
            </div>
          )}

          {/* Card 3 — Bank Accounts (only if accounts array is present and non-empty) */}
          {userData.accounts && userData.accounts.length > 0 && (
            <div className="p-4 border border-purple-200 rounded-md">
              <h3 className="mb-3 text-lg font-bold text-purple-800">Bank Accounts</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-purple-200">
                      <th className="px-3 py-2 font-semibold">Account ID</th>
                      <th className="px-3 py-2 font-semibold">Account Number</th>
                      <th className="px-3 py-2 font-semibold">Type</th>
                      <th className="px-3 py-2 font-semibold">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.accounts.map((acc) => (
                      <tr key={acc.accountId} className="border-b border-purple-100 hover:bg-purple-50">
                        <td className="px-3 py-2 text-xs break-all">{acc.accountId}</td>
                        <td className="px-3 py-2">{acc.accountNumber}</td>
                        <td className="px-3 py-2">{acc.accountType}</td>
                        <td className="px-3 py-2">
                          {acc.balance != null ? `$${Number(acc.balance).toFixed(2)}` : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-purple-200">
            {userData.isActive != null && (
              <Button
                variant={userData.isActive ? 'deactivate' : 'activate'}
                onClick={() => handleToggleUserStatus(userData.userId, userData.isActive)}
              />
            )}
            <Button
              variant="changeRole"
              onClick={() => handleChangeRole(userData.userId, userData.role)}
            />
            <Button variant="delete" onClick={() => handleDelete(userData.userId)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
