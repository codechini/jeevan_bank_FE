import { useEffect, useState } from 'react';

const ACCOUNTS_PER_PAGE = 10;

const AllAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:8080/api/admin/accounts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAccounts(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch accounts');
      }
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError('Error fetching accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString();
  };

  const formatBalance = (balance) => {
    if (balance == null) return '—';
    return `$${Number(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const totalAccounts = accounts.length;
  const totalPages = Math.ceil(totalAccounts / ACCOUNTS_PER_PAGE);
  const startIndex = (currentPage - 1) * ACCOUNTS_PER_PAGE;
  const endIndex = startIndex + ACCOUNTS_PER_PAGE;
  const paginatedAccounts = accounts.slice(startIndex, endIndex);
  const remainingAccounts = totalAccounts - endIndex;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-purple-800">All Bank Accounts</h2>

        <div className="mb-4 text-sm text-gray-600">
          Showing {startIndex + 1}–{Math.min(endIndex, totalAccounts)} of {totalAccounts} accounts
          {remainingAccounts > 0 && (
            <span className="ml-2 text-purple-600 font-medium">(+{remainingAccounts} more)</span>
          )}
        </div>

        <div className="overflow-x-auto">
          {paginatedAccounts.length > 0 ? (
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-purple-200">
                  <th className="px-4 py-3 font-semibold text-purple-800">Account Number</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Holder Name</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Type</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Balance</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Status</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Created At</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAccounts.map((acc) => (
                  <tr key={acc.accountId} className="border-b border-purple-100 hover:bg-purple-50">
                    <td className="px-4 py-3 font-mono text-xs">{acc.accountNumber}</td>
                    <td className="px-4 py-3">{acc.holderName}</td>
                    <td className="px-4 py-3">{acc.accountType}</td>
                    <td className="px-4 py-3">{formatBalance(acc.balance)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        acc.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {acc.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(acc.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-purple-500">No accounts found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-purple-800 bg-purple-200 rounded-md hover:bg-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-purple-800 bg-purple-200 rounded-md hover:bg-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAccounts;
