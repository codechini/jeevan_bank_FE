import { useEffect, useState } from 'react';

const ApplyForChequeBook = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [numberOfLeaves, setNumberOfLeaves] = useState(50);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingAccounts, setFetchingAccounts] = useState(true);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/accounts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setAccounts(data.data || []);
        } else {
          setError(data.message || 'Failed to fetch accounts');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching accounts');
      } finally {
        setFetchingAccounts(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedAccount) {
      setError('Please select an account');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const body = { accountId: selectedAccount };
      if (numberOfLeaves) body.numberOfLeaves = numberOfLeaves;
      if (deliveryAddress.trim()) body.deliveryAddress = deliveryAddress.trim();

      const response = await fetch('http://localhost:8080/api/user/applychequebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data.data);
      } else {
        setError(data.message || 'Chequebook application failed');
      }
    } catch (err) {
      console.error('Chequebook application error:', err);
      setError('An error occurred during chequebook application');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSelectedAccount('');
    setNumberOfLeaves(50);
    setDeliveryAddress('');
    setError('');
  };

  if (result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md mx-auto mb-4">
        <a href="/services">
          <button className="px-6 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            Back to Services
          </button>
        </a>
      </div>
      <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-md">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
              <span className="text-3xl text-green-600">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Request Submitted!</h2>
            <p className="mt-1 text-sm text-gray-500">Your chequebook request has been submitted for approval</p>
          </div>

          <div className="p-4 mb-4 border border-gray-200 rounded-lg">
            {result.requestId && (
              <div className="mb-3">
                <p className="text-xs text-gray-500">Request ID</p>
                <p className="text-sm font-mono font-bold text-gray-800">{result.requestId}</p>
              </div>
            )}
            {result.accountNumber && (
              <div className="mb-3">
                <p className="text-xs text-gray-500">Account</p>
                <p className="text-sm font-mono font-bold text-gray-800">{result.accountNumber}</p>
              </div>
            )}
            <div className="mb-3">
              <p className="text-xs text-gray-500">Number of Leaves</p>
              <p className="text-sm font-bold text-gray-800">{result.numberOfLeaves || numberOfLeaves}</p>
            </div>
            {result.deliveryAddress && (
              <div className="mb-3">
                <p className="text-xs text-gray-500">Delivery Address</p>
                <p className="text-sm text-gray-800">{result.deliveryAddress}</p>
              </div>
            )}
            <div className="flex gap-6">
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="font-semibold text-yellow-600">{result.status || 'Pending'}</p>
              </div>
              {result.requestDate && (
                <div>
                  <p className="text-xs text-gray-500">Request Date</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {new Date(result.requestDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Apply for Another Cheque Book
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800">Apply for a Cheque Book</h1>
          <a href="/services">
            <button className="px-6 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Back to Services
            </button>
          </a>
        </div>
        <form className="w-full p-8 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="account" className="block mb-2 text-sm font-medium text-gray-600">
            Select Account
          </label>
          <select
            id="account"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            disabled={fetchingAccounts}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">
              {fetchingAccounts
                ? 'Loading accounts...'
                : accounts.length === 0
                  ? 'No accounts available'
                  : 'Select an account'}
            </option>
            {accounts.map((acc) => (
              <option key={acc.accountId} value={acc.accountId}>
                {acc.accountNumber} — {acc.accountType}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="leaves" className="block mb-2 text-sm font-medium text-gray-600">
            Number of Leaves (max 50)
          </label>
          <input
            id="leaves"
            type="number"
            min={1}
            max={50}
            value={numberOfLeaves}
            onChange={(e) => setNumberOfLeaves(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-600">
            Delivery Address <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            rows={3}
            placeholder="Enter delivery address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        {error && (
          <div className="p-3 mb-6 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || fetchingAccounts}
          className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {loading ? 'Applying...' : 'Apply for Cheque Book'}
        </button>
      </form>
      </div>
    </div>
  );
};

export default ApplyForChequeBook;
