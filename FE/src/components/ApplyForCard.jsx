const ApplyForCard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Apply for a Card</h1>
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6">
          <label htmlFor="cardType" className="block mb-2 text-sm font-medium text-gray-600">Card Type</label>
          <select
            id="cardType"
            name="cardType"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Card Type</option>
            <option value="debit">Debit Card</option>
            <option value="credit">Credit Card</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="cardLimit" className="block mb-2 text-sm font-medium text-gray-600">Card Limit</label>
          <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="number" id="cardLimit" name="cardLimit" placeholder="Enter desired card limit" />
        </div>
        <div className="mb-6">
          <label htmlFor="billingAddress" className="block mb-2 text-sm font-medium text-gray-600">Billing Address</label>
          <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" type="text" id="billingAddress" name="billingAddress" placeholder="Enter your billing address" />
        </div>
        <button className="w-full py-2 text-purple-800 bg-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" type="submit">
          Apply Now
        </button>
      </form>
    </div>
  );
};

export default ApplyForCard;