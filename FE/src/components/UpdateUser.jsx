import React, { useEffect, useState } from 'react';

const UpdateUser = ({ userId, onUpdateComplete, title = 'Update User Details' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone_number: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setFormData({
            fullName: `${userData.first_name} ${userData.last_name}`,
            email: userData.email,
            phone_number: userData.phone_number,
            address: userData.address,
          });
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameParts = formData.fullName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    const putData = {
      first_name: firstName,
      last_name: lastName,
      email: formData.email,
      phone_number: formData.phone_number,
      address: formData.address,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User updated successfully:', result);
        alert('Update successful!');
        if (onUpdateComplete) onUpdateComplete();
      } else {
        const error = await response.json();
        console.error('Update failed:', error);
        alert(`Update failed: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during update:', error);
      alert('An error occurred during update.');
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
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-600">Phone Number</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-600">Address</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button className="w-full py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" type="submit">Update</button>
            <button type="button" onClick={onUpdateComplete} className="w-full py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
