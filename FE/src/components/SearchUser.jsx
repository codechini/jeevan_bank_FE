import axios from 'axios';
import React, { useState } from 'react';

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

  return (
    <div>
      {/* <h2>Search User by ID</h2> */}
      <div>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userData && (
        <div>
          <h3>User Details</h3>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          {/* You can add more fields here as per your user object structure */}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
