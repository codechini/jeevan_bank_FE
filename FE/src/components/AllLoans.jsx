import { useEffect, useState } from 'react';
import Button from './Button';

const LOANS_PER_PAGE = 10;

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:8080/api/admin/loans', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLoans(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch loans');
      }
    } catch (err) {
      console.error('Error fetching loans:', err);
      setError('Error fetching loans');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (loanId) => {
    if (!window.confirm('Approve this loan application?')) return;
    setActionLoading(loanId);
    try {
      const response = await fetch(`http://localhost:8080/api/admin/loans/${loanId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setLoans(prev =>
          prev.map(loan =>
            loan.loanId === loanId ? { ...loan, status: 'Approved' } : loan
          )
        );
      } else {
        setError(data.message || 'Failed to approve loan');
      }
    } catch (err) {
      console.error('Error approving loan:', err);
      setError('Error approving loan');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (loanId) => {
    const reason = window.prompt('Reason for rejection:');
    if (!reason) return;
    setActionLoading(loanId);
    try {
      const response = await fetch(`http://localhost:8080/api/admin/loans/${loanId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ reason }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setLoans(prev =>
          prev.map(loan =>
            loan.loanId === loanId ? { ...loan, status: 'Rejected' } : loan
          )
        );
      } else {
        setError(data.message || 'Failed to reject loan');
      }
    } catch (err) {
      console.error('Error rejecting loan:', err);
      setError('Error rejecting loan');
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString();
  };

  const formatAmount = (amount) => {
    if (amount == null) return '—';
    return `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatRate = (rate) => {
    if (rate == null) return '—';
    return `${(Number(rate) * 100).toFixed(2)}%`;
  };

  const statusBadge = (status) => {
    const colors = {
      Approved: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
      Pending: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const totalLoans = loans.length;
  const totalPages = Math.ceil(totalLoans / LOANS_PER_PAGE);
  const startIndex = (currentPage - 1) * LOANS_PER_PAGE;
  const endIndex = startIndex + LOANS_PER_PAGE;
  const paginatedLoans = loans.slice(startIndex, endIndex);
  const remainingLoans = totalLoans - endIndex;

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
      <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-purple-800">All Loan Applications</h2>

        <div className="mb-4 text-sm text-gray-600">
          Showing {startIndex + 1}–{Math.min(endIndex, totalLoans)} of {totalLoans} loans
          {remainingLoans > 0 && (
            <span className="ml-2 text-purple-600 font-medium">(+{remainingLoans} more)</span>
          )}
        </div>

        <div className="overflow-x-auto">
          {paginatedLoans.length > 0 ? (
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-purple-200">
                  <th className="px-4 py-3 font-semibold text-purple-800">Holder Name</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Loan Type</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Principal</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Balance</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Rate</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Term</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Start Date</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Status</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLoans.map((loan) => (
                  <tr key={loan.loanId} className="border-b border-purple-100 hover:bg-purple-50">
                    <td className="px-4 py-3">{loan.holderName}</td>
                    <td className="px-4 py-3">{loan.loanType}</td>
                    <td className="px-4 py-3">{formatAmount(loan.principalAmount)}</td>
                    <td className="px-4 py-3">{formatAmount(loan.currentBalance)}</td>
                    <td className="px-4 py-3">{formatRate(loan.interestRate)}</td>
                    <td className="px-4 py-3">{loan.termMonths}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(loan.startDate)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusBadge(loan.status)}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {loan.status === 'Pending' && (
                        <div className="flex gap-1">
                          <Button
                            variant="approve"
                            onClick={() => handleApprove(loan.loanId)}
                            disabled={actionLoading === loan.loanId}
                          />
                          <Button
                            variant="reject"
                            onClick={() => handleReject(loan.loanId)}
                            disabled={actionLoading === loan.loanId}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-purple-500">No loans found.</p>
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

export default AllLoans;
