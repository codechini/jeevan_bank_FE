import { useState } from "react";

const OpenAccount = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    address: '',
    account_number: '',
    balance: '',
    loan_type: '', // added loan_type field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    const nameParts = formData.fullName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    const postData = {
      first_name: firstName,
      last_name: lastName,
      email: formData.email,
      password: formData.password,
      role: 'user',
      phone_number: formData.phone_number,
      account_number: Number(formData.account_number),
      address: formData.address,
      balance: parseFloat(formData.balance),
      loan_type: formData.loan_type, // include loan type in payload
    };

    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
              id="fullName"
              type="text"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loan_type" className="block mb-2 text-sm font-medium text-gray-600">Loan Type</label>
            <select
              id="loan_type"
              name="loan_type"
              value={formData.loan_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Account type</option>
              <option value="current">Current</option>
              <option value="savings">Savings</option>
              <option value="business">Business</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="initialDeposit">
              Initial Deposit
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
              id="initialDeposit"
              type="number"
              placeholder="minimum $500"
            />
          </div>
          <div className="flex items-center justify-between">
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