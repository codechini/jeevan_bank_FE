import { useState } from "react";

const OpenAccount = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    citizenshipId: '',
    accountType: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setResult(null);
  };

  const handleReset = () => {
    setResult(null);
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      phone: '',
      address: '',
      citizenshipId: '',
      accountType: '',
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const postData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      phone: formData.phone.startsWith('+') ? formData.phone : '+' + formData.phone,
      address: formData.address,
      citizenshipId: formData.citizenshipId,
      accountType: formData.accountType,
    };

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/user/openaccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data.data || { ...formData });
      } else {
        setError(data.message || 'Account opening failed.');
      }
    } catch (err) {
      console.error('Error opening account:', err);
      setError('An error occurred while opening the account.');
    } finally {
      setLoading(false);
    }
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
            <h2 className="text-2xl font-bold text-gray-800">Account Opened!</h2>
            <p className="mt-1 text-sm text-gray-500">Your new bank account has been created</p>
          </div>

          <div className="p-4 mb-4 border border-gray-200 rounded-lg">
            {result.accountNumber && (
              <div className="mb-3">
                <p className="text-xs text-gray-500">Account Number</p>
                <p className="text-lg font-mono font-bold text-gray-800">{result.accountNumber}</p>
              </div>
            )}
            <div className="mb-3">
              <p className="text-xs text-gray-500">Account Type</p>
              <p className="text-sm font-bold text-gray-800">{result.accountType || formData.accountType}</p>
            </div>
            {result.accountId && (
              <div>
                <p className="text-xs text-gray-500">Account ID</p>
                <p className="text-xs font-mono text-gray-600">{result.accountId}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Open Another Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800">Open a New Account</h1>
          <a href="/services">
            <button className="px-6 py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Back to Services
            </button>
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                First name
              </label>
              <input
                className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleChange}
                value={formData.firstName}
                placeholder="Enter your first name"
                disabled={loading}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Last name
              </label>
              <input
                className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
                id="lastName"
                name="lastName"
                type="text"
                onChange={handleChange}
                value={formData.lastName}
                placeholder="Enter your last name"
                disabled={loading}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Date of Birth            </label>
              <input
                className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                onChange={handleChange}
                value={formData.dateOfBirth}
                placeholder="Enter your date of birth"
                disabled={loading}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Phone Number            </label>
              <input
                className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
                id="phone"
                name="phone"
                type="tel"
                onChange={handleChange}
                value={formData.phone}
                placeholder="Enter your phone number"
                disabled={loading}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="loan_type" className="block mb-2 text-sm font-medium text-gray-600">Account Type</label>
              <select
                id="accountType"
                name="accountType"
                onChange={handleChange}
                value={formData.accountType}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Account type</option>
                <option value="CURRENT">Current</option>
                <option value="CHECKING">Checking</option>
                <option value="FIXED_DEPOSIT">Fixed Deposit</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Address            </label>
              <input
                className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
                id="address"
                name="address"
                type="text"
                onChange={handleChange}
                value={formData.address}
                placeholder="Enter your address"
                disabled={loading}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Citizenship ID            </label>
              <input
                className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
                id="citizenshipId"
                name="citizenshipId"
                type="text"
                onChange={handleChange}
                value={formData.citizenshipId}
                placeholder="Enter your citizenship ID"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="w-full py-2">
            <button
              className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Opening...' : 'Open Account'}
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default OpenAccount;