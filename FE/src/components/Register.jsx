import React, { useState } from 'react';

const Register = ({ title = 'Register' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    address: '',
    account_number: '',
    balance: '',
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-600">Full Name</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-600">Phone Number</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-600">Address</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="account_number" className="block mb-2 text-sm font-medium text-gray-600">Account Number</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="number" id="account_number" name="account_number" value={formData.account_number} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="balance" className="block mb-2 text-sm font-medium text-gray-600">Initial Balance</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="number" step="0.01" id="balance" name="balance" value={formData.balance} onChange={handleChange} />
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" type="submit">Register</button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already a member{' '}
          <a href="/login" className="font-semibold text-purple-400 hover:text-purple-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
