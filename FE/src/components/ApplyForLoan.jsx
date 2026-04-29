import { useState } from "react";

const ApplyForLoan = ({ title = 'Apply For Loan' }) => {

  const [formData, setFormData] = useState({
    loanType: '',
    principalAmount: '',
    termMonths: '',
    reason: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.loanType) {
      setError('Please select a loan type.');
      return;
    }

    if (!formData.principalAmount || parseFloat(formData.principalAmount) <= 0) {
      setError('Please enter a valid loan amount.');
      return;
    }

    if (!formData.termMonths || parseInt(formData.termMonths) <= 0) {
      setError('Please enter a valid loan term.');
      return;
    }

    if (!formData.reason.trim()) {
      setError('Please provide a reason for the loan.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/user/applyloan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          loanType: formData.loanType,
          principalAmount: parseFloat(formData.principalAmount),
          termMonths: parseInt(formData.termMonths),
          reason: formData.reason.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Loan application submitted successfully:', result);
        setSuccess(true);
        setFormData({ loanType: '', principalAmount: '', termMonths: '', reason: '' });
      } else {
        setError(result.message || 'Loan application failed.');
      }
    } catch (err) {
      console.error('Error submitting loan application:', err);
      setError('An error occurred while submitting the application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">{title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loanType">
                Loan Type
              </label>
              <select
                className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2 bg-white"
                id="loanType"
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select a loan type</option>
                <option value="PERSONAL">Personal</option>
                <option value="HOME">Home</option>
                <option value="AUTO">Auto</option>
                <option value="EDUCATION">Education</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="principalAmount">
                Principal Amount
              </label>
              <input
                className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
                id="principalAmount"
                name="principalAmount"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter loan amount"
                value={formData.principalAmount}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="termMonths">
                Term (Months)
              </label>
              <input
                className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
                id="termMonths"
                name="termMonths"
                type="number"
                step="1"
                min="1"
                placeholder="Enter loan term in months"
                value={formData.termMonths}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
                Reason
              </label>
              <textarea
                className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
                id="reason"
                name="reason"
                rows="4"
                placeholder="Describe the reason for the loan"
                value={formData.reason}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              Loan application submitted successfully!
            </div>
          )}

          <div className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50">
            <button
              className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Apply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForLoan;
