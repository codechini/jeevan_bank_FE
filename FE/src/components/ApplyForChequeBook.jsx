import React, { useState } from "react";

const ApplyForChequeBook = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Apply for a Cheque Book</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountNumber">
              Account Number
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full px-3 py-2"
              id="accountNumber"
              type="text"
              placeholder="Enter your account number"
            />
          </div> */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chequeBookType">
              Cheque Book Type
            </label>
            <select
              id="chequeBookType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Cheque Book Type</option>
              <option value="standard">Standard Cheque Book</option>
              <option value="premium">Premium Cheque Book</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              type="submit"
            >
              Apply for Cheque Book
            </button>
          </div>
        </form>
      </div>

      {/* Modal dialog */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Request Submitted</h2>
            <p className="text-sm text-gray-700 mb-4">Cheque book will arrive within 30 days</p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-purple-300 text-purple-800 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyForChequeBook;