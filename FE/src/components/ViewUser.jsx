import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import UpdateUser from './UpdateUser';

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      setUsers(users.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateComplete = () => {
    setUpdatingUserId(null);
    // Optionally re-fetch users to show updated data
    axios.get('http://localhost:8080/api/users').then(response => setUsers(response.data));
  };

  if (updatingUserId) {
    return <UpdateUser userId={updatingUserId} onUpdateComplete={handleUpdateComplete} />;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">All Users</h2>
        <div className="overflow-x-auto">
          <ul className="space-y-4">
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user.user_id} className="p-4 border border-gray-200 rounded-md">
                  <p><strong>ID:</strong> {user.user_id}</p>
                  <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Account Number:</strong> {user.account_number}</p>
                  <Button variant="delete" onClick={() => handleDelete(user.user_id)} />
                  <Button variant="update" onClick={() => setUpdatingUserId(user.user_id)} />
                  {/* <Button variant="default" /> */}
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No users found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
