import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import UpdateAccountHolder from './UpdateAccountHolder';

const SearchUser = () => {
  const location = useLocation();
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAccountId, setEditAccountId] = useState('');
  const [editInitialData, setEditInitialData] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUserForm, setEditUserForm] = useState({ username: '', email: '', firstName: '', lastName: '' });

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
  });

  const searchByUserId = async (id) => {
    if (!id) return;
    setLoading(true);
    setError('');
    setUserData(null);
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/${id}`, {
        headers: getAuthHeaders(),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        const user = result.data;
        if (user?.accounts?.length > 0) {
          const enrichedAccounts = await Promise.all(
            user.accounts.map(async (acc) => {
              const res = await fetch(`http://localhost:8080/api/admin/accounts/${acc.accountId}`, {
                headers: getAuthHeaders(),
              });
              const data = await res.json();
              return { ...acc, balance: data?.data?.balance ?? null };
            })
          );
          setUserData({ ...user, accounts: enrichedAccounts });
        } else {
          setUserData(user);
        }
      } else {
        setError(result.message || 'User not found');
      }
    } catch (err) {
      setError('An error occurred while searching.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!userId) {
      setError('Please enter a user ID');
      setUserData(null);
      return;
    }
    await searchByUserId(userId);
  };

  useEffect(() => {
    const id = location.state?.userId;
    if (id) {
      setUserId(id);
      searchByUserId(id);
    }
  }, []);

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
            <button
              onClick={() => {
                setEditUserForm({
                  username: userData.username || '',
                  email: userData.email || '',
                  firstName: userData.firstName || '',
                  lastName: userData.lastName || '',
                });
                setShowEditUserModal(true);
              }}
              className="px-4 py-2 m-1 text-sm font-semibold text-purple-800 bg-purple-200 rounded-md hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Edit User
            </button>
            <Button variant="delete" onClick={() => handleDelete(userData.userId)} />
            {userData.accounts && userData.accounts.length > 0 && (
              <div className="relative">
                <Button
                  variant="update"
                  onClick={() => setShowAccountSelector((prev) => !prev)}
                >
                  Edit Account
                </Button>
                {showAccountSelector && (
                  <>
                    <div className="absolute right-0 z-40 mt-1 w-72 bg-white border border-purple-200 rounded-md shadow-lg">
                      {userData.accounts.map((acc) => (
                        <button
                          key={acc.accountId}
                          onClick={() => {
                            setEditAccountId(acc.accountId);
                            setEditInitialData({
                              firstName: userData.firstName,
                              lastName: userData.lastName,
                              dateOfBirth: userData.dateOfBirth,
                              phone: userData.phone,
                              address: userData.address,
                              citizenshipId: userData.citizenshipId,
                              accountType: acc.accountType,
                            });
                            setShowAccountSelector(false);
                            setShowEditModal(true);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-purple-50 border-b border-purple-100 last:border-b-0"
                        >
                          <span className="font-medium">{acc.accountNumber}</span>
                          <span className="ml-2 text-xs text-purple-600">({acc.accountType})</span>
                          {acc.balance != null && (
                            <span className="ml-2 text-xs text-gray-500">— ${Number(acc.balance).toFixed(2)}</span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setShowAccountSelector(false)}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Account Holder Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-lg mx-4 p-6 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setShowEditModal(false); setShowAccountSelector(false); }}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              ✕
            </button>
            <UpdateAccountHolder
              mode="modal"
              accountId={editAccountId}
              initialData={editInitialData}
              onClose={() => { setShowEditModal(false); setShowAccountSelector(false); }}
              onSuccess={() => {
                setShowEditModal(false);
                setShowAccountSelector(false);
                handleSearch();
              }}
            />
          </div>
        </div>
      )}

      {/* Edit User Profile Modal */}
      {showEditUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-lg mx-4 p-6 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowEditUserModal(false)}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              ✕
            </button>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const payload = {};
                  if (editUserForm.username) payload.username = editUserForm.username;
                  if (editUserForm.email) payload.email = editUserForm.email;
                  if (editUserForm.firstName) payload.firstName = editUserForm.firstName;
                  if (editUserForm.lastName) payload.lastName = editUserForm.lastName;
                  const response = await fetch(`http://localhost:8080/api/admin/users/${userData.userId}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                    body: JSON.stringify(payload),
                  });
                  const result = await response.json();
                  if (response.ok && result.success) {
                    alert('User updated successfully!');
                    setShowEditUserModal(false);
                    searchByUserId(userData.userId);
                  } else {
                    alert(result.message || 'Failed to update user');
                  }
                } catch (err) {
                  alert('Error updating user');
                }
              }}
            >
              <h3 className="mb-4 text-lg font-bold text-purple-800">Edit User Profile</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="eu-username" className="block mb-1 text-sm font-medium text-purple-600">Username</label>
                  <input
                    id="eu-username" name="username" type="text"
                    value={editUserForm.username}
                    onChange={(e) => setEditUserForm((prev) => ({ ...prev, username: e.target.value }))}
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label htmlFor="eu-email" className="block mb-1 text-sm font-medium text-purple-600">Email</label>
                  <input
                    id="eu-email" name="email" type="email"
                    value={editUserForm.email}
                    onChange={(e) => setEditUserForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label htmlFor="eu-firstName" className="block mb-1 text-sm font-medium text-purple-600">First Name</label>
                  <input
                    id="eu-firstName" name="firstName" type="text"
                    value={editUserForm.firstName}
                    onChange={(e) => setEditUserForm((prev) => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label htmlFor="eu-lastName" className="block mb-1 text-sm font-medium text-purple-600">Last Name</label>
                  <input
                    id="eu-lastName" name="lastName" type="text"
                    value={editUserForm.lastName}
                    onChange={(e) => setEditUserForm((prev) => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Update User
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditUserModal(false)}
                  className="w-full py-2 text-purple-800 bg-purple-200 rounded-md hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
