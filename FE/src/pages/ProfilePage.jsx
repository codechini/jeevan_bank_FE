import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import UpdateAccountHolder from '../components/UpdateAccountHolder';

const statusColor = (status) => {
  if (!status) return 'bg-gray-100 text-gray-800';
  const s = status.toLowerCase();
  if (s === 'active' || s === 'approved' || s === 'delivered' || s === 'dispatched')
    return 'bg-green-100 text-green-800';
  if (s === 'pending') return 'bg-yellow-100 text-yellow-800';
  if (s === 'rejected' || s === 'blocked' || s === 'closed' || s === 'expired')
    return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
};

const ProfilePage = () => {
  const { user, role } = useAuth();

  const [accounts, setAccounts] = useState([]);
  const [accountDetail, setAccountDetail] = useState(null);
  const [loans, setLoans] = useState([]);
  const [cards, setCards] = useState([]);
  const [chequeBooks, setChequeBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingAccount, setEditingAccount] = useState(null);
  const [closingAccountId, setClosingAccountId] = useState(null);
  const [deletingAccountId, setDeletingAccountId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const [accountsRes, loansRes, cardsRes, chequesRes] = await Promise.all([
        fetch('http://localhost:8080/api/user/accounts', { headers }),
        fetch('http://localhost:8080/api/user/viewloan', { headers }),
        fetch('http://localhost:8080/api/user/viewcard', { headers }),
        fetch('http://localhost:8080/api/user/viewchequebook', { headers }),
      ]);

      const accountsBody = await accountsRes.json();
      if (accountsRes.ok && accountsBody.success) {
        const list = accountsBody.data || [];
        setAccounts(list);
        if (list.length > 0) {
          const detailRes = await fetch(
            `http://localhost:8080/api/user/accounts/${list[0].accountId}`,
            { headers }
          );
          const detailBody = await detailRes.json();
          if (detailRes.ok && detailBody.success) {
            setAccountDetail(detailBody.data);
          }
        }
      } else {
        setError(accountsBody.message || 'Failed to fetch accounts');
      }

      const loansBody = await loansRes.json();
      if (loansRes.ok && loansBody.success) {
        setLoans(loansBody.data || []);
      }

      const cardsBody = await cardsRes.json();
      if (cardsRes.ok && cardsBody.success) {
        setCards(cardsBody.data || []);
      }

      const chequesBody = await chequesRes.json();
      if (chequesRes.ok && chequesBody.success) {
        setChequeBooks(chequesBody.data || []);
      }
    } catch (err) {
      setError('Error loading profile data');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCloseAccount = async (accountId) => {
    if (!window.confirm('Are you sure you want to close this account?')) return;
    setClosingAccountId(accountId);
    try {
      const response = await fetch(`http://localhost:8080/api/user/accounts/${accountId}/close`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert('Account closed successfully');
        fetchData();
      } else {
        alert(result.message || 'Failed to close account');
      }
    } catch (err) {
      alert('Error closing account');
    } finally {
      setClosingAccountId(null);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    if (!window.confirm('Are you sure you want to permanently delete this closed account?')) return;
    setDeletingAccountId(accountId);
    try {
      const response = await fetch(`http://localhost:8080/api/user/accounts/${accountId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert('Account deleted successfully');
        fetchData();
      } else {
        alert(result.message || 'Failed to delete account');
      }
    } catch (err) {
      alert('Error deleting account');
    } finally {
      setDeletingAccountId(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatBalance = (balance) => {
    if (balance == null) return '—';
    return `$${Number(balance).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatPercent = (rate) => {
    if (rate == null) return '—';
    return `${Number(rate).toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>
          {role === 'ADMIN' ? (
            <a href="/dashboard">
              <button className="px-6 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Go to Dashboard
              </button>
            </a>
          ) : (
            <a href="/services">
              <button className="px-6 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Go to Services
              </button>
            </a>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-purple-800 mb-4">User Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-semibold text-gray-800">{user?.username || '—'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold text-gray-800">{role || '—'}</p>
            </div>
          </div>
        </div>

        {accountDetail && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-purple-800 mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">First Name</p>
                <p className="font-semibold text-gray-800">{accountDetail.holderFirstName || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Name</p>
                <p className="font-semibold text-gray-800">{accountDetail.holderLastName || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-gray-800">{accountDetail.holderEmail || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold text-gray-800">{accountDetail.holderPhone || '—'}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold text-gray-800">{accountDetail.holderAddress || '—'}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-purple-800 mb-4">
            Accounts ({accounts.length})
          </h2>
          {accounts.length === 0 ? (
            <p className="text-gray-500">
              No accounts yet.{' '}
              <a href="/openaccount" className="text-purple-600 underline">
                Open an account
              </a>
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-purple-200">
                    <th className="px-3 py-2 font-semibold">Account Number</th>
                    <th className="px-3 py-2 font-semibold">Type</th>
                    <th className="px-3 py-2 font-semibold">Balance</th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                    <th className="px-3 py-2 font-semibold">Opened</th>
                    <th className="px-3 py-2 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((acc) => (
                    <tr
                      key={acc.accountId}
                      className="border-b border-purple-100 hover:bg-purple-50"
                    >
                      <td className="px-3 py-2 font-mono">{acc.accountNumber}</td>
                      <td className="px-3 py-2">{acc.accountType}</td>
                      <td className="px-3 py-2">{formatBalance(acc.balance)}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusColor(acc.status)}`}>
                          {acc.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-xs">{formatDate(acc.createdAt)}</td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingAccount(acc)}
                            className="px-3 py-1 text-xs font-semibold text-purple-800 bg-purple-200 rounded hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          >
                            Edit
                          </button>
                          <a href={`/transactions?accountId=${acc.accountId}`}>
                            <button className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
                              Transactions
                            </button>
                          </a>
                          {acc.status !== 'Closed' ? (
                            <button
                              onClick={() => handleCloseAccount(acc.accountId)}
                              disabled={closingAccountId === acc.accountId}
                              className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
                            >
                              {closingAccountId === acc.accountId ? 'Closing...' : 'Close'}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDeleteAccount(acc.accountId)}
                              disabled={deletingAccountId === acc.accountId}
                              className="px-3 py-1 text-xs font-semibold text-red-700 border border-red-400 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
                            >
                              {deletingAccountId === acc.accountId ? 'Deleting...' : 'Delete'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-purple-800 mb-4">
            Loans ({loans.length})
          </h2>
          {loans.length === 0 ? (
            <p className="text-gray-500">
              No loans yet.{' '}
              <a href="/loan" className="text-purple-600 underline">
                Apply for a loan
              </a>
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-purple-200">
                    <th className="px-3 py-2 font-semibold">Type</th>
                    <th className="px-3 py-2 font-semibold">Principal</th>
                    <th className="px-3 py-2 font-semibold">Balance</th>
                    <th className="px-3 py-2 font-semibold">Rate</th>
                    <th className="px-3 py-2 font-semibold">Term</th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.loanId} className="border-b border-purple-100 hover:bg-purple-50">
                      <td className="px-3 py-2">{loan.loanType}</td>
                      <td className="px-3 py-2">{formatBalance(loan.principalAmount)}</td>
                      <td className="px-3 py-2">{formatBalance(loan.currentBalance)}</td>
                      <td className="px-3 py-2">{formatPercent(loan.interestRate)}</td>
                      <td className="px-3 py-2">{loan.termMonths ? `${loan.termMonths}m` : '—'}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusColor(loan.status)}`}>
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-purple-800 mb-4">
            Cards ({cards.length})
          </h2>
          {cards.length === 0 ? (
            <p className="text-gray-500">
              No cards yet.{' '}
              <a href="/card" className="text-purple-600 underline">
                Apply for a card
              </a>
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-purple-200">
                    <th className="px-3 py-2 font-semibold">Type</th>
                    <th className="px-3 py-2 font-semibold">Card Number</th>
                    <th className="px-3 py-2 font-semibold">Expires</th>
                    <th className="px-3 py-2 font-semibold">Daily Limit</th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cards.map((card) => (
                    <tr key={card.cardId} className="border-b border-purple-100 hover:bg-purple-50">
                      <td className="px-3 py-2">{card.cardType}</td>
                      <td className="px-3 py-2 font-mono text-xs">{card.cardNumber || '—'}</td>
                      <td className="px-3 py-2">
                        {card.expirationDate
                          ? new Date(card.expirationDate).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })
                          : '—'}
                      </td>
                      <td className="px-3 py-2">
                        {card.dailyLimit != null ? `$${Number(card.dailyLimit).toLocaleString()}` : '—'}
                      </td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusColor(card.status)}`}>
                          {card.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-purple-800 mb-4">
            Chequebooks ({chequeBooks.length})
          </h2>
          {chequeBooks.length === 0 ? (
            <p className="text-gray-500">
              No chequebook requests yet.{' '}
              <a href="/applychequebook" className="text-purple-600 underline">
                Apply for a chequebook
              </a>
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-purple-200">
                    <th className="px-3 py-2 font-semibold">Account</th>
                    <th className="px-3 py-2 font-semibold">Requested</th>
                    <th className="px-3 py-2 font-semibold">Leaves</th>
                    <th className="px-3 py-2 font-semibold">Delivery Address</th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {chequeBooks.map((cb) => (
                    <tr key={cb.requestId} className="border-b border-purple-100 hover:bg-purple-50">
                      <td className="px-3 py-2 font-mono">{cb.accountNumber || '—'}</td>
                      <td className="px-3 py-2 text-xs">
                        {cb.requestDate ? new Date(cb.requestDate).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-3 py-2">{cb.numberOfLeaves ?? '—'}</td>
                      <td className="px-3 py-2 max-w-xs truncate">{cb.deliveryAddress || '—'}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusColor(cb.status)}`}>
                          {cb.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!accountDetail && accounts.length === 0 && !error && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500">
              Open an account to see your personal details and account information here.
            </p>
          </div>
        )}
      </div>

      {editingAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-lg mx-4 p-6 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingAccount(null)}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              ✕
            </button>
            <UpdateAccountHolder
              mode="modal"
              apiEndpoint="/api/user/accounts/"
              accountId={editingAccount.accountId}
              initialData={{
                firstName: editingAccount.holderFirstName || '',
                lastName: editingAccount.holderLastName || '',
                dateOfBirth: editingAccount.dateOfBirth || '',
                phone: editingAccount.holderPhone || '',
                address: editingAccount.holderAddress || '',
                citizenshipId: editingAccount.citizenshipId || '',
                accountType: editingAccount.accountType || '',
              }}
              onClose={() => setEditingAccount(null)}
              onSuccess={() => {
                setEditingAccount(null);
                fetchData();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
