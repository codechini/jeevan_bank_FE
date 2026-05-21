import { useState } from 'react';
import UpdateAccountHolder from '../components/UpdateAccountHolder';

const DashboardUpdateAccount = () => {
  const [accountId, setAccountId] = useState('');
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!accountId) {
      setError('Please enter an account ID');
      return;
    }
    setLoading(true);
    setError('');
    setFetchedData(null);
    try {
      const response = await fetch(`http://localhost:8080/api/admin/accounts/${accountId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setFetchedData(result.data);
      } else {
        setError(result.message || 'Account not found');
      }
    } catch (err) {
      setError('An error occurred while fetching account details.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleSuccess = () => {
    setFetchedData(null);
    setAccountId('');
  };

  return (
    <div className="w-full max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center text-purple-800">Update Account Holder Details</h2>

      {/* Step 1: Enter Account ID */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          placeholder="Enter Account ID"
          className="px-4 py-2 border border-purple-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className="px-4 py-2 font-semibold text-white bg-yellow-500 rounded-r-md hover:bg-yellow-600 disabled:opacity-50"
        >
          {loading ? 'Fetching...' : 'Fetch'}
        </button>
      </div>

      {error && <p className="mb-4 text-center text-red-500">{error}</p>}

      {loading && (
        <div className="flex justify-center my-8">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Step 2: Edit form */}
      {fetchedData && !loading && (
        <UpdateAccountHolder
          mode="page"
          accountId={fetchedData.accountId}
          initialData={fetchedData}
          onSuccess={handleSuccess}
        />
      )}

      {!fetchedData && !loading && !error && (
        <p className="text-center text-gray-500">Enter an account ID above to fetch and update details.</p>
      )}
    </div>
  );
};

export default DashboardUpdateAccount;
