import { useEffect, useState } from 'react';

const AccountsBreakdown = () => {
  const [active, setActive] = useState(0);
  const [closed, setClosed] = useState(0);
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
          const list = data.data || [];
          setActive(list.filter((a) => a.status === 'Active').length);
          setClosed(list.filter((a) => a.status === 'Closed').length);
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
        <h2 className="text-xl text-center font-semibold mb-2">Accounts</h2>
        <div className="w-8 h-8 mx-auto border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md min-h-full">
        <h2 className="text-xl text-center font-semibold mb-2">Accounts</h2>
        <p className="text-sm text-center text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md min-h-full">
      <h2 className="text-xl text-center font-semibold mb-2">Accounts</h2>
      <div className="flex justify-center gap-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{active}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">{closed}</p>
          <p className="text-xs text-gray-500">Closed</p>
        </div>
      </div>
      <a href="/dashboard/viewaccounts" className="block mt-4 text-center text-sm text-purple-600 hover:underline">View Details</a>
    </div>
  );
};

export default AccountsBreakdown;
