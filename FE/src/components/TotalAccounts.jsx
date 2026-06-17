import { useEffect, useState } from 'react';

const TotalAccounts = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/accounts', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setCount(data.data?.length || 0);
        } else {
          setError(data.message || 'Failed to fetch accounts');
        }
      } catch {
        setError('Error fetching accounts');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md min-h-full">
        <h2 className="text-xl text-center font-semibold mb-2">Total Accounts</h2>
        <div className="w-8 h-8 mx-auto border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md min-h-full">
        <h2 className="text-xl text-center font-semibold mb-2">Total Accounts</h2>
        <p className="text-sm text-center text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md min-h-full">
      <h2 className="text-xl text-center font-semibold mb-2">Total Accounts</h2>
      <p className="text-3xl text-center font-bold text-purple-800">{count}</p>
      <a href="/dashboard/viewaccounts" className="block mt-4 text-center text-sm text-purple-600 hover:underline">View Details</a>
    </div>
  );
};

export default TotalAccounts;
