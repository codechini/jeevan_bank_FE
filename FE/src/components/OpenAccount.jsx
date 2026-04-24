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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const nameParts = formData.fullName.split(' ');
    // const firstName = nameParts[0];
    // const lastName = nameParts.slice(1).join(' ');

    const postData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      // phone: formData.phone,
      phone: formData.phone.startsWith('+') ? formData.phone : '+' + formData.phone,
      address: formData.address,
      citizenshipId: formData.citizenshipId,
      accountType: formData.accountType,
    };

    try {
      const response = await fetch('http://localhost:8080/api/user/openaccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(postData),
      });
      console.log('Token:', `${localStorage.getItem('authToken')}`);
      console.log('postData:', postData);

      if (response.ok) {
        const result = await response.json();
        console.log('User registered successfully:', result);
        alert('Registration successful!');
        // Optionally redirect or clear form
      } else {
        const error = await response.json();
        console.error('Registration failed:', error);
        alert(`Registration failed: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Open a New Account</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
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
              />
            </div>
            <div className="mb-6">
              <label htmlFor="loan_type" className="block mb-2 text-sm font-medium text-gray-600">Account Type</label>
              <select
                id="accountType"
                name="accountType"
                onChange={handleChange}
                value={formData.accountType}
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
              />
            </div>
            {/* <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="initialDeposit">
                Initial Deposit
              </label>
              <input
                className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
                id="initialDeposit"
                type="number"
                placeholder="minimum $500"
              />
            </div> */}
            {/* <div className="flex items-center justify-between"> */}
          </div>
          <div className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50">

            <button
              className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              type="submit"
            >
              Open Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpenAccount;