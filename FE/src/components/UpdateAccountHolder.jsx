import { useState } from 'react';

const UpdateAccountHolder = ({ mode, accountId, initialData, onClose, onSuccess, apiEndpoint = '/api/admin/accounts/' }) => {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    citizenshipId: initialData?.citizenshipId || '',
    accountType: initialData?.accountType || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      phone: formData.phone.startsWith('+') ? formData.phone : '+' + formData.phone,
    };

    try {
      const response = await fetch(`http://localhost:8080${apiEndpoint}${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Account holder details updated successfully!');
        if (onSuccess) onSuccess();
      } else {
        alert(`Update failed: ${result.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('An error occurred during update.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4 text-lg font-bold text-purple-800">Update Account Holder Details</h3>

      {mode === 'page' && accountId && (
        <p className="mb-3 text-sm text-gray-500">Account ID: {accountId}</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-purple-600">First Name</label>
          <input
            id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange}
            className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-purple-600">Last Name</label>
          <input
            id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange}
            className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block mb-1 text-sm font-medium text-purple-600">Date of Birth</label>
          <input
            id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange}
            className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1 text-sm font-medium text-purple-600">Phone</label>
          <input
            id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
            className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="address" className="block mb-1 text-sm font-medium text-purple-600">Address</label>
          <input
            id="address" name="address" type="text" value={formData.address} onChange={handleChange}
            className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label htmlFor="citizenshipId" className="block mb-1 text-sm font-medium text-purple-600">Citizenship ID</label>
          <input
            id="citizenshipId" name="citizenshipId" type="text" value={formData.citizenshipId} onChange={handleChange}
            className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label htmlFor="accountType" className="block mb-1 text-sm font-medium text-purple-600">Account Type</label>
          <select
            id="accountType" name="accountType" value={formData.accountType} onChange={handleChange}
            className="w-full px-3 py-2 border border-purple-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Select Account Type</option>
            <option value="CURRENT">Current</option>
            <option value="CHECKING">Checking</option>
            <option value="FIXED_DEPOSIT">Fixed Deposit</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
        >
          {submitting ? 'Updating...' : 'Update'}
        </button>
        {mode === 'modal' && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-purple-800 bg-purple-200 rounded-md hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UpdateAccountHolder;
