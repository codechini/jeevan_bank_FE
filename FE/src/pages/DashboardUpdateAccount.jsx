import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import UpdateAccountHolder from '../components/UpdateAccountHolder';

const DashboardUpdateAccount = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  const lookupAccountId = async (input) => {
    const response = await fetch('http://localhost:8080/api/admin/accounts', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch accounts');
    }
    const match = (result.data || []).find(
      (acc) => acc.accountNumber === input
    );
    if (!match) {
      throw new Error(`No account found with number: ${input}`);
    }
    return match.accountId;
  };

  const searchByValue = async (value) => {
    if (!value) return;
    setLoading(true);
    setError('');
    setFetchedData(null);
    try {
      const resolvedId = uuidRegex.test(value)
        ? value
        : await lookupAccountId(value);

      const response = await fetch(`http://localhost:8080/api/admin/accounts/${resolvedId}`, {
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
      setError(err.message || 'An error occurred while fetching account details.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchInput) {
      setError('Please enter an account ID or number');
      return;
    }
    await searchByValue(searchInput);
  };

  useEffect(() => {
    const accountId = location.state?.accountId;
    if (accountId) {
      setSearchInput(accountId);
      searchByValue(accountId);
    }
  }, []);

  const handleClose = async () => {
    if (!window.confirm('Are you sure you want to close this account?')) return;
    setActionLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8080/api/admin/accounts/${fetchedData.accountId}/close`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert('Account closed successfully');
        setFetchedData(null);
        setSearchInput('');
      } else {
        setError(result.message || 'Failed to close account');
      }
    } catch (err) {
      setError('Error closing account.');
      console.error(err);
    }
    setActionLoading(false);
  };

  const handleDelete = async () => {
    setActionLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8080/api/admin/accounts/${fetchedData.accountId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (response.ok) {
        alert('Account deleted successfully');
        setFetchedData(null);
        setSearchInput('');
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to delete account');
      }
    } catch (err) {
      setError('Error deleting account.');
      console.error(err);
    }
    setActionLoading(false);
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    handleSearch();
  };

  const handleAdminDeposit = async (amount, description) => {
    setActionLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8080/api/admin/accounts/${fetchedData.accountId}/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ amount: parseFloat(amount), description }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert('Deposit successful');
        setShowDepositModal(false);
        handleSearch();
      } else {
        setError(result.message || 'Deposit failed');
      }
    } catch (err) {
      setError('Error during deposit.');
      console.error(err);
    }
    setActionLoading(false);
  };

  const handleAdminWithdraw = async (amount, description) => {
    setActionLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8080/api/admin/accounts/${fetchedData.accountId}/withdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ amount: parseFloat(amount), description }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert('Withdrawal successful');
        setShowWithdrawModal(false);
        handleSearch();
      } else {
        setError(result.message || 'Withdrawal failed');
      }
    } catch (err) {
      setError('Error during withdrawal.');
      console.error(err);
    }
    setActionLoading(false);
  };

  const handleAdminTransfer = async (toAccountNumber, amount, description) => {
    setActionLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8080/api/admin/accounts/${fetchedData.accountId}/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ toAccountNumber, amount: parseFloat(amount), description }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert('Transfer successful');
        setShowTransferModal(false);
        handleSearch();
      } else {
        setError(result.message || 'Transfer failed');
      }
    } catch (err) {
      setError('Error during transfer.');
      console.error(err);
    }
    setActionLoading(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString();
  };

  const formatBalance = (balance) => {
    if (balance == null) return '—';
    return `$${Number(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="w-full max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center text-purple-800">Search Account</h2>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter Account ID or Account Number"
          className="px-4 py-2 border border-purple-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 font-semibold text-white bg-yellow-500 rounded-r-md hover:bg-yellow-600 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      {loading && (
        <div className="flex justify-center my-8">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {fetchedData && !loading && (
        <div className="mt-6 space-y-6">
          {/* Card 1 — Account Info */}
          <div className="p-4 border border-purple-200 rounded-md">
            <h3 className="mb-3 text-lg font-bold text-purple-800">Account Info</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <p><strong>Account ID:</strong> <span className="text-sm break-all">{fetchedData.accountId}</span></p>
              <p><strong>Account Number:</strong> {fetchedData.accountNumber}</p>
              <p><strong>Type:</strong> {fetchedData.accountType}</p>
              <p><strong>Balance:</strong> {formatBalance(fetchedData.balance)}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${fetchedData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {fetchedData.status}
                </span>
              </p>
              <p><strong>Created At:</strong> {formatDate(fetchedData.createdAt)}</p>
            </div>
          </div>

          {/* Card 2 — Account Holder Details */}
          <div className="p-4 border border-purple-200 rounded-md">
            <h3 className="mb-3 text-lg font-bold text-purple-800">Account Holder Details</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <p><strong>First Name:</strong> {fetchedData.holderFirstName || '—'}</p>
              <p><strong>Last Name:</strong> {fetchedData.holderLastName || '—'}</p>
              <p><strong>Email:</strong> {fetchedData.holderEmail || '—'}</p>
              <p><strong>Phone:</strong> {fetchedData.holderPhone || '—'}</p>
              <p><strong>Address:</strong> {fetchedData.holderAddress || '—'}</p>
            </div>
          </div>

          {/* Card 3 — Recent Transactions */}
          {fetchedData.recentTransactions && fetchedData.recentTransactions.length > 0 && (
            <div className="p-4 border border-purple-200 rounded-md">
              <h3 className="mb-3 text-lg font-bold text-purple-800">Recent Transactions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-purple-200">
                      <th className="px-3 py-2 font-semibold">ID</th>
                      <th className="px-3 py-2 font-semibold">Type</th>
                      <th className="px-3 py-2 font-semibold">Amount</th>
                      <th className="px-3 py-2 font-semibold">Timestamp</th>
                      <th className="px-3 py-2 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchedData.recentTransactions.map((tx) => (
                      <tr key={tx.transactionId} className="border-b border-purple-100 hover:bg-purple-50">
                        <td className="px-3 py-2">{tx.transactionId}</td>
                        <td className="px-3 py-2">{tx.transactionType}</td>
                        <td className="px-3 py-2">{formatBalance(tx.amount)}</td>
                        <td className="px-3 py-2 text-xs">{formatDate(tx.timestamp)}</td>
                        <td className="px-3 py-2">{tx.description || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-purple-200">
            <Button
              variant="update"
              onClick={() => setShowEditModal(true)}
              disabled={actionLoading}
            >
              Edit Account
            </Button>
            <Button
              variant="default"
              onClick={handleClose}
              disabled={actionLoading}
            >
              Close Account
            </Button>
            <Button
              variant="delete"
              onClick={handleDelete}
              disabled={actionLoading}
            >
              Delete Account
            </Button>
            <Button
              variant="create"
              onClick={() => setShowDepositModal(true)}
              disabled={actionLoading}
            >
              Deposit
            </Button>
            <Button
              variant="default"
              onClick={() => setShowWithdrawModal(true)}
              disabled={actionLoading}
            >
              Withdraw
            </Button>
            <Button
              variant="read"
              onClick={() => setShowTransferModal(true)}
              disabled={actionLoading}
            >
              Transfer
            </Button>
          </div>
        </div>
      )}

      {!fetchedData && !loading && !error && (
        <p className="mt-4 text-center text-gray-500">Enter an account ID or number above to fetch details.</p>
      )}

      {/* Edit Account Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-lg mx-4 p-6 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              ✕
            </button>
            <UpdateAccountHolder
              mode="modal"
              accountId={fetchedData.accountId}
              initialData={{
                firstName: fetchedData.holderFirstName || '',
                lastName: fetchedData.holderLastName || '',
                dateOfBirth: fetchedData.dateOfBirth || '',
                phone: fetchedData.holderPhone || '',
                address: fetchedData.holderAddress || '',
                citizenshipId: fetchedData.citizenshipId || '',
                accountType: fetchedData.accountType || '',
              }}
              onClose={() => setShowEditModal(false)}
              onSuccess={handleEditSuccess}
            />
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDepositModal && (
        <DepositFormModal
          accountNumber={fetchedData.accountNumber}
          onClose={() => setShowDepositModal(false)}
          onSubmit={handleAdminDeposit}
          loading={actionLoading}
        />
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <WithdrawFormModal
          accountNumber={fetchedData.accountNumber}
          onClose={() => setShowWithdrawModal(false)}
          onSubmit={handleAdminWithdraw}
          loading={actionLoading}
        />
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <TransferFormModal
          accountNumber={fetchedData.accountNumber}
          onClose={() => setShowTransferModal(false)}
          onSubmit={handleAdminTransfer}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

const modalOverlay = "fixed inset-0 z-50 flex items-center justify-center bg-black/50";
const modalContainer = "relative w-full max-w-md mx-4 p-6 bg-white rounded-lg shadow-xl";
const modalCloseBtn = "absolute text-gray-500 top-3 right-3 hover:text-gray-700";
const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500";
const labelClass = "block mb-1 text-sm font-semibold text-gray-700";

const DepositFormModal = ({ accountNumber, onClose, onSubmit, loading }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!amount || parseFloat(amount) <= 0) {
      setFormError('Please enter a valid amount');
      return;
    }
    onSubmit(amount, description);
  };

  return (
    <div className={modalOverlay}>
      <div className={modalContainer}>
        <button onClick={onClose} className={modalCloseBtn}>✕</button>
        <h3 className="mb-4 text-xl font-bold text-purple-800">Deposit to Account</h3>
        <p className="mb-4 text-sm text-gray-600">Account: {accountNumber}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={labelClass}>Amount</label>
            <input className={inputClass} type="number" step="0.01" min="0" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={loading} />
          </div>
          <div className="mb-4">
            <label className={labelClass}>Description</label>
            <input className={inputClass} type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} />
          </div>
          {formError && <p className="mb-3 text-sm text-red-500">{formError}</p>}
          <button type="submit" disabled={loading} className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 disabled:opacity-50">
            {loading ? 'Processing...' : 'Deposit'}
          </button>
        </form>
      </div>
    </div>
  );
};

const WithdrawFormModal = ({ accountNumber, onClose, onSubmit, loading }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!amount || parseFloat(amount) <= 0) {
      setFormError('Please enter a valid amount');
      return;
    }
    onSubmit(amount, description);
  };

  return (
    <div className={modalOverlay}>
      <div className={modalContainer}>
        <button onClick={onClose} className={modalCloseBtn}>✕</button>
        <h3 className="mb-4 text-xl font-bold text-purple-800">Withdraw from Account</h3>
        <p className="mb-4 text-sm text-gray-600">Account: {accountNumber}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={labelClass}>Amount</label>
            <input className={inputClass} type="number" step="0.01" min="0" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={loading} />
          </div>
          <div className="mb-4">
            <label className={labelClass}>Description</label>
            <input className={inputClass} type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} />
          </div>
          {formError && <p className="mb-3 text-sm text-red-500">{formError}</p>}
          <button type="submit" disabled={loading} className="w-full px-4 py-2 font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 disabled:opacity-50">
            {loading ? 'Processing...' : 'Withdraw'}
          </button>
        </form>
      </div>
    </div>
  );
};

const TransferFormModal = ({ accountNumber, onClose, onSubmit, loading }) => {
  const [toAccountNumber, setToAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!toAccountNumber) {
      setFormError('Please enter recipient account number');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setFormError('Please enter a valid amount');
      return;
    }
    onSubmit(toAccountNumber, amount, description);
  };

  return (
    <div className={modalOverlay}>
      <div className={modalContainer}>
        <button onClick={onClose} className={modalCloseBtn}>✕</button>
        <h3 className="mb-4 text-xl font-bold text-purple-800">Transfer from Account</h3>
        <p className="mb-4 text-sm text-gray-600">From Account: {accountNumber}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={labelClass}>Recipient Account Number</label>
            <input className={inputClass} type="text" placeholder="Enter recipient account number" value={toAccountNumber} onChange={(e) => setToAccountNumber(e.target.value)} disabled={loading} />
          </div>
          <div className="mb-4">
            <label className={labelClass}>Amount</label>
            <input className={inputClass} type="number" step="0.01" min="0" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={loading} />
          </div>
          <div className="mb-4">
            <label className={labelClass}>Description</label>
            <input className={inputClass} type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} />
          </div>
          {formError && <p className="mb-3 text-sm text-red-500">{formError}</p>}
          <button type="submit" disabled={loading} className="w-full px-4 py-2 font-semibold text-white bg-gray-500 rounded-md hover:bg-gray-600 disabled:opacity-50">
            {loading ? 'Processing...' : 'Transfer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardUpdateAccount;
