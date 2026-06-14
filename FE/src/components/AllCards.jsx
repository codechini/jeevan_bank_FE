import { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 10;

const AllCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCards = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:8080/api/admin/cards', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCards(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch cards');
      }
    } catch (err) {
      console.error('Error fetching cards:', err);
      setError('Error fetching cards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const maskCardNumber = (num) => {
    if (!num || num.length < 4) return '—';
    const last4 = num.slice(-4);
    return `**** **** **** ${last4}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString();
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString();
  };

  const formatAmount = (amount) => {
    if (amount == null) return '—';
    return `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const statusBadge = (status) => {
    const colors = {
      Active: 'bg-green-100 text-green-800',
      APPROVED: 'bg-green-100 text-green-800',
      Approved: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const typeBadge = (type) => {
    return type === 'CREDIT'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-purple-100 text-purple-800';
  };

  const total = cards.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginated = cards.slice(startIndex, endIndex);
  const remaining = total - endIndex;

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
        <h2 className="mb-6 text-2xl font-bold text-center text-purple-800">All Cards</h2>

        <div className="mb-4 text-sm text-gray-600">
          Showing {startIndex + 1}–{Math.min(endIndex, total)} of {total} cards
          {remaining > 0 && (
            <span className="ml-2 text-purple-600 font-medium">(+{remaining} more)</span>
          )}
        </div>

        <div className="overflow-x-auto">
          {paginated.length > 0 ? (
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-purple-200">
                  <th className="px-4 py-3 font-semibold text-purple-800">Holder Name</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Account Number</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Card Number</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Type</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Expires</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Daily Limit</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Status</th>
                  <th className="px-4 py-3 font-semibold text-purple-800">Issue Date</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((card) => (
                  <tr key={card.cardId} className="border-b border-purple-100 hover:bg-purple-50">
                    <td className="px-4 py-3">{card.holderName}</td>
                    <td className="px-4 py-3 font-mono text-xs">{card.accountNumber}</td>
                    <td className="px-4 py-3 font-mono text-xs">{maskCardNumber(card.cardNumber)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${typeBadge(card.cardType)}`}>
                        {card.cardType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">{formatDate(card.expirationDate)}</td>
                    <td className="px-4 py-3">{formatAmount(card.dailyLimit)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusBadge(card.status)}`}>
                        {card.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDateTime(card.issueDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-purple-500">No cards found.</p>
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

export default AllCards;
