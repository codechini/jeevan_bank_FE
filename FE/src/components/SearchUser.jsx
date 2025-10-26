import axios from 'axios';
import React, { useState } from 'react';
import Button from './Button';

const SearchUser = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
      setUserData(response.data);
    } catch (err) {
      setError('User not found or an error occurred.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      setUserData(null); // Clear the user data from view
    } catch (error) {
      setError('Error deleting user.');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Search User by ID</h2>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      {userData && (
        <div className="mt-6">
          <h3 className="mb-4 text-xl font-bold text-center text-gray-800">User Details</h3>
          <div className="p-4 border border-gray-200 rounded-md">
            <p><strong>ID:</strong> {userData.user_id}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <Button variant="delete" onClick={() => handleDelete(userData.user_id)} />
            <Button variant="update" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
