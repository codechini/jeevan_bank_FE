import { useEffect, useState } from 'react';

const ApplyForCard = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [cardType, setCardType] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingAccounts, setFetchingAccounts] = useState(true);
  const [error, setError] = useState('');
  const [cardResult, setCardResult] = useState(null);

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

    if (!cardType) {
      setError('Please select a card type');
      return;
    }

    setLoading(true);
    setCardResult(null);

    try {
      const response = await fetch('http://localhost:8080/api/user/applycard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          accountId: selectedAccount,
          cardType: cardType,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setCardResult(result.data);
      } else {
        setError(result.message || 'Card application failed');
      }
    } catch (err) {
      console.error('Card application error:', err);
      setError('An error occurred during card application');
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (num) => {
    if (!num) return '';
    return num.replace(/(.{4})/g, '$1 ').trim();
  };

  const handleReset = () => {
    setCardResult(null);
    setSelectedAccount('');
    setCardType('');
    setError('');
  };

  if (cardResult) {
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
            <h2 className="text-2xl font-bold text-gray-800">Card Created!</h2>
            <p className="mt-1 text-sm text-gray-500">Your card application has been submitted</p>
          </div>

          <div className="p-4 mb-4 border border-gray-200 rounded-lg">
            <div className="mb-3">
              <p className="text-xs text-gray-500">Card Number</p>
              <p className="text-lg font-mono font-bold text-gray-800">{formatCardNumber(cardResult.cardNumber)}</p>
            </div>
            <div className="flex gap-6 mb-3">
              <div>
                <p className="text-xs text-gray-500">CVV</p>
                <p className="text-lg font-mono font-bold text-red-600">{cardResult.cvv}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Expires</p>
                <p className="text-lg font-mono font-bold text-gray-800">
                  {new Date(cardResult.expirationDate).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })}
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-xs text-gray-500">Type</p>
                <p className="font-semibold text-gray-800">{cardResult.cardType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="font-semibold text-yellow-600">{cardResult.status}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Daily Limit</p>
                <p className="font-semibold text-gray-800">${Number(cardResult.dailyLimit).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="p-3 mb-6 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">
            <strong>⚠ Save your CVV:</strong> The CVV ({cardResult.cvv}) is shown only once and will not be visible again.
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Apply for Another Card
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800">Apply for a Card</h1>
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
          <label className="block mb-2 text-sm font-medium text-gray-600">Card Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
              <input
                type="radio"
                name="cardType"
                value="DEBIT"
                checked={cardType === 'DEBIT'}
                onChange={(e) => setCardType(e.target.value)}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Debit Card</span>
            </label>
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
              <input
                type="radio"
                name="cardType"
                value="CREDIT"
                checked={cardType === 'CREDIT'}
                onChange={(e) => setCardType(e.target.value)}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Credit Card</span>
            </label>
          </div>
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
          {loading ? 'Applying...' : 'Apply Now'}
        </button>
      </form>
      </div>
    </div>
  );
};

export default ApplyForCard;