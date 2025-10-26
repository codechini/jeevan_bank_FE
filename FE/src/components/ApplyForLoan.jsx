import { useState } from "react";
import Button from "./Button";

const ApplyForLoan = ({ title = 'Apply For Loan' }) => {

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
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="Loan reason" className="block mb-2 text-sm font-medium text-gray-600">Loan reason</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="Loan Ammount" className="block mb-2 text-sm font-medium text-gray-600">Loan Amount</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" type="number" id="account_number" name="account_number" value={formData.account_number} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="loan_type" className="block mb-2 text-sm font-medium text-gray-600">Loan Type</label>
              <select
                id="loan_type"
                name="loan_type"
                value={formData.loan_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select a loan type</option>
                <option value="personal">Personal</option>
                <option value="home">Home</option>
                <option value="auto">Auto</option>
                <option value="education">Education</option>
              </select>
            </div>

          </div>
          <div className="mt-6">
            <Button className="w-full py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" type="submit">
              Apply
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ApplyForLoan;