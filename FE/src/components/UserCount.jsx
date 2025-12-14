import axios from 'axios';
import { useEffect, useState } from 'react';

const UserCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/count');
        setCount(response.data);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md min-h-full">
      <h2 className="text-xl text-center font-semibold mb-2">Total Users</h2>
      <p className="text-3xl text-center font-bold text-purple-800">{count}</p>
    </div>
  );
};

export default UserCount;