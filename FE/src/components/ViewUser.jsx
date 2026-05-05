import { useEffect, useState } from 'react';
import Button from './Button';

const USERS_PER_PAGE = 10;

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:8080/api/admin/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUsers(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleUserStatus = async (userId, isCurrentlyActive) => {
    const endpoint = isCurrentlyActive
      ? `http://localhost:8080/api/admin/users/${userId}/deactivate`
      : `http://localhost:8080/api/admin/users/${userId}/activate`;

    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.userId === userId
              ? { ...user, isAccountHolderActive: !isCurrentlyActive }
              : user
          )
        );
      } else {
        console.error('Failed to toggle user status:', data.message);
        setError(data.message || 'Failed to toggle user status');
      }
    } catch (err) {
      console.error('Error toggling user status:', err);
      setError('Error toggling user status');
    }
  };

  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, endIndex);
  const remainingUsers = totalUsers - endIndex;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-purple-800">All Users</h2>

        <div className="mb-4 text-sm text-gray-600">
          Showing {startIndex + 1}–{Math.min(endIndex, totalUsers)} of {totalUsers} users
          {remainingUsers > 0 && (
            <span className="ml-2 text-purple-600 font-medium">(+{remainingUsers} more)</span>
          )}
        </div>

        <div className="overflow-x-auto">
          <ul className="space-y-4">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <li key={user.userId} className="p-4 border border-purple-200 rounded-md">
                  <p><strong>ID:</strong> {user.userId}</p>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Status:</strong> {user.isAccountHolderActive ? 'Active' : 'Inactive'}</p>
                  <div className="mt-2">
                    <Button
                      variant={user.isAccountHolderActive ? 'deactivate' : 'activate'}
                      onClick={() => handleToggleUserStatus(user.userId, user.isAccountHolderActive)}
                    />
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-purple-500">No users found.</p>
            )}
          </ul>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-purple-800 bg-purple-200 rounded-md hover:bg-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-purple-800 bg-purple-200 rounded-md hover:bg-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUser;
