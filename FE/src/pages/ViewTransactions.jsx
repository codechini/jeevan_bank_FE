import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const TRANSACTIONS_PER_PAGE = 10;

const ViewTransactions = () => {
  const [searchParams] = useSearchParams();
  const accountIdParam = searchParams.get('accountId');

  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(accountIdParam || '');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const selectedAccount = useMemo(
    () => accounts.find((a) => a.accountId === selectedAccountId) || null,
    [accounts, selectedAccountId],
  );

  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:8080/api/user/accounts', { headers })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setAccounts(data.data || []);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (accountIdParam) {
      setSelectedAccountId(accountIdParam);
    }
  }, [accountIdParam]);

  useEffect(() => {
    if (!selectedAccountId) return;
    setLoading(true);
    setError('');
    fetch(
      `http://localhost:8080/api/user/accounts/${selectedAccountId}/transactions/paginated?page=${page}&size=${TRANSACTIONS_PER_PAGE}`,
      { headers },
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setTransactions(data.data?.content || data.data || []);
          setTotalPages(data.data?.totalPages || 1);
        } else {
          setError(data.message || 'Failed to fetch transactions');
        }
      })
      .catch(() => setError('Error fetching transactions'))
      .finally(() => setLoading(false));
  }, [selectedAccountId, page]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString();
  };

  const formatAmount = (amount) => {
    if (amount == null) return '—';
    const formatted = `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return amount >= 0 ? formatted : `-${formatted.slice(1)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800">Transaction History</h1>
          <Link to="/services">
            <button className="px-6 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200">
              Back to Services
            </button>
          </Link>
        </div>

        {!selectedAccountId && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select an account to view transactions
            </label>
            <select
              value={selectedAccountId}
              onChange={(e) => {
                setSelectedAccountId(e.target.value);
                setPage(0);
              }}
              className="w-full max-w-md px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">-- Choose an account --</option>
              {accounts.map((acc) => (
                <option key={acc.accountId} value={acc.accountId}>
                  {acc.accountNumber} ({acc.accountType}) — ${Number(acc.balance || 0).toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && selectedAccountId && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {selectedAccount && (
              <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-md flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Account:</span>{' '}
                  <span className="font-semibold text-gray-800">{selectedAccount.accountNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500">Type:</span>{' '}
                  <span className="font-semibold text-gray-800">{selectedAccount.accountType}</span>
                </div>
                <div>
                  <span className="text-gray-500">Balance:</span>{' '}
                  <span className="font-semibold text-gray-800">
                    ${Number(selectedAccount.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            )}
            {transactions.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No transactions found for this account.</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-purple-200">
                        <th className="px-4 py-3 font-semibold text-purple-800">Transaction ID</th>
                        <th className="px-4 py-3 font-semibold text-purple-800">Type</th>
                        <th className="px-4 py-3 font-semibold text-purple-800">Amount</th>
                        <th className="px-4 py-3 font-semibold text-purple-800">Timestamp</th>
                        <th className="px-4 py-3 font-semibold text-purple-800">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.transactionId} className="border-b border-purple-100 hover:bg-purple-50">
                          <td className="px-4 py-3 text-xs font-mono break-all">{tx.transactionId}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                              tx.transactionType === 'DEPOSIT'
                                ? 'bg-green-100 text-green-800'
                                : tx.transactionType === 'WITHDRAW'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {tx.transactionType}
                            </span>
                          </td>
                          <td className="px-4 py-3">{formatAmount(tx.amount)}</td>
                          <td className="px-4 py-3 text-xs text-gray-500">{formatDate(tx.timestamp)}</td>
                          <td className="px-4 py-3">{tx.description || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="px-4 py-2 text-sm font-medium text-purple-800 bg-purple-200 rounded-md hover:bg-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {page + 1} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                      disabled={page >= totalPages - 1}
                      className="px-4 py-2 text-sm font-medium text-purple-800 bg-purple-200 rounded-md hover:bg-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTransactions;
